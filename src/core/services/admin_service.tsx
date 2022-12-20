import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, Timestamp, updateDoc, where } from "firebase/firestore";
import { auth, db, storage } from "../firebase-setup/firebase-setup";
import UserModel, { setUserModel } from "../models/user_model";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { defaultImage } from "../Utils";
import { setTeamModel } from "../models/team_model";
import AnnouncementModel, { setAnnouncementModel } from "../models/announcement_model";
import { format } from "date-fns";
import DashboardModel, { setDashboardModel } from "../models/dashboard_model";
import { uid } from "uid";

// TABLE COLLECTIONS
const userCollection = collection(db, "users");
const teamCollection = collection(db, "teams");
const announcementCollection = collection(db, "announcements");
const dashboardCollection = collection(db, "dashboard");
const projectCollection = collection(db, "projects");

function avatarStorage(filename: string){
    return ref(storage, `/avatars/${filename}`);
}

async function createAccount(userModel: UserModel, imageFile: any){
    try{
        // CREATE USER WITH EMAIL AND PASSWORD
        let userCreds = await createUserWithEmailAndPassword(auth, userModel.email, userModel.password);
        let user = userCreds.user;

        let upload: any = null;
        let imageUrl: any = null;

        if(imageFile != null){
            // UPLOAD IMAGE ON FIREBASE STORAGE
            upload = await uploadBytes(avatarStorage(uid(64)), imageFile);
            // GET IMAGE URL FROM FIREBASE STORAGE
            imageUrl = await getDownloadURL(upload.ref);
        }

        // POST DATA IN CLOUD FIRESTORE WITH STUDENT ROLE
        if(userModel.role == "Student"){
            await addDoc(userCollection, {
                uid: user.uid,
                first_name: userModel.firstName,
                last_name: userModel.lastName,
                email: userModel.email,
                course: userModel.course,
                sr_code: userModel.srCode,
                image: imageFile != null ? imageUrl : userModel.image,
                role: userModel.role,
                projects: [],
                responsibilities: userModel.responsibilities,
                created_at: Timestamp.now()
            });
        }
        // POST DATA IN CLOUD FIRESTORE WITH FACULTY ROLE
        if(userModel.role == "Faculty"){
            await addDoc(userCollection, {
                uid: user.uid,
                first_name: userModel.firstName,
                last_name: userModel.lastName,
                email: userModel.email,
                course: userModel.course,
                sr_code: userModel.srCode,
                image: imageFile != null ? imageUrl : userModel.image,
                role: userModel.role,
                status: userModel.status,
                projects: [],
                advisees: [],
                specializes: userModel.specializes,
                created_at: Timestamp.now()
            });
        }

        return true;
    }
    catch(e){
        console.log(e);
    }

    return false;
}

async function getAllStudents(){
    try{
        // DEFINE A QUERY WHERE ROLE IS STUDENT
        const ref = query(
            userCollection,
            where("role", "==", "Student"),
        );
        
        // GET DOCUMENTS 
        const snapshot = await getDocs(ref);
        
        const allStudents = snapshot.docs.map((doc) => {
            const data = doc.data();

            return setUserModel({
                uid: data['uid'],
                firstName: data['first_name'],
                lastName: data['last_name'],
                email: data['email'],
                course: data['course'],
                srCode: data['sr_code'],
                image: data['image'],
                role: data['role'],
                projects: data['projects']
            });
        });

        allStudents.sort((a, b) => a.firstName.toLowerCase().localeCompare(b.firstName.toLowerCase()));
        return allStudents;
    }
    catch(e){
        console.log(e);
    }
}

async function getAllFaculties(){
    try{
        // DEFINE A QUERY WHERE ROLE IS STUDENT
        const ref = query(
            userCollection,
            where("role", "==", "Faculty")
        );
        
        // GET DOCUMENTS 
        const snapshot = await getDocs(ref);
        
        const faculties =  snapshot.docs.map((doc) => {
            const data = doc.data();

            return setUserModel({
                uid: data['uid'],
                firstName: data['first_name'],
                lastName: data['last_name'],
                email: data['email'],
                course: data['course'],
                srCode: data['sr_code'],
                image: data['image'],
                role: data['role'],
                status: data['status'],
                projects: data['projects'],
                advisees: data['advisees'],
                specializes: data['specializes']
            });
        });

        faculties.sort((a, b) => a.firstName.toLowerCase().localeCompare(b.firstName.toLowerCase()));
        return faculties;
    }
    catch(e){
        console.log(e);
    }
}

async function createTeam(teamName: string, firstMember: UserModel, secondMember: UserModel, thirdMember: UserModel){
    try{
        const docRef = await addDoc(teamCollection, {
            team_name: teamName,
            members: [
                {
                    uid: firstMember.uid,
                    first_name: firstMember.firstName,
                    last_name: firstMember.lastName,
                    email: firstMember.email,
                    course: firstMember.course,
                    sr_code: firstMember.srCode,
                    image: firstMember.image,
                    role: firstMember.role
                },
                {
                    uid: secondMember.uid,
                    first_name: secondMember.firstName,
                    last_name: secondMember.lastName,
                    email: secondMember.email,
                    course: secondMember.course,
                    sr_code: secondMember.srCode,
                    image: secondMember.image,
                    role: secondMember.role
                },
                {
                    uid: thirdMember.uid,
                    first_name: thirdMember.firstName,
                    last_name: thirdMember.lastName,
                    email: thirdMember.email,
                    course: thirdMember.course,
                    sr_code: thirdMember.srCode,
                    image: thirdMember.image,
                    role: thirdMember.role
                },
                {
                    uid: "",
                    first_name: "No",
                    last_name: "Adviser",
                    email: "",
                    course: "",
                    sr_code: "",
                    image: defaultImage,
                    role: "Adviser",
                    status: "",
                }
            ],
            created_at: Timestamp.now(),
            uid: "",
            project_id: ""
        });

        const teamDoc = doc(db, "teams", docRef.id);

        await updateDoc(teamDoc, {
            uid: docRef.id
        });

        return true;
    }
    catch(e){
        console.log(e);
    }

    return false;
}

async function getAllTeams(){
    try{
        const docData = await getDocs(teamCollection);
        const teams =  docData.docs.map((doc) => {
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
                    responsibilities: member['responsibilities']
                })
            });

            return setTeamModel({
                teamName: doc.data()['team_name'],
                members: members,
                uid: doc.data()['uid'],
                projectId: doc.data()['project_id'],
                projectTitle: doc.data()['project_title']
            });
        });

        teams.sort((a, b) => a.teamName.toLowerCase().localeCompare(b.teamName.toLowerCase()));
        return teams;
    }
    catch(e){
        console.log(e);
    }
}

async function createAnnouncement(announcement: AnnouncementModel){
    try{
        // ADD DOC
        const doc = await addDoc(announcementCollection, {
            by: announcement.by,
            message: announcement.message,
            created_at: announcement.date
        });

        await updateDoc(doc, {
            uid: doc.id
        });

        return true;
    }
    catch(e){
        console.log(e);
    }

    return false;
}

async function getAllAnnouncements(){
    try{
        // QUERY THAT WILL BE USED IN GETTING DOCUMENTS
        const getAnnouncementQuery = query(
            announcementCollection,
            orderBy("created_at", "desc")
        );

        // GET DOCUMENTS
        const docData = await getDocs(getAnnouncementQuery);

        const announcementModels = docData.docs.map((doc) => {
            return setAnnouncementModel({
                by: doc.data()['by'],
                message: doc.data()['message'],
                date: doc.data()['created_at'] as Timestamp,
                uid: doc.data()['uid']
            });
        });

        return announcementModels;
    }
    catch(e){
        console.log(e);
    }
}

async function getAdminProfile(uid: string){
    try{
        // QUERY THAT WILL BE USED IN GETTING DOCS
        const getProfileQuery = query(
            userCollection,
            where("uid", "==", uid)
        );

        // GET DOCS
        const docData = await getDocs(getProfileQuery);

        // DOCS MAP TO USER MODEL
        const user = docData.docs.map((doc) => setUserModel({
            uid: uid,
            email: doc.data()['email'],
            role: doc.data()['role']
        }));

        return user[0];
    }
    catch(e){
        console.log(e);
    }
}

async function updateAnnouncement(announcementModel: AnnouncementModel){
    try{
        let docId = "";
        
        // QUERY THAT WILL BE USED IN GETTING DOCS
        const docQuery = query(
            announcementCollection,
            where("uid", "==", announcementModel.uid)
        );

        // GET DOCS
        const snapshot = await getDocs(docQuery);

        snapshot.docs.map((doc) => {
            docId = doc.id;
        });

        const announcement = doc(db, "announcements", docId);

        // UPDATE DOC
        await updateDoc(announcement, {
            message: announcementModel.message,
            by: announcementModel.by
        });

        return true;
    }
    catch(e){
        console.log(e);
    }

    return false;
}

async function deleteAnnouncement(announcementModel: AnnouncementModel){
    try{
        let docRef: any;

        // QUERY THAT WILL BE USED IN GETTING DOCS
        const docQuery = query(
            announcementCollection,
            where("uid", "==", announcementModel.uid)
        );
        
        const snapshot = await getDocs(docQuery);
        snapshot.docs.map((doc) => {
            docRef = doc.ref;
        });

        await deleteDoc(docRef);

        return true;
    }
    catch(e){
        console.log(e);
    }

    return false;
}

async function updateUserAccount(userModel: UserModel){
    try{
        let docId = "";

        // QUERY THAT WILL BE USED IN GETTING DOCS
        const docQuery = query(
            userCollection,
            where("uid", "==", userModel.uid)
        );

        // GET DOCS
        const snapshot = await getDocs(docQuery);

        snapshot.docs.map((doc) => {
            docId = doc.id
        });

        const users = doc(db, "users", docId);

        //  UPDATE DOCS
        await updateDoc(users, {
            first_name: userModel.firstName,
            last_name: userModel.lastName,
            email: userModel.email,
            course: userModel.course,
            sr_code: userModel.srCode
        });

        return true;
    }
    catch(e){
        console.log(e);
    }

    return false;
}

async function deleteAccount(uid: string){
    try{
        let docRef: any;

        // QUERY FOR GETTING DOCS
        const docQuery = query(
            userCollection,
            where("uid", "==", uid)
        );

        // GET DOCS
        const snapshot = await getDocs(docQuery);

        snapshot.docs.map((doc) => {
            docRef = doc.ref;
        });

        if(docRef != null){
            // DELETE DOC
            await deleteDoc(docRef);
        }

        return true;
    }
    catch(e){
        console.log(e);
    }

    return false;
}

async function deleteTeam(uid: string){
    try{
        let docRef: any;

        // QUERY THAT WILL BE USED IN GETTING DOCS
        const docQuery = query(
            teamCollection,
            where("uid", "==", uid)
        );

        const snapshot = await getDocs(docQuery);

        snapshot.docs.map((doc) => {
            docRef = doc.ref
        });

        await deleteDoc(docRef);

        return true;
    }
    catch(e){
        console.log(e);
    }

    return false;
}

async function getDashboardData(){
    try{
        let dashboardModel: DashboardModel = setDashboardModel({});

        // QUERIES
        const totalStudentQuery = query(
            userCollection,
            where("role", "==", "Student")
        );

        const totalFacultyQuery = query(
            userCollection,
            where("role", "==", "Faculty")
        );

        const totalAvailableFacultyQuery = query(
            userCollection,
            where("role", "==", "Faculty"),
            where("status", "==", "Available")
        );

        const totalUnavailableFacultyQuery = query(
            userCollection,
            where("role", "==", "Faculty"),
            where("status", "==", "Unavailable")
        );

        const approvedProjectQuery = query(
            projectCollection,
            where("status", "==", "Approved")
        );

        const pendingProjectQuery = query(
            projectCollection,
            where("status", "==", "Pending")
        );

        const deniedProjectQuery = query(
            projectCollection,
            where("status", "==", "Denied")
        );

        // GET DOCS
        const dashboardSnapshot = await getDocs(dashboardCollection);
        const studentSnapshot = await getDocs(totalStudentQuery);
        const facultySnapshot = await getDocs(totalFacultyQuery);
        const availableFacultySnapshot = await getDocs(totalAvailableFacultyQuery);
        const unavailableFacultySnapshot = await getDocs(totalUnavailableFacultyQuery);
        const approvedProjectSnapshot = await getDocs(approvedProjectQuery);
        const pendingProjectSnapshot = await getDocs(pendingProjectQuery);
        const deniedProjectSnapshot = await getDocs(deniedProjectQuery);

        // UPDATE DOC
        await updateDoc(dashboardSnapshot.docs[0].ref, {
            total_student: studentSnapshot.docs.length.toString(),
            total_faculty: facultySnapshot.docs.length.toString(),
            available_faculty: availableFacultySnapshot.docs.length,
            unavailable_faculty: unavailableFacultySnapshot.docs.length,
            approved_project: approvedProjectSnapshot.docs.length,
            denied_project: deniedProjectSnapshot.docs.length,
            pending_project: pendingProjectSnapshot.docs.length
        });

        dashboardSnapshot.docs.map(doc => {
            const data = doc.data();

            dashboardModel = setDashboardModel({
                totalStudents: data['total_student'],
                totalFaculty: data['total_faculty'],
                availableFaculty: data['available_faculty'],
                unavailableFaculty: data['unavailable_faculty'],
                approvedProject: data['approved_project'],
                deniedProject: data['denied_project'],
                pendingProject: data['pending_project'],
                schoolYear: data['school_year'],
                dailyVisits: data['daily_visits'],
                dailyVisitsDates: data['daily_visits_dates']
            });
        });

        return dashboardModel;
    }
    catch(e){
        console.log(e);
    }
}

export {
    createAccount,
    getAllStudents,
    getAllFaculties,
    createTeam,
    getAllTeams,
    createAnnouncement,
    getAllAnnouncements,
    getAdminProfile,
    updateAnnouncement,
    deleteAnnouncement,
    updateUserAccount,
    deleteAccount,
    deleteTeam,
    getDashboardData
};