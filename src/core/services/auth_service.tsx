import { auth, db } from "../firebase-setup/firebase-setup";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { loginAdmin } from "../redux/slices/admin";
import { login } from "../redux/slices/user";

async function registerWithEmailAndPassword(email: string, password: string){
    try{
        let userCreds = await createUserWithEmailAndPassword(auth, email, password);
        let user = userCreds.user;

        await addDoc(collection(db, "users"), {
            uid: user.uid,
            email: email,
            role: "Admin"
        });
    
    }
    catch(e){
        console.log(e);
    }
}

async function loginWithEmailAndPassword(dispatch: any, email: string, password: string){
    try{
        // SIGN IN WITH EMAIL AND PASSWORD
        let userCreds = await signInWithEmailAndPassword(auth, email, password);

        if(userCreds){
            let user = userCreds.user;

            // GET SNAPSHOT
            const snapshot = await getDocs(collection(db, "users"));

            // GET DOCUMENT DATA WHERE DATA IS EQUAL TO USER'S UID
            snapshot.docs.map(doc => {
                const data = doc.data();

                // ADMIN SIDE
                if(data['uid'] == user.uid && data['role'] == "Admin"){
                    // SEND DATA TO REDUX
                    dispatch(loginAdmin({uid: data['uid'], email: data['email'], role: data['role']}));

                    console.log(data['role']);
                }
                
                // USER SIDE
                if(data['uid'] == user.uid && (data['role'] == "Student" || data['role'] == "Faculty")){
                    // SEND DATA TO REDUX
                    dispatch(login({uid: data['uid'], email: data['email'], role: data['role']}));

                    console.log(data['role']);
                }
            });
        }
    }
    catch(e){
        console.log(e);
    }
}

export {registerWithEmailAndPassword, loginWithEmailAndPassword};