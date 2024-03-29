import { IonAvatar, IonButton, IonContent, IonInput, IonItem, IonLabel, IonPage, useIonToast } from "@ionic/react";
import { Component, useEffect, useState } from "react";
import "./Propose-Topic.css";
import "../../core/components/Spacer.css";
import { MobileArrowBackAppBar } from "../../core/components/Mobile-Appbar";
import { useMediaQuery } from "react-responsive";
import { getStorageData, removeStorageData, replacePage, showToast, webWidth } from "../../core/Utils";
import UserModel, { setUserModel } from "../../core/models/user_model";
import { ProposeTopicMessage } from "../../core/Success";
import { proposeTopic } from "../../core/services/user_service";
import TeamModel from "../../core/models/team_model";
import InputField from "../../core/components/InputField";
import { MissingFieldError, SomethingWrongError } from "../../core/Errors";
import Loading from "../../core/components/Loading";

const ProposeTopic = () => {
    const adviserInitialData = setUserModel({
        firstName: "No",
        lastName: "Adviser"
    });

    const [adviser, setAdviser] = useState<UserModel>(adviserInitialData);
    const [projectName, setProjectName] = useState("");
    const [abstractForm, setAbstractForm] = useState("");
    const [loading, setLoading] = useState(false);

    const [toast] = useIonToast();

    const teamStorageData = getStorageData("my-team");
    const myTeamModel = (JSON.parse(teamStorageData!)) as TeamModel;
    const adviserStorageData = getStorageData("preffered-adviser");

    useEffect(() => {
        if(adviserStorageData != null){
            setAdviser((JSON.parse(adviserStorageData!)) as UserModel);
        }
    }, []);

    function cancel(){
        removeStorageData("preffered-adviser");
        replacePage("/split-view/projects");
    }

    async function submitProposal(){
        if(adviserStorageData != null){
            if(projectName != "" && abstractForm != ""){

                setLoading(true);
                // PROPOSE A TOPIC
                const result = await proposeTopic(adviser, myTeamModel, projectName, abstractForm);
                setLoading(false);

                if(result){
                    // SHOW TOAST
                    showToast(toast, ProposeTopicMessage);

                    // RESET VALUES
                    removeStorageData("preffered-adviser");
                    setAdviser(adviserInitialData);
                    setProjectName("");
                    setAbstractForm("");
                }
                else{
                    showToast(toast, SomethingWrongError);
                }
            }
            else{
                showToast(toast, MissingFieldError);
            }
        }
        else{
            showToast(toast, "Adviser is missing");
        }
    }

    if(!loading) {
        return <IonPage>
        {/* APP BAR */}
        <MobileArrowBackAppBar title="Propose a Topic" href="/split-view/projects" />
        {/* CONTENT */}
        <IonContent className="propose-topic-container">
            {/* PREFERRED ADVISER */}
            <IonItem lines="none">
                {/* HEADER */}
                <IonLabel slot="start" className="header">Preferred Adviser</IonLabel>
                {/* SELECT BUTTON */}
                <IonButton slot="end" className="select-button" shape="round" href="/projects/propose-topic/select-adviser/1">
                    <IonLabel className="select-text">Select</IonLabel>
                </IonButton>
            </IonItem>
            <div className="spacer-h-s" />
            <div className="content-center">
                {/* AVATAR */}
                <IonAvatar className="avatar">
                    <img src={adviser.image} />
                </IonAvatar>
                {/* NAME */}
                <h6>{adviser.firstName} {adviser.lastName}</h6>
            </div>
            <div className="spacer-h-s" />
            {/* NAME OF THE PROJECT FIELD */}
            <InputField title="Name of the Project" useState={[projectName, setProjectName]} obscure={false} />
            <div className="spacer-h-s" />
            {/* ABSTRACT FORM FIELD */}
            <InputField title="Abstract Form (Google Doc Link)" useState={[abstractForm, setAbstractForm]} obscure={false} />
            <div className="spacer-h-xl" />
            <div className="content-right">
                {/* CANCEL BUTTON */}
                <IonButton fill="clear" onClick={cancel}>
                    <IonLabel>Cancel</IonLabel>
                </IonButton>
                {/* SUBMIT BUTTON */}
                <IonButton shape="round" className="submit-button" onClick={submitProposal}>
                    <IonLabel className="submit-text">Submit</IonLabel>
                </IonButton>
            </div>
            <div className="spacer-h-s" />
        </IonContent>
    </IonPage>;

    } else{
        return <Loading />
    }
}

export default ProposeTopic;