import { IonButton, IonIcon, IonPage } from "@ionic/react";
import { add } from "ionicons/icons";
import { Component } from "react";
import MediaQuery from 'react-responsive';
import ContentHeader from "../../../core/components/ContentHeader";
import { webWidth } from "../../../core/Utils";
import '../Project.css';
import ApprovedProject from "./ApprovedProject";
import DeniedProject from "./DeniedProject";
import PendingProject from "./PendingProject";

interface ProjectData{
    name: string,
    status: string
}

const sampleProjectData: ProjectData[] = [
    {
        name: "CapMS",
        status: "approved"
    },
    {
        name: "Loady Search",
        status: "pending"
    },
    {
        name: "Palay Corp",
        status: "denied"
    }
];

class ProjectWeb extends Component{
    render(){
        return (
            <MediaQuery minWidth={webWidth}>
                <IonPage>
                    {/* CONTENT HEADER */}
                    <ContentHeader title="Projects"/>
                    <div className="project-container">
                        <div className="project-item-container">
                            {sampleProjectData.map((project, index) => {
                                switch(project.status){
                                    case "approved":
                                        // APPROVED PROJECT CARD
                                        return <ApprovedProject name={project.name}/>;
                                    case "denied":
                                        // DENIED PROJECT CARD
                                        return <DeniedProject name={project.name}/>;
                                    case "pending":
                                        // PENDING PROJECT CARD
                                        return <PendingProject name={project.name}/>;
                                    default:
                                        return <div></div>;
                                }
                            })}
                        </div>
                        <IonButton className="project-propose-button">
                            <IonIcon slot="start" icon={add}></IonIcon>
                            Propose Topic
                        </IonButton>
                    </div>
                </IonPage>
            </MediaQuery>
        );
    }
}

export default ProjectWeb;