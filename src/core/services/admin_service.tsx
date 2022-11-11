import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { auth, db, storage } from "../firebase-setup/firebase-setup";
import UserModel, { setUserModel } from "../models/user_model";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { defaultImage } from "../Utils";
import { setTeamModel } from "../models/team_model";

const userCollection = collection(db, "users");
const teamCollection = collection(db, "teams");

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
        return docData.docs.map((doc) => setTeamModel({
            teamName: doc.data()['team_name'],
            members: doc.data()['members'] as UserModel[]
        }));
    }
    catch(e){
        console.log(e);
    }
}

export { createAccount, getAllStudents, getAllFaculties, createTeam, getAllTeams };