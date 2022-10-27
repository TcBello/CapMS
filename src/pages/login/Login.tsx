import { IonButton, IonCard, IonContent, IonIcon, IonInput, IonItem, IonLabel, IonPage} from "@ionic/react";
import { lockClosed, mail } from "ionicons/icons";
import { Component, useState } from "react";
import BackgroundLogin from "./components/BackgroundLogin";
import "../../core/components/Spacer.css";
import { useMediaQuery } from "react-responsive";
import "./Login.css";
import { webWidth } from "../../core/Utils";

const Login = () => {
    const isDesktop = useMediaQuery({minWidth: webWidth});

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
                        <IonButton className="login-button" onClick={Login}>LOGIN</IonButton>
                    </IonCard>
                </div>
        </IonContent>
    </IonPage>
};

export default Login;