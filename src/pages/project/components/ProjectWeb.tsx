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
    status: string,
    gDocsLink: string
}

const sampleProjectData: ProjectData[] = [
    {
        name: "CapMS",
        status: "approved",
        gDocsLink: "https://docs.google.com/document/d/1YvFSbvS1icW8goiYBpFthwyagygjYU9UZB6bEhFJk_g/edit"
    },
    {
        name: "Loady Search",
        status: "pending",
        gDocsLink: "https://docs.google.com/document/d/1YvFSbvS1icW8goiYBpFthwyagygjYU9UZB6bEhFJk_g/edit"
    },
    {
        name: "Palay Corp",
        status: "denied",
        gDocsLink: "https://docs.google.com/document/d/1YvFSbvS1icW8goiYBpFthwyagygjYU9UZB6bEhFJk_g/edit"
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
                                let hrefLink = `/${project.name}/files`;

                                switch(project.status){
                                    case "approved":
                                        // APPROVED PROJECT CARD
                                        return <ApprovedProject name={project.name} href={hrefLink}/>;
                                    case "denied":
                                        // DENIED PROJECT CARD
                                        return <DeniedProject name={project.name} href={hrefLink}/>;
                                    case "pending":
                                        // PENDING PROJECT CARD
                                        return <PendingProject name={project.name} href={hrefLink}/>;
                                    default:
                                        return <div></div>;
                                }
                            })}
                        </div>
                        {/* PROPOSE TOPIC BUTTON */}
                        <IonButton className="project-propose-button">
                            <IonIcon slot="start" icon={add} className="icon"></IonIcon>
                            Propose Topic
                        </IonButton>
                    </div>
                </IonPage>
            </MediaQuery>
        );
    }
}

export default ProjectWeb;