import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, getDocs, orderBy, query, Timestamp, where } from "firebase/firestore";
import { auth, db, storage } from "../firebase-setup/firebase-setup";
import UserModel, { setUserModel } from "../models/user_model";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { defaultImage } from "../Utils";
import { setTeamModel } from "../models/team_model";
import AnnouncementModel, { setAnnouncementModel } from "../models/announcement_model";
import { format } from "date-fns";

// TABLE COLLECTIONS
const userCollection = collection(db, "users");
const teamCollection = collection(db, "teams");
const announcementCollection = collection(db, "announcements");

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
            upload = await uploadBytes(avatarStorage(imageFile.name), imageFile);
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
                created_at: Date().toString()
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
                created_at: Date().toString()
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
            where("role", "==", "Student")
        );
        
        // GET DOCUMENTS 
        const snapshot = await getDocs(ref);
        
        return snapshot.docs.map((doc) => {
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
            });
        })
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
        
        return snapshot.docs.map((doc) => {
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
                status: data['status']
            });
        })
    }
    catch(e){
        console.log(e);
    }
}

async function createTeam(teamName: string, firstMember: UserModel, secondMember: UserModel, thirdMember: UserModel){
    try{
        await addDoc(teamCollection, {
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
            created_at: Date().toString()
        });
    }
    catch(e){
        console.log(e);
    }
}

async function getAllTeams(){
    try{
        const docData = await getDocs(teamCollection);
        return docData.docs.map((doc) => {
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
                members: members
            });
        });
    }
    catch(e){
        console.log(e);
    }
}

async function createAnnouncement(announcement: AnnouncementModel){
    try{
        await addDoc(announcementCollection, {
            by: announcement.by,
            message: announcement.message,
            created_at: announcement.date
        });
    }
    catch(e){
        console.log(e);
    }
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
                date: doc.data()['created_at'] as Timestamp
            });
        });

        return announcementModels;
    }
    catch(e){
        console.log(e);
    }
}

export { createAccount, getAllStudents, getAllFaculties, createTeam, getAllTeams, createAnnouncement, getAllAnnouncements };