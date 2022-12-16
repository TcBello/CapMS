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
import { deleteAccount, deleteTeam, getAdminProfile } from "../../core/services/admin_service";
import "../../core/components/Spacer.css";
import "./team-profile.css";
import Loading from "../../core/components/Loading";
import TeamModel, { setTeamModel } from "../../core/models/team_model";
import { DeleteTeamMessage } from "../../core/Success";
import { SomethingWrongError } from "../../core/Errors";

const TeamProfile = () => {
    const [loading, setLoading] = useState(false);
    const [team, setTeam] = useState<TeamModel>(setTeamModel({
        members: [
            setUserModel({image: defaultImage}),
            setUserModel({image: defaultImage}),
            setUserModel({image: defaultImage}),
            setUserModel({image: defaultImage})
        ]
    }));

    const storageData = getStorageData("team");
    const teamModel = (JSON.parse(storageData!)) as TeamModel;

    const [toast]= useIonToast();

    async function removeTeam(uid: string) {

        setLoading(true);
        const result = await deleteTeam(uid);

        if(result){
            setLoading(false);
            showToast(toast, DeleteTeamMessage);
            replacePage("split-view-admin");
        }
        else{
            setLoading(false);
            showToast(toast, SomethingWrongError);
        }
    }

    useEffect(() => {
        setTeam(teamModel);
    }, []);

    if(!loading){

        return <IonPage>
            {/* APP BAR */}
            <MobileArrowBackAppBar title="Team's Profile" href="split-view-admin" />
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
                            <img src={team.members[0].image} />
                        </IonAvatar>
                        {/* NAME */}
                        <h2 className="subtext">{team.members[0].firstName} {team.members[0].lastName}</h2>
                        {/* PROFILE IMAGE */}
                        <IonAvatar className="image-center">
                            <img src={team.members[1].image} />
                        </IonAvatar>
                        {/* NAME */}
                        <h2 className="subtext">{team.members[1].firstName} {team.members[1].lastName}</h2>
                        {/* PROFILE IMAGE */}
                        <IonAvatar className="image-center">
                            <img src={team.members[2].image} />
                        </IonAvatar>
                        {/* NAME */}
                        <h2 className="subtext">{team.members[2].firstName} {team.members[2].lastName}</h2>
                        <div className="spacer-h-s" />
                        {/* ADVISER HEADER */}
                        <h1 className="header-name">Adviser</h1>
                        <div className="spacer-h-s" />
                        {/* PROFILE IMAGE */}
                        <IonAvatar className="image-center">
                            <img src={team.members[3].image} />
                        </IonAvatar>
                        {/* NAME */}
                        <h2 className="subtext">{team.members[3].firstName} {team.members[3].lastName}</h2>
                        <div className="spacer-h-m" />
                        {/* LOGIN BUTTON */}
                        <IonButton shape="round" className="btn-delete-team" onClick={() => removeTeam(team.uid)}>Delete Team</IonButton>


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