import { IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonMenuButton, IonPage } from "@ionic/react";
import { call, mail, school } from "ionicons/icons";
import { Component } from "react";
import { MobileMenuAppBar } from "../../../core/components/Mobile-Appbar";

class ProfileMobile extends Component{
    render(){
        return (
            <IonContent className="profile-mobile-page">
                {/* APPBAR */}
                <MobileMenuAppBar title="Profile" />
                <div className="profile-mobile-container">
                    <div className="profile-mobile-content-center">
                    <div className="spacer-h-l"/>
                        {/* PHOTO */}
                        <div className="photo" />
                        {/* NAME */}
                        <h5 className="name">Sum Ting Wong</h5>
                        {/* ROLE */}
                        <h5 className="role">Student</h5>
                    </div>
                    <div className="spacer-h-m"/>
                    {/* EMAIL */}
                    <IonItem lines="none">
                        <IonIcon icon={mail} slot="start" />
                        <IonLabel>sumting.wong@g.batstate-u.edu.ph</IonLabel>
                    </IonItem>
                    {/* SR CODE */}
                    <IonItem lines="none">
                        <IonIcon icon="/assets/icon/srcode-logo.svg" slot="start" />
                        <IonLabel>19-00345</IonLabel>
                    </IonItem>
                    {/* MAJOR IN */}
                    <IonItem lines="none">
                        <IonIcon icon={school} slot="start" />
                        <IonLabel>Major in Business Analytics</IonLabel>
                    </IonItem>
                    {/* CONTACT NUMBER */}
                    <IonItem lines="none">
                        <IonIcon icon={call} slot="start" />
                        <IonLabel>09203457123</IonLabel>
                    </IonItem>
                </div>
            </IonContent>
        );
    }
}

export default ProfileMobile;