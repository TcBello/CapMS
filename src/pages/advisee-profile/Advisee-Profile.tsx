import { IonAvatar, IonButton, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonTitle, useIonToast } from "@ionic/react";
import { Component, useEffect, useState } from "react";
// import "./Profile.css";
import "../../core/components/Spacer.css";
import { person, mail, school, call } from "ionicons/icons";
import ContentHeader from "../../core/components/ContentHeader";
import { useMediaQuery } from "react-responsive";
import { defaultImage, getStorageData, goPage, goToGoogleMeet, replacePage, showToast, webWidth } from "../../core/Utils";
import { MobileArrowBackAppBar, MobileMenuAppBar } from "../../core/components/Mobile-Appbar";
import UserModel, { setUserModel } from "../../core/models/user_model";
import { deleteAccount, deleteTeam, getAdminProfile } from "../../core/services/admin_service";
import "./Advisee-Profile.css";
import Loading from "../../core/components/Loading";
import TeamModel, { setTeamModel } from "../../core/models/team_model";
import { DeleteTeamMessage } from "../../core/Success";
import { getProjectName } from "../../core/services/user_service";
import { SomethingWrongError } from "../../core/Errors";

const AdviseeProfile = () => {
    const [loading, setLoading] = useState(false);
    const [team, setTeam] = useState<TeamModel>(setTeamModel({
        members: [
            setUserModel({
                image: defaultImage,
                firstName: "First",
                lastName: "Member"
            }),
            setUserModel({
                image: defaultImage,
                firstName: "Second",
                lastName: "Member"
            }),
            setUserModel({
                image: defaultImage,
                firstName: "Third",
                lastName: "Member"
            }),
            setUserModel({
                image: defaultImage,
                firstName: "No",
                lastName: "Adviser"
            }),
        ]
    }));

    const storageData = getStorageData("advisee");
    const teamModel = (JSON.parse(storageData!)) as TeamModel;

    const [toast]= useIonToast();

    async function viewFiles(){
        const projectName = await getProjectName(teamModel.projectId);

        if(projectName != null){
            goPage(`/${projectName}/files`);
        }
        else{
            showToast(toast, SomethingWrongError);
        }
    }

    useEffect(() => {
        setTeam(teamModel);
    }, []);

    if(!loading){

        return <IonPage>
            {/* APP BAR */}
            <MobileArrowBackAppBar title="My Advisees" href="split-view-faculty" />
            {/* CONTENT */}
            <IonContent>
                <div className="teamprofile-center">
                    <IonList>

                        {/* TEAM NAME */}
                        <h1 className="header-name">{team.teamName}</h1>
                        {/* PROJECT TITLE */}
                        <h1 className="header-name">{team.projectTitle}</h1>
                        <div className="spacer-h-s" />
                        {/* PROFILE IMAGE */}
                        <IonAvatar className="image-center">
                            <img src= {team.members[0].image} />
                        </IonAvatar>
                        {/* NAME */}
                        <h2 className="subtext">{team.members[0].firstName} {team.members[0].lastName}</h2>
                        {/* PROFILE IMAGE */}
                        <IonAvatar className="image-center">
                            <img src={team.members[1].image}  />
                        </IonAvatar>
                        {/* NAME */}
                        <h2 className="subtext">{team.members[1].firstName} {team.members[1].lastName}</h2>
                        {/* PROFILE IMAGE */}
                        <IonAvatar className="image-center">
                            <img src={team.members[2].image}  />
                        </IonAvatar>
                        {/* NAME */}
                        <h2 className="subtext">{team.members[2].firstName} {team.members[2].lastName}</h2>
                        <div className="spacer-h-s" />
                        {/* ADVISER HEADER */}
                        <h1 className="header-name">Adviser</h1>
                        <div className="spacer-h-s" />
                        {/* PROFILE IMAGE */}
                        <IonAvatar className="image-center">
                            <img src={team.members[3].image}  />
                        </IonAvatar>
                        {/* NAME */}
                        <h2 className="subtext">{team.members[3].firstName} {team.members[3].lastName}</h2>
                        <div className="spacer-h-m" />
                        {/* VIEW FILES BUTTON */}
                        <IonButton shape="round" className="advisee-profile-button" onClick={viewFiles}>View Files</IonButton>
                        <div className="spacer-h-s" />
                        {/* MEET BUTTON */}
                        <IonButton shape="round" className="advisee-profile-button" onClick={() => {goToGoogleMeet(team.teamName)}}>Go to Meet</IonButton>
                        <p><b>Note:</b> Use BatState-u's G-suite account</p>
                    </IonList>
                </div>
            </IonContent>
        </IonPage>;
    }

    else {
        return <Loading />;
    }


};

export default AdviseeProfile;