import { auth, db } from "../firebase-setup/firebase-setup";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, NextOrObserver, User, updatePassword } from "firebase/auth";
import { addDoc, collection, DocumentData, getDocs } from "firebase/firestore";
import { loginAdmin } from "../redux/slices/admin";
import { login } from "../redux/slices/user";
import { replacePage, setStorageData, showToast } from "../Utils";
import { LoginInvalidCredentialError } from "../Errors";
import { setUserModel } from "../models/user_model";

const userCollection = collection(db, "users");

async function registerWithEmailAndPassword(email: string, password: string){
    try{
        let userCreds = await createUserWithEmailAndPassword(auth, email, password);
        let user = userCreds.user;

        await addDoc(userCollection, {
            uid: user.uid,
            email: email,
            role: "Admin"
        });
    
    }
    catch(e){
        console.log(e);
    }
}

async function loginWithEmailAndPassword(dispatch: any, email: string, password: string, toast: any){
    try{
        // SIGN IN WITH EMAIL AND PASSWORD
        let userCreds = await signInWithEmailAndPassword(auth, email, password);

        if(userCreds){
            let user = userCreds.user;

            await getUserData(dispatch, user.uid);
        }
    }
    catch(e){
        console.log(e);
        showToast(toast, LoginInvalidCredentialError);
    }
}

async function getUserData(dispatch: any, uid: string){
    // GET SNAPSHOT
    const snapshot = await getDocs(userCollection);

    let userData: DocumentData = {};

    // GET DOCUMENT DATA WHERE DATA IS EQUAL TO USER'S UID
    snapshot.docs.map(doc => {
        const data = doc.data();

        // ADMIN SIDE
        if(data['uid'] == uid && data['role'] == "Admin"){
            // SEND DATA TO REDUX
            dispatch(loginAdmin({uid: data['uid'], email: data['email'], role: data['role']}));

            const user = setUserModel({
                uid: data['uid'],
                email: data['email'],
                role: data['role']
            });

            setStorageData("user", JSON.stringify(user));

            userData = data;
        }
        
        // USER SIDE
        if(data['uid'] == uid && (data['role'] == "Student" || data['role'] == "Faculty")){
            // DATA THAT WILL BE SENT TO REDUX
            const userModel = setUserModel({
                uid: data['uid'],
                firstName: data['first_name'],
                lastName: data['last_name'],
                email: data['email'],
                course: data['course'],
                srCode: data['sr_code'],
                image: data['image'],
                role: data['role']
            });

            // SEND DATA TO REDUX
            dispatch(login(userModel));

            setStorageData("user", JSON.stringify(userModel));

            userData = data;
        }
    });
    
    return userData;
}

async function authenticate(dispatch: any, user: User){
    // GET USER DATA
    const userData = await getUserData(dispatch, user.uid);

    // SWITCH PAGE ACCORDING TO ROLE
    if(userData['role'] == "Student"){
        replacePage("/home/student/announcements");
    }
    if(userData['role'] == "Faculty"){
        replacePage("/home/faculty/announcements");
    }
    if(userData['role'] == "Admin"){
        replacePage("/home/admin/dashboard");
    }
}

async function logout(){
    await signOut(auth);
}

function initUser(dispatch: any, uid: string){
    // GET USER DATA
    getUserData(dispatch, uid);
}

async function changePassword(newPassword: string){
    try{
        await updatePassword(auth.currentUser!, newPassword);
        return true;
    }
    catch(e){
        console.log(e);
    }

    return false;
}

export {
    registerWithEmailAndPassword,
    loginWithEmailAndPassword,
    authenticate,
    logout,
    initUser,
    changePassword
};