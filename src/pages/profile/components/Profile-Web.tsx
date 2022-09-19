import { IonPage, IonContent, IonHeader, IonMenuButton, IonTitle, IonList, IonItem, IonIcon, IonLabel, IonImg, IonButton } from "@ionic/react";
import { call, mail, person, school } from "ionicons/icons";
import { Component } from "react";
import MediaQuery from 'react-responsive';
import ContentHeader from "../../../core/components/ContentHeader";
import { webHeight } from "../../../core/Utils";
import "../Profile.css";

class ProfileWeb extends Component{
    render(){
        return (
            <MediaQuery minWidth={webHeight}>
                <IonPage>
                    <ContentHeader title="User Profile"/>
                    <IonContent className="content">
                        <div className="profile-container">
                            <div className="colorHeader"/>
                            <div className="content-left">
                                {/* INFORMATIONS */}
                                <IonList>
                                    {/* NAME */}
                                    <IonItem lines="none">
                                        <IonIcon icon={person} slot="start" color="black"></IonIcon>
                                        <IonLabel>Sum Ting Wong</IonLabel>
                                    </IonItem>
                                    {/* EMAIL */}
                                    <IonItem lines="none">
                                        <IonIcon icon={mail} slot="start" color="black"></IonIcon>
                                        <IonLabel>sumting.wong@g.batstate-u.edu.ph</IonLabel>
                                    </IonItem>
                                    {/* SR CODE */}
                                    <IonItem lines="none">
                                        <IonIcon src="/assets/icon/srcode-logo.svg" slot="start" color="black"></IonIcon>
                                        <IonLabel>18-05833</IonLabel>
                                    </IonItem>
                                    {/* MAJOR IN */}
                                    <IonItem lines="none">
                                        <IonIcon icon={school} slot="start" color="black"></IonIcon>
                                        <IonLabel>Major in Business Analytics</IonLabel>
                                    </IonItem>
                                    {/* CONTACT NUMBER */}
                                    <IonItem lines="none">
                                        <IonIcon icon={call} slot="start" color="black"></IonIcon>
                                        <IonLabel>09204308099</IonLabel>
                                    </IonItem>
                                </IonList>
                                <div className="content-right">
                                    {/* PROFILE IMAGE */}
                                    <div className="profile-image"></div>
                                    {/* EDIT BUTTON */}
                                    <IonButton className="edit-button">Edit Profile</IonButton>
                                </div>
                            </div>
                        </div>
                    </IonContent>
                </IonPage>
            </MediaQuery>
        );
    }
}

export default ProfileWeb;