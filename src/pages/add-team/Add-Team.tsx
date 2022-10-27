import { IonAvatar, IonButton, IonContent, IonInput, IonItem, IonLabel, IonPage } from "@ionic/react"
import { MobileArrowBackAppBar } from "../../core/components/Mobile-Appbar";
import "./Add-Team.css";
import "../../core/components/Spacer.css";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { webWidth } from "../../core/Utils";

const AddTeam = () => {
    const [name, setName] = useState("");

    const isDesktop = useMediaQuery({minWidth: webWidth});

    return <IonPage>
        {/* APP BAR */}
        <MobileArrowBackAppBar title="Add Team" href="split-view-admin" />
        {/* CONTENT */}
        <IonContent>
            {/* 1ST MEMBER */}
            <IonItem lines="none">
                <IonLabel slot="start" className="add-team-header">1st Member</IonLabel>
                <IonButton slot="end" className="add-team-select-button" shape="round" href="/home/admin/teams/add/select-a-student">Select</IonButton>
            </IonItem>
            <div className="spacer-h-s"/>
            {/* AVATAR WITH NAME */}
            <div className="add-team-content-center">
                {/* <img src="https://www.biowritingservice.com/wp-content/themes/tuborg/images/Executive%20Bio%20Sample%20Photo.png" className="add-team-avatar"/> */}
                <IonAvatar className="add-team-avatar">
                <img src="https://www.biowritingservice.com/wp-content/themes/tuborg/images/Executive%20Bio%20Sample%20Photo.png"/>
                </IonAvatar>
                <h6 className="add-team-member-name">Sum Ting Wong</h6>
            </div>
            {/* 2ND MEMBER */}
            <IonItem lines="none">
                <IonLabel slot="start" className="add-team-header">2nd Member</IonLabel>
                <IonButton slot="end" className="add-team-select-button" shape="round" href="/home/admin/teams/add/select-a-student">Select</IonButton>
            </IonItem>
            <div className="spacer-h-s"/>
            {/* AVATAR WITH NAME */}
            <div className="add-team-content-center">
                {/* <img src="https://www.biowritingservice.com/wp-content/themes/tuborg/images/Executive%20Bio%20Sample%20Photo.png" className="add-team-avatar"/> */}
                <IonAvatar className="add-team-avatar">
                <img src="https://www.biowritingservice.com/wp-content/themes/tuborg/images/Executive%20Bio%20Sample%20Photo.png"/>
                </IonAvatar>
                <h6 className="add-team-member-name">Sum Ting Wong</h6>
            </div>
            {/* 3RD MEMBER */}
            <IonItem lines="none">
                <IonLabel slot="start" className="add-team-header">3rd Member</IonLabel>
                <IonButton slot="end" className="add-team-select-button" shape="round" href="/home/admin/teams/add/select-a-student">Select</IonButton>
            </IonItem>
            <div className="spacer-h-s"/>
            {/* AVATAR WITH NAME */}
            <div className="add-team-content-center">
                {/* <img src="https://www.biowritingservice.com/wp-content/themes/tuborg/images/Executive%20Bio%20Sample%20Photo.png" className="add-team-avatar"/> */}
                <IonAvatar className="add-team-avatar">
                <img src="https://www.biowritingservice.com/wp-content/themes/tuborg/images/Executive%20Bio%20Sample%20Photo.png"/>
                </IonAvatar>
                <h6 className="add-team-member-name">Sum Ting Wong</h6>
            </div>
            <div className="spacer-h-m"/>
            {/* TEAM NAME INPUT FIELD */}
            <IonItem lines="none" className={isDesktop ? "add-team-input-field" : "add-team-input-field-mobile"}>
                <IonLabel position="floating">
                    Team Name
                </IonLabel>
                <IonInput value={name} onIonChange={(e: any) => setName(e.target.value)} />
            </IonItem>
            <div className="spacer-h-m"/>
            <div className="add-team-content-right">
                {/* CANCEL BUTTON */}
                <IonButton fill="clear" className="add-team-cancel-button" href="split-view-admin">Cancel</IonButton>
                <div className="spacer-w-xs" />
                {/* ADD BUTTON */}
                <IonButton className="add-team-add-button" shape="round">Add</IonButton>
                <div className="spacer-w-xs" />
            </div>
            <div className="spacer-h-m"/>
        </IonContent>
    </IonPage>
}

export default AddTeam;