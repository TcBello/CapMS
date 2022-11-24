import { addDoc, collection, doc, getDocs, query, Timestamp, updateDoc, where } from "firebase/firestore";
import { db } from "../firebase-setup/firebase-setup";
import ProjectFileModel, { setProjectFileModel } from "../models/project_file_model";
import ProjectModel, { setProjectModel } from "../models/project_model";
import TeamModel, { setTeamModel } from "../models/team_model";
import UserModel, { setUserModel } from "../models/user_model";

// TABLE COLLECTIONS
const userCollection = collection(db, "users");
const teamCollection = collection(db, "teams");
const projectCollection = collection(db, "projects");
const fileCollection = collection(db, "files");

async function getMyTeam(uid: string) {
    try {
        let myTeam: TeamModel = setTeamModel({});

        // GET ALL TEAM DOCS
        const snapshot = await getDocs(teamCollection);

        // MAP TO DOCS TO TEAM MODEL LIST
        const teams = snapshot.docs.map((doc) => {
            let members = (doc.data()['members'] as []).map((member) => {
                return setUserModel({
                    uid: member['uid'],
                    firstName: member['first_name'],
                    lastName: member['last_name'],
                    email: member['email'],
                    course: member['course'],
                    srCode: member['sr_code'],
                    image: member['image'],
                    role: member['role'],
                    status: member['status'],
                })
            });

            return setTeamModel({
                teamName: doc.data()['team_name'],
                uid: doc.data()['uid'],
                members: members
            });
        });

        // FIND THE TEAM OF THE CURRENT USER
        teams.map((team) => {
            return team.members.forEach((member) => {
                if(member.uid == uid){
                    myTeam = team;
                }
            });
        });

        return myTeam;
    }
    catch (e) {
        console.log(e);
    }
}

async function proposeTopic(adviserUserModel: UserModel, teamModel: TeamModel, projectName: string, abstractFormLink: string){
    try{
        let adviserDocRef: any;
        let adviserProjects: string[] = [];


        // ADD DOC
        const topicDoc = await addDoc(projectCollection, {
            uid: "",
            team_id: teamModel.uid,
            title: projectName,
            status: "Pending",
            proposed_by: teamModel.teamName,
            created_at: Timestamp.now()
        });

        // UPDATE UID OF THE DOC
        await updateDoc(topicDoc, {
            uid: topicDoc.id
        });

        // ADD PROJECT FILE
        await addProjectFile(topicDoc.id, "Abstract Form", abstractFormLink);

        const docAdviserUpdateQuery = query(
            userCollection,
            where("uid", "==", adviserUserModel.uid)
        );

        // GET ADVISER DOCS
        const snapshot = await getDocs(docAdviserUpdateQuery);

        snapshot.docs.map((doc) => {
            adviserDocRef = doc.ref
            adviserProjects = doc.data()['projects'] as string[]
        });

        // UPDATE ADVISER PROJECT LISTS
        adviserProjects.push(topicDoc.id);

        // UPDATE ADVISER'S PROJECTS DOC
        await updateDoc(adviserDocRef, {
            projects: adviserProjects
        });

        // UPDATE STUDENTS' PROJECTS DOC
        teamModel.members.forEach(async (member) => {
            let studentDocRef: any;
            let studentProjects: string[] = [];

            const docStudentUpdateQuery = query(
                userCollection,
                where("uid", "==", member.uid)
            );
    
            // GET STUDENT DOCS
            const snapshot = await getDocs(docStudentUpdateQuery);
    
            snapshot.docs.map((doc) => {
                studentDocRef = doc.ref
                studentProjects = doc.data()['projects'] as string[]
            });

            // UPDATE STUDENT PROJECT LISTS
            studentProjects.push(topicDoc.id);

            // UPDATE STUDENT'S PROJECTS DOC
            await updateDoc(studentDocRef, {
                projects: studentProjects
            });
        });
    }
    catch(e){
        console.log(e);
    }
}

async function addProjectFile(projectId: string, name: string, gDocLink: string){
    try{
        // ADD DOC
        await addDoc(fileCollection, {
            project_id: projectId,
            name: name,
            gDocLink: gDocLink,
            created_at: Timestamp.now()
        });
    }
    catch(e){
        console.log(e);
    }
}

async function getProjects(projectIds: string[]){
    try{
        const projectModel: ProjectModel[] = [];

        // GET PROJECT DOCS
        const snapshot = await getDocs(projectCollection);

        // ADD DOC DATA TO PROJECT MODEL ARRAY
        snapshot.docs.map((doc) => {
            if(projectIds.includes(doc.id)){
                projectModel.push(setProjectModel({
                    uid: doc.data()['uid'],
                    teamId: doc.data()['team_id'],
                    title: doc.data()['title'],
                    status: doc.data()['status'],
                    proposedBy: doc.data()['proposed_by'],
                    created_at: doc.data()['created_at']
                }));
            }
        })

        // SORT PROJECT MODEL ARRAY FROM LATEST TO OUTDATED DATA
        projectModel.sort((b, a) => a.created_at.toMillis() - b.created_at.toMillis());

        return projectModel;
    }
    catch(e){
        console.log(e);
    }
}

async function getProjectFiles(projectId: string){
    try{
        // QUERY THAT WILL BE USED IN GETTING DOCS
        const docQuery = query(
            fileCollection,
            where("project_id", "==", projectId)
        );

        // GET DOCS
        const snapshot = await getDocs(docQuery);

        const projectFileModels = snapshot.docs.map((doc) => setProjectFileModel({
            fileName: doc.data()['name'],
            gDocLink: doc.data()['gDocLink'],
            created_at: doc.data()['created_at']
        }));

        return projectFileModels;
    }
    catch(e){
        console.log(e);
    }
}

async function approveTopic(projectId: string, teamId: string, userModel: UserModel){
    try{
        const projectDoc = doc(db, "projects", projectId);

        // UPDATE DOC
        await updateDoc(projectDoc, {
            status: "Approved"
        });

        // QUERY THAT WILL BE USED IN GETTING DOCS
        const teamQuery = query(
            teamCollection,
            where("uid", "==", teamId)
        );

        // GET DOCS
        const snapshot = await getDocs(teamQuery);

        let teamRef: any;
        let teamMembers: UserModel[] = [];

        snapshot.docs.map((doc) => {
            teamRef = doc.ref

            teamMembers = (doc.data()['members'] as []).map((member) => {
                return setUserModel({
                    uid: member['uid'],
                    firstName: member['first_name'],
                    lastName: member['last_name'],
                    email: member['email'],
                    course: member['course'],
                    srCode: member['sr_code'],
                    image: member['image'],
                    role: member['role'],
                    status: member['status'],
                })
            });
        });

        teamMembers[3] = userModel;

        // UPDATE TEAM DOC
        await updateDoc(teamRef, {
            members: [
                {
                    uid: teamMembers[0].uid,
                    first_name: teamMembers[0].firstName,
                    last_name: teamMembers[0].lastName,
                    email: teamMembers[0].email,
                    course: teamMembers[0].course,
                    sr_code: teamMembers[0].srCode,
                    image: teamMembers[0].image,
                    role: teamMembers[0].role
                },
                {
                    uid: teamMembers[1].uid,
                    first_name: teamMembers[1].firstName,
                    last_name: teamMembers[1].lastName,
                    email: teamMembers[1].email,
                    course: teamMembers[1].course,
                    sr_code: teamMembers[1].srCode,
                    image: teamMembers[1].image,
                    role: teamMembers[1].role
                },
                {
                    uid: teamMembers[2].uid,
                    first_name: teamMembers[2].firstName,
                    last_name: teamMembers[2].lastName,
                    email: teamMembers[2].email,
                    course: teamMembers[2].course,
                    sr_code: teamMembers[2].srCode,
                    image: teamMembers[2].image,
                    role: teamMembers[2].role
                },
                {
                    uid: teamMembers[3].uid,
                    first_name: teamMembers[3].firstName,
                    last_name: teamMembers[3].lastName,
                    email: teamMembers[3].email,
                    course: teamMembers[3].course,
                    sr_code: teamMembers[3].srCode,
                    image: teamMembers[3].image,
                    role: teamMembers[3].role,
                    status: teamMembers[3].status
                }
            ],
        });
    }
    catch(e){
        console.log(e);
    }
}

async function denyTopic(projectId: string){
    try{
        const projectDoc = doc(db, "projects", projectId);

        // UPDATE DOC
        await updateDoc(projectDoc, {
            status: "Denied"
        });
    }
    catch(e){
        console.log(e);
    }
}

async function getAdvisees(userId: string){
    try{
        let myAdvisees: TeamModel[] = [];

        // GET TEAM DOCS
        const snapshot = await getDocs(teamCollection);

        // MAP DOC TO TEAM MODEL
        const teams = snapshot.docs.map((doc) => {
            let members = (doc.data()['members'] as []).map((member) => {
                return setUserModel({
                    uid: member['uid'],
                    firstName: member['first_name'],
                    lastName: member['last_name'],
                    email: member['email'],
                    course: member['course'],
                    srCode: member['sr_code'],
                    image: member['image'],
                    role: member['role'],
                    status: member['status'],
                })
            });

            return setTeamModel({
                teamName: doc.data()['team_name'],
                uid: doc.data()['uid'],
                members: members
            });
        });

        // GET TEAMS THAT CONTAINS THAT ID OF THE USER
        teams.map(team => {
            team.members.forEach(member => {
                if(member.uid == userId){
                    myAdvisees.push(team);
                }
            });
        });

        return myAdvisees;
    }
    catch(e){
        console.log(e);
    }
}

export {
    getMyTeam,
    proposeTopic,
    addProjectFile,
    getProjects,
    getProjectFiles,
    approveTopic,
    denyTopic,
    getAdvisees
};