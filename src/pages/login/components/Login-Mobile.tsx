import { IonIcon, IonItem, IonLabel, IonInput, IonButton } from "@ionic/react";
import { lockClosed, mail } from "ionicons/icons";
import { Component } from "react";
import { useHistory } from "react-router";

class LoginMobile extends Component{
    render(){
        return (
            <div className="login-container-mobile">
                <div className="spacer-h-xl"/>
                {/* CAPMS HEADER */}
                <h1>Cap<span>MS</span></h1>
                <div className="spacer-h-xl"/>
                <div className="spacer-h-m"/>
                {/* EMAIL FIELD */}
                <div className="input-field-container">
                    {/* EMAIL ICON */}
                    <IonIcon icon={mail} className="icon"></IonIcon>
                    <div className="spacer-w-xs" />
                    {/* EMAIL INPUT FIELD */}
                    <IonItem lines="none" className="input-field-mobile">
                        <IonLabel position="floating">
                            Email
                        </IonLabel>
                        <IonInput onIonChange={(e) => console.log(e)}></IonInput>
                    </IonItem>
                </div>
                <div className="spacer-h-s"/>
                {/* PASSWORD FIELD */}
                <div className="input-field-container">
                    {/* PASSWORD ICON */}
                    <IonIcon icon={lockClosed} className="icon"></IonIcon>
                    <div className="spacer-w-xs" />
                    {/* PASSWORD INPUT FIELD */}
                    <IonItem lines="none" className="input-field-mobile">
                        <IonLabel position="floating">
                            Password
                        </IonLabel>
                        <IonInput type="password" onIonChange={(e) => console.log(e)}></IonInput>
                    </IonItem>
                </div>
                <div className="spacer-h-xl"/>
                {/* LOGIN BUTTON */}
                <IonButton className="login-button" href="/split-view">LOGIN</IonButton>
            </div>
        );
    }
}

export default LoginMobile;