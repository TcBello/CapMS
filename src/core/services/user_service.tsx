import { addDoc, collection, getDocs, query, Timestamp, updateDoc, where } from "firebase/firestore";
import { db } from "../firebase-setup/firebase-setup";
import ProjectFileModel, { setProjectFileModel } from "../models/project_file_model";
import ProjectModel, { setProjectModel } from "../models/project_model";
import TeamModel, { setTeamModel } from "../models/team_model";
import UserModel, { setUserModel } from "../models/user_model";

// TABLE COLLECTIONS
const userCollection = collection(db, "users");
const teamCollection = collection(db, "teams");
const announcementCollection = collection(db, "announcements");
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

export {
    getMyTeam,
    proposeTopic,
    addProjectFile,
    getProjects,
    getProjectFiles
};