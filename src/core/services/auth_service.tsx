import { auth, db } from "../firebase-setup/firebase-setup";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, NextOrObserver, User, updatePassword } from "firebase/auth";
import { addDoc, collection, DocumentData, getDocs, Timestamp, updateDoc } from "firebase/firestore";
import { loginAdmin } from "../redux/slices/admin";
import { login } from "../redux/slices/user";
import { dateToMonthDateYear, replacePage, setStorageData, showToast } from "../Utils";
import { LoginInvalidCredentialError } from "../Errors";
import { setUserModel } from "../models/user_model";

const userCollection = collection(db, "users");
const dashboardCollection = collection(db, "dashboard");

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
    const dashboardSnapshot = await getDocs(dashboardCollection);

    let userData: DocumentData = {};

    const dailyVisitsDates = dashboardSnapshot.docs[0].data()['daily_visits_dates'] as string[];
    const dailyVisits = dashboardSnapshot.docs[0].data()['daily_visits'] as number[];
    const dateNow = dateToMonthDateYear(Timestamp.now().toDate());

    // IF THE LATEST DATA OF DATE IN THE FIREBASE IS NOT EQUALS TO TODAY'S DATE,
    // TODAY'S DATE WILL BE PUSHED IN THE DATES ARRAY IN FIREBASE
    // AND WILL ADD 1 DAILY VISIT
    if(dailyVisitsDates[dailyVisitsDates.length - 1] != dateNow){

        // IF DAILY VISITS DATA AND DATES CONTAINS 10 DATA, REMOVE 1 OLD DATA
        if(dailyVisitsDates.length == 10 && dailyVisits.length == 10){
            dailyVisitsDates.splice(0, 1);
            dailyVisits.splice(0, 1);
        }

        dailyVisitsDates.push(dateNow);
        dailyVisits.push(1);
        await updateDoc(dashboardSnapshot.docs[0].ref, {
            daily_visits: dailyVisits,
            daily_visits_dates: dailyVisitsDates
        });
    }
    // IF THE LATEST DATA OF DATE IN THE FIREBASE IS EQUALS TO TODAY'S DATE,
    // THE 1 DAILY VISIT WILL BE ADDED IN THE LATEST DATA
    else{
        dailyVisits[dailyVisits.length - 1] += 1;
        await updateDoc(dashboardSnapshot.docs[0].ref, {
            daily_visits: dailyVisits,
        });
    }

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
        
        // STUDENT SIDE
        if(data['uid'] == uid && data['role'] == "Student"){
            // DATA THAT WILL BE SENT TO REDUX
            const userModel = setUserModel({
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

            // SEND DATA TO REDUX
            dispatch(login(userModel));

            setStorageData("user", JSON.stringify(userModel));

            userData = data;
        }

        // FACULTY SIDE
        if(data['uid'] == uid && data['role'] == "Faculty"){
            // DATA THAT WILL BE SENT TO REDUX
            const userModel = setUserModel({
                uid: data['uid'],
                firstName: data['first_name'],
                lastName: data['last_name'],
                email: data['email'],
                course: data['course'],
                srCode: data['sr_code'],
                image: data['image'],
                role: data['role'],
                projects: data['projects'],
                status: data['status']
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

async function initUser(dispatch: any, uid: string){
    // GET USER DATA
    await getUserData(dispatch, uid);
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

async function updateSchoolYear(){
    try{
        var dashboardDoc = await (await getDocs(dashboardCollection)).docs[0];

        const currentSchoolYear: string = dashboardDoc.data()['school_year'];

        const b: string[] = currentSchoolYear.split(" ");
        const c: string[] = b[1].split("-");

        const newSchoolYear = `S.Y. ${parseInt(c[0]) + 1} - ${parseInt(c[1]) + 1}`;

        const currentMonth: number = Timestamp.now().toDate().getMonth() + 1;
        const currentDay: number = Timestamp.now().toDate().getDate();

        if(currentMonth == 8 && currentDay == 15){
            updateDoc(dashboardDoc.ref, {
                school_year: newSchoolYear
            });
        }
    }
    catch(e){
        console.log(e);
    }
}

export {
    registerWithEmailAndPassword,
    loginWithEmailAndPassword,
    authenticate,
    logout,
    initUser,
    changePassword,
    updateSchoolYear
};