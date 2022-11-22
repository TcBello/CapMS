import { IonBackButton, IonButton, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonItem, IonLabel, IonPage } from "@ionic/react";
import { Component, useEffect, useState } from "react";
import "./Project-File.css";
import "../../core/components/Spacer.css";
import { add, arrowBack, document } from "ionicons/icons";
import { MobileArrowBackAppBar } from "../../core/components/Mobile-Appbar";
import { getProjectFiles } from "../../core/services/user_service";
import ProjectFileModel from "../../core/models/project_file_model";
import { getStorageData, openNewTab } from "../../core/Utils";
import ProjectModel from "../../core/models/project_model";

interface FilesData {
    name: string,
    gDocsLink: string
};

const sampleData: FilesData[] = [
    {
        name: "Abstract Form",
        gDocsLink: "https://docs.google.com/document/d/1YvFSbvS1icW8goiYBpFthwyagygjYU9UZB6bEhFJk_g/edit"
    },
    {
        name: "Chapter 1",
        gDocsLink: "https://docs.google.com/document/d/1YvFSbvS1icW8goiYBpFthwyagygjYU9UZB6bEhFJk_g/edit"
    },
    {
        name: "Chapter 2",
        gDocsLink: "https://docs.google.com/document/d/1YvFSbvS1icW8goiYBpFthwyagygjYU9UZB6bEhFJk_g/edit"
    }
];

const ProjectFile = (props: any) => {
    const title: string = `${props.match.params.name}'s Files`;
    const projectName = props.match.params.name;

    const [files, setFiles] = useState<ProjectFileModel[]>([]);

    const projectStorageData = getStorageData("project");
    const projectModel = (JSON.parse(projectStorageData!)) as ProjectModel;

    function openFile(url: string){
        openNewTab(url);
    }

    useEffect(() => {
        getProjectFiles(projectModel.uid).then((value: any) => {
            setFiles(value as ProjectFileModel[]);
        });
    }, []);

    return (
        <IonPage>
            {/* APPBAR */}
            <MobileArrowBackAppBar title={title} href="/split-view" />
            {/* CONTENT */}
            <IonContent>
                {/* FILE ITEMS */}
                {files.map((file, index) => {
                    return <IonItem lines="none" onClick={() => {openFile(file.gDocLink)}}>
                        <IonIcon icon={document} slot="start" />
                        <IonLabel>{file.fileName}</IonLabel>
                    </IonItem>
                })}
                {/* ADD FILE BUTTON */}
                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton href={`/${projectName}/files/add`}>
                        <IonIcon icon={add} className="project-file-add-button-icon" />
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
}

export default ProjectFile;