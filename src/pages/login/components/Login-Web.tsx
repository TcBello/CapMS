import { IonButton, IonCard, IonIcon, IonInput, IonItem, IonLabel } from "@ionic/react";
import { lockClosed, mail } from "ionicons/icons";
import { Component } from "react";
import MediaQuery from "react-responsive";
import { webWidth } from "../../../core/Utils";
import BackgroundLogin from "./BackgroundLogin";

class LoginWeb extends Component{
    constructor(props: {}){
        super(props);
    }

    render(){
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
                                    <IonInput onIonChange={(e) => console.log(e)}></IonInput>
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
                                    <IonInput type="password" onIonChange={(e) => console.log(e)}></IonInput>
                                </IonItem>
                            </div>
                            <div className="spacer-h-m"/>
                            {/* LOGIN BUTTON */}
                            <IonButton className="login-button" href="/split-view">LOGIN</IonButton>
                        </IonCard>
                    </div>
                </MediaQuery>
            </div>
        );
    }
}

export default LoginWeb;