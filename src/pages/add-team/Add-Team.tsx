import { IonAvatar, IonButton, IonContent, IonInput, IonItem, IonLabel, IonPage, useIonToast } from "@ionic/react"
import { MobileArrowBackAppBar } from "../../core/components/Mobile-Appbar";
import "./Add-Team.css";
import "../../core/components/Spacer.css";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { clearStorageData, defaultImage, getStorageData, replacePage, showToast, webWidth } from "../../core/Utils";
import { useSelector } from "react-redux";
import UserModel, { setUserModel } from "../../core/models/user_model";
import { selectedStudents } from "../../core/redux/slices/select-student-slice";
import InputField from "../../core/components/InputField";
import { createTeam } from "../../core/services/admin_service";
import { CreateTeamMessage } from "../../core/Success";

const AddTeam = () => {
    const [name, setName] = useState("");

    const [firstMember, setFirstMember] = useState<UserModel>(setUserModel({
        firstName: "First",
        lastName: "Member Name",
        image: defaultImage
    }));

    const [secondMember, setSecondMember] = useState<UserModel>(setUserModel({
        firstName: "Second",
        lastName: "Member Name",
        image: defaultImage
    }));

    const [thirdMember, setThirdMember] = useState<UserModel>(setUserModel({
        firstName: "Third",
        lastName: "Member Name",
        image: defaultImage
    }));

    const isDesktop = useMediaQuery({minWidth: webWidth});
    
    const [toast] = useIonToast();

    async function addTeam() {
        // CREATE TEAM
        await createTeam(name, firstMember, secondMember, thirdMember);

        // CLEAR LOCAL STORAGE DATA
        clearStorageData();

        // SET INITIAL DATA
        setFirstMember(setUserModel({
            firstName: "First",
            lastName: "Member Name",
            image: defaultImage
        }));

        setSecondMember(setUserModel({
            firstName: "Second",
            lastName: "Member Name",
            image: defaultImage
        }));

        setThirdMember(setUserModel({
            firstName: "Third",
            lastName: "Member Name",
            image: defaultImage
        }));

        setName("");

        // SHOW TOAST
        showToast(toast, CreateTeamMessage);
    }

    function cancel(){
        clearStorageData();
        replacePage("split-view-admin");
    }

    useEffect(() => {
        // ON MOUNT
        const currentFirstMember = getStorageData('first-member');
        const currentSecondMember = getStorageData('second-member');
        const currentThirdMember = getStorageData('third-member');
        
        if(currentFirstMember != null){
            setFirstMember(JSON.parse(currentFirstMember));
        }

        if(currentSecondMember != null){
            setSecondMember(JSON.parse(currentSecondMember));
        }

        if(currentThirdMember != null){
            setThirdMember(JSON.parse(currentThirdMember));
        }
    }, []);

    return <IonPage>
        {/* APP BAR */}
        <MobileArrowBackAppBar title="Add Team" href="split-view-admin" />
        {/* CONTENT */}
        <IonContent>
            {/* 1ST MEMBER */}
            <IonItem lines="none">
                <IonLabel slot="start" className="add-team-header">1st Member</IonLabel>
                <IonButton slot="end" className="add-team-select-button" shape="round" href="/home/admin/teams/add/select-a-student/first-member">Select</IonButton>
            </IonItem>
            <div className="spacer-h-s"/>
            {/* AVATAR WITH NAME */}
            <div className="add-team-content-center">
                <IonAvatar className="add-team-avatar">
                    <img src={firstMember.image}/>
                </IonAvatar>
                <h6 className="add-team-member-name">{firstMember.firstName + " " + firstMember.lastName}</h6>
            </div>
            {/* 2ND MEMBER */}
            <IonItem lines="none">
                <IonLabel slot="start" className="add-team-header">2nd Member</IonLabel>
                <IonButton slot="end" className="add-team-select-button" shape="round" href="/home/admin/teams/add/select-a-student/second-member">Select</IonButton>
            </IonItem>
            <div className="spacer-h-s"/>
            {/* AVATAR WITH NAME */}
            <div className="add-team-content-center">
                <IonAvatar className="add-team-avatar">
                    <img src={secondMember.image}/>
                </IonAvatar>
                <h6 className="add-team-member-name">{secondMember.firstName + " " + secondMember.lastName}</h6>
            </div>
            {/* 3RD MEMBER */}
            <IonItem lines="none">
                <IonLabel slot="start" className="add-team-header">3rd Member</IonLabel>
                <IonButton slot="end" className="add-team-select-button" shape="round" href="/home/admin/teams/add/select-a-student/third-member">Select</IonButton>
            </IonItem>
            <div className="spacer-h-s"/>
            {/* AVATAR WITH NAME */}
            <div className="add-team-content-center">
                <IonAvatar className="add-team-avatar">
                    <img src={thirdMember.image}/>
                </IonAvatar>
                <h6 className="add-team-member-name">{thirdMember.firstName + " " + thirdMember.lastName}</h6>
            </div>
            <div className="spacer-h-m"/>
            {/* TEAM NAME INPUT FIELD */}
            <div className={isDesktop ? "add-team-input-field" : "add-team-content-center"}>
                <InputField title="Team Name" useState={[name, setName]} obscure={false}/>
            </div>
            <div className="spacer-h-m"/>
            <div className="add-team-content-right">
                {/* CANCEL BUTTON */}
                <IonButton fill="clear" className="add-team-cancel-button" onClick={cancel}>Cancel</IonButton>
                <div className="spacer-w-xs" />
                {/* ADD BUTTON */}
                <IonButton className="add-team-add-button" shape="round" onClick={addTeam}>Add</IonButton>
                <div className="spacer-w-s" />
            </div>
            <div className="spacer-h-m"/>
        </IonContent>
    </IonPage>
}

export default AddTeam;