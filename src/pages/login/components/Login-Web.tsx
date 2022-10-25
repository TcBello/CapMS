import { IonButton, IonCard, IonIcon, IonInput, IonItem, IonLabel, useIonToast } from "@ionic/react";
import { lockClosed, mail } from "ionicons/icons";
import { Component, useState } from "react";
import MediaQuery from "react-responsive";
import { LoginInvalidCredentialError } from "../../../core/Errors";
import { goPage, showToast, webWidth } from "../../../core/Utils";
import BackgroundLogin from "./BackgroundLogin";

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

const LoginWeb = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [toast] = useIonToast();

    function Login(){
        var user = sampleData.find(users => users.email == email);
        if(user){
            if(user.password == password && user.role == "Student"){
                goPage("/split-view");
            }
            else if(user.password == password && user.role == "Faculty"){
                goPage("/split-view-faculty");
            }
            else if(user.password == password && user.role == "Admin"){
                goPage("/split-view-admin");
            }
            else{
                showToast(toast, LoginInvalidCredentialError);
            }
        }
        else{
            showToast(toast, LoginInvalidCredentialError);
        }
    }

    return (
        <div>
            <MediaQuery minWidth={webWidth}>
                {/* BACKGROUND IMAGE */}
                <BackgroundLogin />
                <div className="content-center">
                    <div className="spacer-h-xl"/>
                    {/* CAPMS HEADER */}
                    <h1 className="cap-text">Cap<span>MS</span></h1>
                    <div className="spacer-h-xl"/>
                    {/* CARD */}
                    <IonCard className="card">
                        {/* LOGIN HEADER */}
                        <h1 className="login-header">Login</h1>
                        <div className="spacer-h-l"/>
                        <div className="input-field-container">
                            {/* EMAIL ICON */}
                            <IonIcon icon={mail} className="icon"></IonIcon>
                            <div className="spacer-w-xs" />
                            {/* EMAIL INPUT FIELD */}
                            <IonItem lines="none" className="input-field">
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
                            <IonItem lines="none" className="input-field">
                                <IonLabel position="floating">
                                    Password
                                </IonLabel>
                                <IonInput type="password" value={password} onIonChange={(e: any) => setPassword(e.target.value)}/>
                            </IonItem>
                        </div>
                        <div className="spacer-h-m"/>
                        {/* LOGIN BUTTON */}
                        <IonButton className="login-button" onClick={Login}>LOGIN</IonButton>
                    </IonCard>
                </div>
            </MediaQuery>
        </div>
    );
}

export default LoginWeb;