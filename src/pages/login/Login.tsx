import { IonButton, IonCard, IonContent, IonIcon, IonInput, IonItem, IonLabel, IonPage, useIonToast} from "@ionic/react";
import { lockClosed, mail } from "ionicons/icons";
import { Component, useEffect, useState } from "react";
import BackgroundLogin from "./components/BackgroundLogin";
import "../../core/components/Spacer.css";
import { useMediaQuery } from "react-responsive";
import "./Login.css";
import { goPage, replacePage, showToast, webWidth } from "../../core/Utils";
import { LoginInvalidCredentialError } from "../../core/Errors";
import { useDispatch, useSelector } from "react-redux";
import { authenticate, loginWithEmailAndPassword, logout } from "../../core/services/auth_service";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../core/firebase-setup/firebase-setup";

interface UserModel{
    name: string,
    email: string,
    password: string,
    role: string
}

const sampleData: UserModel[] = [
    {
        name: "Admin",
        email: "admin@gmail.com",
        password: "admin",
        role: "Admin"
    },
    {
        name: "Sum Ting Wong",
        email: "student@gmail.com",
        password: "student",
        role: "Student"
    },
    {
        name: "Dum Fuk",
        email: "faculty@gmail.com",
        password: "faculty",
        role: "Faculty"
    }
];

const Login = () => {
    const isDesktop = useMediaQuery({minWidth: webWidth});

    const [toast] = useIonToast();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [user, loading, error] = useAuthState(auth);

    const dispatch = useDispatch();

    async function LoginUser(){
        await loginWithEmailAndPassword(dispatch, email, password, toast);

        // EMPTY TEXT FIELD
        setEmail("");
        setPassword("");
    }

    if(loading){
        return <IonPage></IonPage>;
    }
    if(error){
        return <IonPage><p>Error</p></IonPage>;
    }
    if(user){
        authenticate(dispatch, user);
        return <IonPage></IonPage>;
    }

    return <IonPage>
        {/* CONTENT */}
        <IonContent scrollY={false}>
            {/* BACKGROUND IMAGE */}
            <BackgroundLogin />
                <div className="content-center">
                    <div className="spacer-h-xl"/>
                    {/* CAPMS HEADER */}
                    <h1 className="cap-text">Cap<span>MS</span></h1>
                    <div className="spacer-h-xl"/>
                    {/* CARD */}
                    <IonCard className={isDesktop ? "login-card" : "login-card-mobile"}>
                        {/* LOGIN HEADER */}
                        <h1 className="login-header">Login</h1>
                        <div className="spacer-h-l"/>
                        <div className="input-field-container">
                            {/* EMAIL ICON */}
                            <IonIcon icon={mail} className="icon"></IonIcon>
                            <div className="spacer-w-xs" />
                            {/* EMAIL INPUT FIELD */}
                            <IonItem lines="none" className={isDesktop ? "input-field" : "input-field-mobile"}>
                                <IonLabel position="floating">
                                    Email
                                </IonLabel>
                                <IonInput value={email} onIonChange={(e: any) => setEmail(e.target.value)} />
                            </IonItem>
                        </div>
                        <div className="spacer-h-s"/>
                        <div className="input-field-container">
                            {/* PASSWORD ICON */}
                            <IonIcon icon={lockClosed} className="icon"></IonIcon>
                            <div className="spacer-w-xs" />
                            {/* PASSWORD INPUT FIELD */}
                            <IonItem lines="none" className={isDesktop ? "input-field" : "input-field-mobile"}>
                                <IonLabel position="floating">
                                    Password
                                </IonLabel>
                                <IonInput type="password" value={password} onIonChange={(e: any) => setPassword(e.target.value)}/>
                            </IonItem>
                        </div>
                        <div className="spacer-h-m"/>
                        {/* LOGIN BUTTON */}
                        <IonButton className="login-button" onClick={LoginUser}>LOGIN</IonButton>
                    </IonCard>
                </div>
        </IonContent>
    </IonPage>
};

export default Login;