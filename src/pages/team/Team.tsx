import { IonContent, IonFab, IonFabButton, IonIcon, IonPage } from "@ionic/react";
import { add } from "ionicons/icons";
import { useMediaQuery } from "react-responsive";
import ContentHeader from "../../core/components/ContentHeader";
import { MobileMenuAppBar } from "../../core/components/Mobile-Appbar";
import { webWidth } from "../../core/Utils";
import TeamCard from "./components/TeamCard";
import "./Team.css";

interface TeamModel{
    name: string,
    members: {image: string, name: string}[],
}

const sampleData: TeamModel[] = [
    {
        name: "Team 1",
        members: [
            {
                image: "https://www.biowritingservice.com/wp-content/themes/tuborg/images/Executive%20Bio%20Sample%20Photo.png",
                name: "Fa Kin Su Pah"
            },
            {
                image: "https://www.biowritingservice.com/wp-content/themes/tuborg/images/Executive%20Bio%20Sample%20Photo.png",
                name: "Sum Ting Wong"
            },
            {
                image: "https://www.biowritingservice.com/wp-content/themes/tuborg/images/Executive%20Bio%20Sample%20Photo.png",
                name: "Yu Stin Ki Puh"
            },
            {
                image: "https://www.biowritingservice.com/wp-content/themes/tuborg/images/Executive%20Bio%20Sample%20Photo.png",
                name: "Dum Fuk"
            }
        ]
    },
    {
        name: "Team 1",
        members: [
            {
                image: "https://www.biowritingservice.com/wp-content/themes/tuborg/images/Executive%20Bio%20Sample%20Photo.png",
                name: "Fa Kin Su Pah"
            },
            {
                image: "https://www.biowritingservice.com/wp-content/themes/tuborg/images/Executive%20Bio%20Sample%20Photo.png",
                name: "Sum Ting Wong"
            },
            {
                image: "https://www.biowritingservice.com/wp-content/themes/tuborg/images/Executive%20Bio%20Sample%20Photo.png",
                name: "Yu Stin Ki Puh"
            },
            {
                image: "https://www.biowritingservice.com/wp-content/themes/tuborg/images/Executive%20Bio%20Sample%20Photo.png",
                name: "Dum Fuk"
            }
        ]
    },
    {
        name: "Team 1",
        members: [
            {
                image: "https://www.biowritingservice.com/wp-content/themes/tuborg/images/Executive%20Bio%20Sample%20Photo.png",
                name: "Fa Kin Su Pah"
            },
            {
                image: "https://www.biowritingservice.com/wp-content/themes/tuborg/images/Executive%20Bio%20Sample%20Photo.png",
                name: "Sum Ting Wong"
            },
            {
                image: "https://www.biowritingservice.com/wp-content/themes/tuborg/images/Executive%20Bio%20Sample%20Photo.png",
                name: "Yu Stin Ki Puh"
            },
            {
                image: "https://www.biowritingservice.com/wp-content/themes/tuborg/images/Executive%20Bio%20Sample%20Photo.png",
                name: "Dum Fuk"
            }
        ]
    }
];

const Team = () => {
    const isDesktop = useMediaQuery({minWidth: webWidth});

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
                {sampleData.map((team, index) => {
                    return <TeamCard name={team.name} members={team.members} href="/"/>;
                })}
            </div>
            {/* FAB BUTTON */}
            <IonFab vertical="bottom" horizontal="end" slot="fixed" className="team-fab-button">
                <IonFabButton>
                    <IonIcon icon={add} className="icon"/>
                </IonFabButton>
            </IonFab>
        </IonContent>
    </IonPage>;
}

export default Team;