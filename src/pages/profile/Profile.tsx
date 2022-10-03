import { IonContent, IonHeader, IonMenuButton, IonPage, IonTitle } from "@ionic/react";
import { Component } from "react";
import ProfileMobile from "./components/Profile-Mobile";
import ProfileWeb from "./components/Profile-Web";
import "./Profile.css";
import "../../core/components/Spacer.css";

class Profile extends Component{
    render(){
        return (
            <IonPage>
                {/* PROFILE WEB VERSION */}
                <ProfileWeb />
                {/* PROFILE MOBILE VERSION */}
                <ProfileMobile />
            </IonPage>
        );
    }
}

export default Profile;