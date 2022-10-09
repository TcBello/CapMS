import { IonPage, IonContent, IonItem, IonLabel, IonButton, IonInput, IonAvatar } from "@ionic/react";
import { Component } from "react";
import { MobileArrowBackAppBar } from "../../../core/components/Mobile-Appbar";
import MediaQuery from "react-responsive";
import { webWidth } from "../../../core/Utils";

class ProposeTopicWeb extends Component{
    render(){
        return (
            <MediaQuery minWidth={webWidth}>
                <IonPage>
                    {/* APP BAR */}
                    <MobileArrowBackAppBar title="Propose a Topic" href="/split-view"/>
                    {/* CONTENT */}
                    <IonContent className="propose-topic-container">
                        {/* 1ST PREFERRED ADVISER */}
                        <IonItem lines="none">
                            {/* HEADER */}
                            <IonLabel slot="start" className="header">1st Preferred Adviser</IonLabel>
                            {/* SELECT BUTTON */}
                            <IonButton slot="end" className="select-button" shape="round" href="/projects/propose-topic/select-adviser/1">
                                <IonLabel className="select-text">Select</IonLabel>
                            </IonButton>
                        </IonItem>
                        <div className="spacer-h-s"/>
                        <div className="content-center">
                            {/* AVATAR */}
                            <IonAvatar className="avatar">
                                <img src="https://www.biowritingservice.com/wp-content/themes/tuborg/images/Executive%20Bio%20Sample%20Photo.png"/>
                            </IonAvatar>
                            {/* NAME */}
                            <h6>Sum Ting Wong</h6>
                        </div>
                        <div className="spacer-h-s"/>
                        {/* 2ND PREFERRED ADVISER */}
                        <IonItem lines="none">
                            {/* HEADER */}
                            <IonLabel slot="start" className="header">2nd Preferred Adviser</IonLabel>
                            {/* SELECT BUTTON */}
                            <IonButton slot="end" className="select-button" shape="round" href="/projects/propose-topic/select-adviser/2">
                                <IonLabel className="select-text">Select</IonLabel>
                            </IonButton>
                        </IonItem>
                        <div className="spacer-h-s"/>
                        <div className="content-center">
                            {/* AVATAR */}
                            <IonAvatar className="avatar">
                                <img src="https://www.biowritingservice.com/wp-content/themes/tuborg/images/Executive%20Bio%20Sample%20Photo.png"/>
                            </IonAvatar>
                            {/* NAME */}
                            <h6>Sum Ting Wong</h6>
                        </div>
                        <div className="spacer-h-s"/>
                        {/* 3RD PREFERRED ADVISER */}
                        <IonItem lines="none">
                            {/* HEADER */}
                            <IonLabel slot="start" className="header">3rd Preferred Adviser</IonLabel>
                            {/* SELECT BUTTON */}
                            <IonButton slot="end" className="select-button" shape="round" href="/projects/propose-topic/select-adviser/3">
                                <IonLabel className="select-text">Select</IonLabel>
                            </IonButton>
                        </IonItem>
                        <div className="spacer-h-s"/>
                        <div className="content-center">
                            {/* AVATAR */}
                            <IonAvatar className="avatar">
                                <img src="https://www.biowritingservice.com/wp-content/themes/tuborg/images/Executive%20Bio%20Sample%20Photo.png"/>
                            </IonAvatar>
                            {/* NAME */}
                            <h6>Sum Ting Wong</h6>
                        </div>
                        <div className="spacer-h-s"/>
                        {/* NAME OF THE PROJECT FIELD */}
                        <IonItem lines="none" className="input-field">
                            <IonLabel position="floating">
                                Name of the Project
                            </IonLabel>
                            <IonInput onIonChange={(e) => console.log(e)}></IonInput>
                        </IonItem>
                        <div className="spacer-h-s"/>
                        {/* ABSTRACT FORM FIELD */}
                        <IonItem lines="none" className="input-field">
                            <IonLabel position="floating">
                                Abstract Form (Google Doc Link)
                            </IonLabel>
                            <IonInput onIonChange={(e) => console.log(e)}></IonInput>
                        </IonItem>
                        <div className="spacer-h-xl"/>
                        <div className="content-right">
                            {/* CANCEL BUTTON */}
                            <IonButton fill="clear">
                                <IonLabel>Cancel</IonLabel>
                            </IonButton>
                            {/* SUBMIT BUTTON */}
                            <IonButton shape="round" className="submit-button">
                                <IonLabel className="submit-text">Submit</IonLabel>
                            </IonButton>
                        </div>
                        <div className="spacer-h-s"/>
                    </IonContent>
                </IonPage>
            </MediaQuery>
        );
    }
}

export default ProposeTopicWeb;