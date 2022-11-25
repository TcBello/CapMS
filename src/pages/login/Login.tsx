import { IonButton, IonCard, IonContent, IonIcon, IonInput, IonItem, IonLabel, IonPage, useIonToast} from "@ionic/react";
import { lockClosed, mail } from "ionicons/icons";
import { Component, useEffect, useState } from "react";
import BackgroundLogin from "./components/BackgroundLogin";
import "../../core/components/Spacer.css";
import { useMediaQuery } from "react-responsive";
import "./Login.css";
import { goPage, replacePage, setStorageData, showToast, webWidth } from "../../core/Utils";
import { LoginInvalidCredentialError } from "../../core/Errors";
import { useDispatch, useSelector } from "react-redux";
import { authenticate, loginWithEmailAndPassword, logout } from "../../core/services/auth_service";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../core/firebase-setup/firebase-setup";
import UserModel from "../../core/models/user_model";
import InputField from "../../core/components/InputField";
import Loading from "../../core/components/Loading";

const Login = () => {
    const isDesktop = useMediaQuery({minWidth: webWidth});

    const [toast] = useIonToast();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [user, loading, error] = useAuthState(auth);
    
    const [isAuthenticateOnce, setAuthenticate] = useState(false);

    const dispatch = useDispatch();

    async function LoginUser(){
        await loginWithEmailAndPassword(dispatch, email, password, toast);

        // EMPTY TEXT FIELD
        setEmail("");
        setPassword("");
    }

    if(loading){
        return <Loading />
    }
    if(error){
        return <IonPage><p>Error</p></IonPage>;
    }
    if(user){
        // authenticate(dispatch, user);
        if(!isAuthenticateOnce){
            setAuthenticate(true);
            authenticate(dispatch, user);
            console.log("logged in");
        }
        return <Loading />
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
                            <IonItem lines="none" className={isDesktop ? "login-input-field" : "login-input-field-mobile"}>
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
                            <IonItem lines="none" className={isDesktop ? "login-input-field" : "login-input-field-mobile"}>
                                <IonLabel position="floating">
                                    Password
                                </IonLabel>
                                <IonInput type="password" value={password} onIonChange={(e: any) => setPassword(e.target.value)} />
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