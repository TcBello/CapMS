import { IonAvatar, IonButton, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonTitle } from "@ionic/react";
import { Component, useEffect, useState } from "react";
import ProfileMobile from "./components/Profile-Mobile";
import ProfileWeb from "./components/Profile-Web";
import "./Profile.css";
import "../../core/components/Spacer.css";
import { person, mail, school, call } from "ionicons/icons";
import ContentHeader from "../../core/components/ContentHeader";
import { useMediaQuery } from "react-responsive";
import { defaultImage, getStorageData, webWidth } from "../../core/Utils";
import { MobileMenuAppBar } from "../../core/components/Mobile-Appbar";
import UserModel, { setUserModel } from "../../core/models/user_model";
import { getAdminProfile } from "../../core/services/admin_service";

const Profile = () => {
    const isDesktop = useMediaQuery({ minWidth: webWidth });

    const [user, setUser] = useState<UserModel>(setUserModel({}));

    const userData = getStorageData("user");
    const userModel = (JSON.parse(userData!)) as UserModel;

    useEffect(() => {
        getAdminProfile(userModel.uid).then((value: any) => {
            setUser(value as UserModel);
        });
    }, []);

    return (
        <IonPage>
            {/* APP BAR */}
            {
                isDesktop
                    ? <ContentHeader title="User Profile" />
                    : <MobileMenuAppBar title="User Profile" />
            }
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
                                        <IonLabel>{userModel.firstName +" "+ userModel.lastName}</IonLabel>
                                    </IonItem>
                                    {/* EMAIL */}
                                    <IonItem lines="none">
                                        <IonIcon icon={mail} slot="start" color="black"></IonIcon>
                                        <IonLabel>{user.email}</IonLabel>
                                    </IonItem>
                                      {/* SR CODE */}
                                      <IonItem lines="none">
                                        <IonIcon src="/assets/icon/srcode-logo.svg" slot="start" color="black"></IonIcon>
                                        <IonLabel>{userModel.srCode}</IonLabel>
                                    </IonItem>
                                    {/* MAJOR IN */}
                                    <IonItem lines="none">
                                        <IonIcon icon={school} slot="start" color="black"></IonIcon>
                                        <IonLabel>{userModel.course}</IonLabel>
                                    </IonItem>
                                </IonList>
                                <div className="content-right">
                                    {/* PROFILE IMAGE */}
                                    <IonAvatar className="profile-image">
                                        <img src={defaultImage} />
                                    </IonAvatar>
                                    {/* EDIT BUTTON */}
                                    <IonButton className="edit-button" href="/home/admin/profile/edit-password">Edit Password</IonButton>
                                </div>
                            </div>
                        </div>
                        // MOBILE VIEW
                        : <div className="profile-mobile-container">
                            <div className="profile-mobile-content-center">
                            <div className="spacer-h-l"/>
                                {/* PHOTO */}
                                <IonAvatar className="photo">
                                    <img src={defaultImage} />
                                </IonAvatar>
                                 {/* NAME */}
                                 <h5 className="name">{userModel.firstName + " " + userModel.lastName}</h5>
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
                                        <IonLabel>{userModel.srCode}</IonLabel>
                                    </IonItem>
                                    {/* MAJOR IN */}
                                    <IonItem lines="none">
                                        <IonIcon icon={school} slot="start" color="black"></IonIcon>
                                        <IonLabel>{userModel.course}</IonLabel>
                                    </IonItem>
                            <IonButton className="edit-button-mobile" shape="round" href="/home/admin/profile/edit-password">Edit Password</IonButton>
                        </div>
                }
            </IonContent>
        </IonPage>
    );
};

const ProfileAdmin = () => {
    const isDesktop = useMediaQuery({ minWidth: webWidth });

    const [user, setUser] = useState<UserModel>(setUserModel({}));

    const userData = getStorageData("user");
    const userModel = (JSON.parse(userData!)) as UserModel;

    useEffect(() => {
        getAdminProfile(userModel.uid).then((value: any) => {
            setUser(value as UserModel);
        });
    }, []);

    return (
        <IonPage>
            {/* APP BAR */}
            {
                isDesktop
                    ? <ContentHeader title="User Profile" />
                    : <MobileMenuAppBar title="User Profile" />
            }
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
                                        <IonLabel>{user.role}</IonLabel>
                                    </IonItem>
                                    {/* EMAIL */}
                                    <IonItem lines="none">
                                        <IonIcon icon={mail} slot="start" color="black"></IonIcon>
                                        <IonLabel>{user.email}</IonLabel>
                                    </IonItem>
                                </IonList>
                                <div className="content-right">
                                    {/* PROFILE IMAGE */}
                                    <IonAvatar className="profile-image">
                                        <img src={defaultImage} />
                                    </IonAvatar>
                                    {/* EDIT BUTTON */}
                                    <IonButton className="edit-button" href="/home/admin/profile/edit-password">Edit Password</IonButton>
                                </div>
                            </div>
                        </div>
                        // MOBILE VIEW
                        : <div className="profile-mobile-container">
                            <div className="profile-mobile-content-center">
                            <div className="spacer-h-l"/>
                                {/* PHOTO */}
                                <IonAvatar className="photo">
                                    <img src={defaultImage} />
                                </IonAvatar>
                                {/* NAME */}
                                <h5 className="name">{user.role}</h5>
                                {/* ROLE */}
                                <h5 className="role">{user.role}</h5>
                            </div>
                            <div className="spacer-h-m"/>
                            {/* EMAIL */}
                            <IonItem lines="none">
                                <IonIcon icon={mail} slot="start" />
                                <IonLabel>{user.email}</IonLabel>
                            </IonItem>
                            <IonButton className="edit-button-mobile" shape="round" href="/home/admin/profile/edit-password">Edit Password</IonButton>
                        </div>
                }
            </IonContent>
        </IonPage>
    );
};

export { ProfileAdmin, Profile };
