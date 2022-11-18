import { IonAvatar, IonButton, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonTitle } from "@ionic/react";
import { Component, useEffect, useState } from "react";
// import "./Profile.css";
import "../../core/components/Spacer.css";
import { person, mail, school, call } from "ionicons/icons";
import ContentHeader from "../../core/components/ContentHeader";
import { useMediaQuery } from "react-responsive";
import { defaultImage, getStorageData, replacePage, webWidth } from "../../core/Utils";
import { MobileArrowBackAppBar, MobileMenuAppBar } from "../../core/components/Mobile-Appbar";
import UserModel, { setUserModel } from "../../core/models/user_model";
import { deleteAccount, getAdminProfile } from "../../core/services/admin_service";
import "../../core/components/Spacer.css";
import "./team-profile.css";
import Loading from "../../core/components/Loading";

const TeamProfile = () => {
const [loading, setLoading] = useState(false);


    

    function deleteTeam() {

        // SetLoading(true);

        // // do here

        setLoading(false);
    }

    if(!loading){
        
    return <IonPage>
    {/* APP BAR */}
    <MobileArrowBackAppBar title="Team's Profile" href="split-view-admin"/>
    {/* CONTENT */}
    <IonContent>
    <div className="teamprofile-center">
    <IonList>
        
        {/* TEAM NAME */}
        <IonItem lines="none">
            <IonLabel className="header-name"><h1>Team Name 1</h1></IonLabel>
        </IonItem>
         {/* PROFILE IMAGE */}
         <IonAvatar className="image-center">
            <img src= {defaultImage}/>
        </IonAvatar>
         {/* NAME */}
         <IonItem lines="none">
            <IonLabel className="subtext"><h2>Name 1</h2></IonLabel>
        </IonItem>
          {/* PROFILE IMAGE */}
          <IonAvatar className="image-center">
            <img src= {defaultImage}/>
        </IonAvatar>
         {/* NAME */}
         <IonItem lines="none">
            <IonLabel className="subtext"><h2>Name 2</h2></IonLabel>
        </IonItem>
          {/* PROFILE IMAGE */}
          <IonAvatar className="image-center">
            <img src= {defaultImage}/>
        </IonAvatar>
         {/* NAME */}
         <IonItem lines="none">
            <IonLabel className="subtext"><h2>Name 3</h2></IonLabel>
        </IonItem>
        <IonItem lines="none">
            <IonLabel className="header-name"><h1>Adviser</h1></IonLabel>
        </IonItem>
          {/* PROFILE IMAGE */}
          <IonAvatar className="image-center">
            <img src= {defaultImage}/>
        </IonAvatar>
        <IonItem lines="none">
            {/* NAME */}
            <IonLabel className="subtext"><h2>Adviser Name</h2></IonLabel>
        </IonItem>
        {/* LOGIN BUTTON */}
        <IonButton shape="round" className="btn-delete-team" onClick={deleteTeam}>Delete Team</IonButton>
        

        </IonList>
    </div>
    </IonContent>
</IonPage>;
    }

    else {
        return <Loading />;
    }


};

export default TeamProfile;