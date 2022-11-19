import { IonAvatar, IonButton, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonTitle, useIonToast } from "@ionic/react";
import { Component, useEffect, useState } from "react";
// import "./Profile.css";
import "../../core/components/Spacer.css";
import { person, mail, school, call } from "ionicons/icons";
import ContentHeader from "../../core/components/ContentHeader";
import { useMediaQuery } from "react-responsive";
import { defaultImage, getStorageData, replacePage, showToast, webWidth } from "../../core/Utils";
import { MobileArrowBackAppBar, MobileMenuAppBar } from "../../core/components/Mobile-Appbar";
import UserModel, { setUserModel } from "../../core/models/user_model";
import { deleteAccount, getAdminProfile } from "../../core/services/admin_service";
import "../../core/components/Spacer.css";
import "./other-profile.css";
import Loading from "../../core/components/Loading";
import { DeleteAccountMessage } from "../../core/Success";

const OtherProfile = (props: any) => {
    const isDesktop = useMediaQuery({ minWidth: webWidth });

    const [user, setUser] = useState<UserModel>(setUserModel({}));

    const [loading, setLoading] = useState(false);


    const isFaculty = props.match.params.role == "faculty-staffs";

    const userData = isFaculty
        ? getStorageData("faculty-profile")
        : getStorageData("student-profile");
    const userModel = (JSON.parse(userData!)) as UserModel;

    const href = isFaculty
        ? "/home/admin/faculty-staffs/profile/edit"
        : "/home/admin/students/profile/edit";

    const [toast] = useIonToast();

    async function deleteUser(){

        setLoading(true);

        await deleteAccount(user.uid);

        setLoading(false);

        showToast(toast, DeleteAccountMessage);

        replacePage("split-view-admin");

    }

    useEffect(() => {
        setUser(userModel);
    }, []);

  if(!loading){
    return (
        <IonPage>
            {/* APP BAR */}
            <MobileArrowBackAppBar href="Split-view-admin" title="Student's Profile" />
            <IonContent className={isDesktop ? "profile-content" : "profile-content-mpbile"}>
                {
                    isDesktop
                    // DESKTOP VIEW
                        ? <div className="profile-container">
                            <div className="colorHeader" />
                            <div className="content-left">
                                {/* INFORMATIONS */}
                                    <IonList>
                                        {/* NAME */}
                                        <IonItem lines="none">
                                            <IonIcon icon={person} slot="start" color="black"></IonIcon>
                                            <IonLabel>{user.firstName +" "+ user.lastName}</IonLabel>
                                        </IonItem>
                                    {/* EMAIL */}
                                    <IonItem lines="none">
                                        <IonIcon icon={mail} slot="start" color="black"></IonIcon>
                                        <IonLabel>{user.email}</IonLabel>
                                    </IonItem>
                                      {/* SR CODE */}
                                      <IonItem lines="none">
                                        <IonIcon src="/assets/icon/srcode-logo.svg" slot="start" color="black"></IonIcon>
                                        <IonLabel>{user.srCode}</IonLabel>
                                    </IonItem>
                                    {/* MAJOR IN */}
                                    <IonItem lines="none">
                                        <IonIcon icon={school} slot="start" color="black"></IonIcon>
                                        <IonLabel>{user.course}</IonLabel>
                                    </IonItem>
                                </IonList>
                                <div className="content-right">
                                    {/* PROFILE IMAGE */}
                                    <IonAvatar className="profile-image">
                                        <img src={user.image} />
                                    </IonAvatar>
                                    {/* EDIT BUTTON */}
                                    <IonButton className="edit-button" href={href}>Edit Profile</IonButton>
                                    <div className="spacer-h-s" />
                                    {/* DELETE BUTTON */}
                                    <IonButton className="other-profile-delete-button" onClick={deleteUser} fill="clear">Delete Account</IonButton>
                                </div>
                            </div>
                        </div>
                        // MOBILE VIEW
                        : <div className="profile-mobile-container">
                            <div className="profile-mobile-content-center">
                            <div className="spacer-h-l"/>
                                {/* PHOTO */}
                                <IonAvatar className="photo">
                                    <img src={user.image} />
                                </IonAvatar>
                                 {/* NAME */}
                                 <h5 className="name">{user.firstName + " " + user.lastName}</h5>
                                {/* ROLE */}
                                <h5 className="role">{user.role}</h5>
                            </div>
                            <div className="spacer-h-m"/>
                            {/* EMAIL */}
                            <IonItem lines="none">
                                <IonIcon icon={mail} slot="start" />
                                <IonLabel>{user.email}</IonLabel>
                            </IonItem>
                                    {/* SR CODE */}
                                    <IonItem lines="none">
                                        <IonIcon src="/assets/icon/srcode-logo.svg" slot="start" color="black"></IonIcon>
                                        <IonLabel>{user.srCode}</IonLabel>
                                    </IonItem>
                                    {/* MAJOR IN */}
                                    <IonItem lines="none">
                                        <IonIcon icon={school} slot="start" color="black"></IonIcon>
                                        <IonLabel>{user.course}</IonLabel>
                                    </IonItem>
                            {/* EDIT BUTTON */}
                            <IonButton className="edit-button-mobile" shape="round" href={href}>Edit Profile</IonButton>
                            <div className="spacer-h-s" />
                            <IonButton className="other-profile-delete-button-mobile" shape="round" onClick={deleteUser} fill="clear">Delete Account</IonButton>
                        </div>
                }
            </IonContent>
        </IonPage>
    );
  }
  else{
    return <Loading />
  }
};

export default OtherProfile;