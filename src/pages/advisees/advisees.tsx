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
// import "./team-profile.css";
import Loading from "../../core/components/Loading";
import TeamModel, { setTeamModel } from "../../core/models/team_model";
import { DeleteTeamMessage } from "../../core/Success";

const Advisees = () => {
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
        await deleteTeam(uid);
        setLoading(false);

        showToast(toast, DeleteTeamMessage);

        replacePage("split-view-admin");
    }

    useEffect(() => {
        setTeam(teamModel);
    }, []);

    if(!loading){

        return <IonPage>
            {/* APP BAR */}
            <MobileArrowBackAppBar title="My Advisees" href="split-view-admin" />
            {/* CONTENT */}
            <IonContent>
                <div className="teamprofile-center">
                    <IonList>

                        {/* TEAM NAME */}
                        <h1 className="header-name">My Advisee</h1>
                        <div className="spacer-h-s" />
                        {/* PROFILE IMAGE */}
                        <IonAvatar className="image-center">
                            <img src= {defaultImage} />
                        </IonAvatar>
                        {/* NAME */}
                        <h2 className="subtext">A</h2>
                        {/* PROFILE IMAGE */}
                        <IonAvatar className="image-center">
                            <img src={defaultImage}  />
                        </IonAvatar>
                        {/* NAME */}
                        <h2 className="subtext">B</h2>
                        {/* PROFILE IMAGE */}
                        <IonAvatar className="image-center">
                            <img src={defaultImage}  />
                        </IonAvatar>
                        {/* NAME */}
                        <h2 className="subtext">C</h2>
                        <div className="spacer-h-s" />
                        {/* ADVISER HEADER */}
                        <h1 className="header-name">Adviser</h1>
                        <div className="spacer-h-s" />
                        {/* PROFILE IMAGE */}
                        <IonAvatar className="image-center">
                            <img src={defaultImage}  />
                        </IonAvatar>
                        {/* NAME */}
                        <h2 className="subtext">D</h2>
                        <div className="spacer-h-m" />
                        {/* LOGIN BUTTON */}
                        <IonButton shape="round" className="btn-delete-team" href="https://accounts.google.com/AccountChooser/signinchooser?continue=https://g.co/meet/yourmeetingname">Go to Meeting</IonButton>


                    </IonList>
                </div>
            </IonContent>
        </IonPage>;
    }

    else {
        return <Loading />;
    }


};

export default Advisees;