import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../firebase-setup/firebase-setup";
import UserModel from "../models/user_model";

const userCollection = collection(db, "users")

async function createAccount(userModel: UserModel){
    try{
        console.log(userModel.course);
        // CREATE USER WITH EMAIL AND PASSWORD
        let userCreds = await createUserWithEmailAndPassword(auth, userModel.email, userModel.password);
        let user = userCreds.user;

        // POST DATA IN CLOUD FIRESTORE
        await addDoc(userCollection, {
            uid: user.uid,
            first_name: userModel.firstName,
            last_name: userModel.lastName,
            email: userModel.email,
            course: userModel.course,
            sr_code: userModel.srCode,
            image: userModel.image,
            role: userModel.role,
            created_at: Date().toString()
        })

        return true;
    }
    catch(e){
        console.log(e);
    }

    return false;
}

export { createAccount };