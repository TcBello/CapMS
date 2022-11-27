import { IonContent, IonFab, IonFabButton, IonIcon, IonPage } from "@ionic/react";
import { add } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import ContentHeader from "../../core/components/ContentHeader";
import { MobileMenuAppBar } from "../../core/components/Mobile-Appbar";
import TeamModel from "../../core/models/team_model";
import { getAllTeams } from "../../core/services/admin_service";
import { goPage, setStorageData, webWidth } from "../../core/Utils";
import TeamCard from "./components/TeamCard";
import "./Team.css";

const Team = () => {
    const isDesktop = useMediaQuery({minWidth: webWidth});

    const [teams, setTeams] = useState<TeamModel[]>([]);

    function onClick(teamModel: TeamModel){
        setStorageData("team", JSON.stringify(teamModel));
        goPage("/home/admin/teams/profile");
    }

    useEffect(() => {
        getAllTeams().then((value) => {
            setTeams(value);
        });
    },[]);

    return <IonPage>
        {/* CONTENT HEADER */}
        {
            isDesktop
                ? <ContentHeader title="Teams" />
                : <MobileMenuAppBar title="Teams" />
        }
        {/* CONTENT */}
        <IonContent className={isDesktop ? "team-content" : "team-content-mobile"}>
            <div className={isDesktop ? "team-container" : "team-container-mobile"}>
                {/* TEAM CARD */}
                {teams.map((team, index) => {
                    return <TeamCard name={team.teamName} members={team.members} onClick={() => onClick(team)}/>;
                })}
            </div>
            {/* FAB BUTTON */}
            <IonFab vertical="bottom" horizontal="end" slot="fixed" className="team-fab-button">
                <IonFabButton href="/home/admin/teams/add">
                    <IonIcon icon={add} className="icon"/>
                </IonFabButton>
            </IonFab>
        </IonContent>
    </IonPage>;
}

export default Team;