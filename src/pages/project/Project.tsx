import { IonButton, IonContent, IonIcon, IonPage } from "@ionic/react";
import { add } from "ionicons/icons";
import { Component, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import ContentHeader from "../../core/components/ContentHeader";
import { MobileMenuAppBar } from "../../core/components/Mobile-Appbar";
import ProjectModel, { setProjectModel } from "../../core/models/project_model";
import UserModel from "../../core/models/user_model";
import { getProjects } from "../../core/services/user_service";
import { getStorageData, goPage, setStorageData, webWidth } from "../../core/Utils";
import ApprovedProject from "./components/ApprovedProject";
import DeniedProject from "./components/DeniedProject";
import PendingProject from "./components/PendingProject";

const Project = () => {
    const isDesktop = useMediaQuery({ minWidth: webWidth });
    const [projects, setProjects] = useState<ProjectModel[]>([]);

    const storageData = getStorageData("user");
    const userModel = (JSON.parse(storageData!)) as UserModel;

    function selectProject(projectModel: ProjectModel, href: string){
        setStorageData("project", JSON.stringify(projectModel));
        goPage(href);
    }

    useEffect(() => {
        getProjects(userModel.projects).then((value: any) => {
            setProjects(value as ProjectModel[]);
        });
    }, []);

    return <IonPage>
        {/* CONTENT HEADER */}
        {
            isDesktop
                ? <ContentHeader title="Projects" />
                : <MobileMenuAppBar title="Projects" />
        }
        <IonContent>
            <div className="project-container">
                <div className="project-item-container">
                    {projects.map((project, index) => {
                        let hrefLink = `/${project.title}/files`;

                        switch (project.status) {
                            case "Approved":
                                // APPROVED PROJECT CARD
                                return <ApprovedProject name={project.title} onClick={() => selectProject(project, hrefLink)} />;
                            case "Denied":
                                // DENIED PROJECT CARD
                                return <DeniedProject name={project.title} onClick={() => selectProject(project, hrefLink)} />;
                            case "Pending":
                                // PENDING PROJECT CARD
                                return <PendingProject name={project.title} onClick={() => selectProject(project, hrefLink)} />;
                            default:
                                return <div></div>;
                        }
                    })}
                </div>
                <div className="spacer-h-xl" />
                {/* PROPOSE TOPIC BUTTON */}
                <IonButton className="project-propose-button" href="/projects/propose-topic">
                    <IonIcon slot="start" icon={add} className="icon"></IonIcon>
                    Propose Topic
                </IonButton>
            </div>
        </IonContent>
    </IonPage>;
};

const ProjectFaculty = () => {
    const isDesktop = useMediaQuery({ minWidth: webWidth });
    const [projects, setProjects] = useState<ProjectModel[]>([]);

    const storageData = getStorageData("user");
    const userModel = (JSON.parse(storageData!)) as UserModel;

    function selectProject(projectModel: ProjectModel, href: string){
        setStorageData("project", JSON.stringify(projectModel));
        goPage(href);
    }

    useEffect(() => {
        getProjects(userModel.projects).then((value: any) => {
            setProjects(value as ProjectModel[]);
        });
    }, []);

    return <IonPage>
        {/* CONTENT HEADER */}
        {
            isDesktop
                ? <ContentHeader title="Projects" />
                : <MobileMenuAppBar title="Projects" />
        }
        <IonContent>
            <div className="project-container">
                <div className="project-item-container">
                    {projects.map((project, index) => {
                        let hrefLink = `/${project.title}/files`;
                        let hrefPendingLink = `/${project.title}/files/approver`;

                        switch (project.status) {
                            case "Approved":
                                // APPROVED PROJECT CARD
                                return <ApprovedProject name={project.title} onClick={() => selectProject(project, hrefLink)} />;
                            case "Denied":
                                // DENIED PROJECT CARD
                                return <DeniedProject name={project.title} onClick={() => selectProject(project, hrefLink)} />;
                            case "Pending":
                                // PENDING PROJECT CARD
                                return <PendingProject name={project.title} onClick={() => selectProject(project, hrefPendingLink)} />;
                            default:
                                return <div></div>;
                        }
                    })}
                </div>
            </div>
        </IonContent>
    </IonPage>;
};

export { Project, ProjectFaculty };