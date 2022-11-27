import { IonBackButton, IonButton, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonItem, IonLabel, IonPage, useIonToast } from "@ionic/react";
import { Component, useEffect, useState } from "react";
import "./Project-File.css";
import "../../core/components/Spacer.css";
import { add, arrowBack, document } from "ionicons/icons";
import { MobileArrowBackAppBar } from "../../core/components/Mobile-Appbar";
import { approveTopic, denyTopic, getProjectFiles } from "../../core/services/user_service";
import ProjectFileModel from "../../core/models/project_file_model";
import { getStorageData, openNewTab, replacePage, showToast } from "../../core/Utils";
import ProjectModel from "../../core/models/project_model";
import UserModel from "../../core/models/user_model";
import { ApproveTopicMessage, DenyTopicMessage } from "../../core/Success";
import Loading from "../../core/components/Loading";

const ProjectFile = (props: any) => {
    const title: string = `${props.match.params.name}'s Files`;
    const projectName = props.match.params.name;

    const [files, setFiles] = useState<ProjectFileModel[]>([]);

    const projectStorageData = getStorageData("project");
    const projectModel = (JSON.parse(projectStorageData!)) as ProjectModel;
    const userStorageData = getStorageData("user");
    const userModel = (JSON.parse(userStorageData!)) as UserModel;

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
            <MobileArrowBackAppBar title={title} href={userModel.role == "Student" ? "/split-view" : "split-view-faculty"} />
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

const ProjectFileApprover = (props: any) => {
    const title: string = `${props.match.params.name}'s Files`;
    const projectName = props.match.params.name;
    const [loading, setLoading] = useState(false);

    const [files, setFiles] = useState<ProjectFileModel[]>([]);

    const [toast] = useIonToast();

    const projectStorageData = getStorageData("project");
    const projectModel = (JSON.parse(projectStorageData!)) as ProjectModel;
    const userStorageData = getStorageData("user");
    const userModel = (JSON.parse(userStorageData!)) as UserModel;

    function openFile(url: string){
        openNewTab(url);
    }

    async function approve(){

        setLoading(true);
        await approveTopic(projectModel.uid, projectModel.teamId, userModel);
        setLoading(false);
        showToast(toast, ApproveTopicMessage);
        replacePage("split-view-faculty");
    }

    async function deny(){
        setLoading(true);
        await denyTopic(projectModel.uid);
        setLoading(false);
        showToast(toast, DenyTopicMessage);
        replacePage("split-view-faculty");
    }

    useEffect(() => {
        getProjectFiles(projectModel.uid).then((value: any) => {
            setFiles(value as ProjectFileModel[]);
        });
    }, []);
    
    if(!loading){
        return (
            <IonPage>
                {/* APPBAR */}
                <MobileArrowBackAppBar title={title} href="/split-view-faculty" />
                {/* CONTENT */}
                <IonContent>
                    {/* FILE ITEMS */}
                    {files.map((file, index) => {
                        return <IonItem lines="none" onClick={() => {openFile(file.gDocLink)}}>
                            <IonIcon icon={document} slot="start" />
                            <IonLabel>{file.fileName}</IonLabel>
                        </IonItem>
                    })}
                    <div className="add-faculty-content-right">
                        {/* CANCEL BUTTON */}
                        <IonButton fill="clear" className="add-faculty-cancel-button" onClick={deny}>Deny</IonButton>
                        <div className="spacer-w-xs" />
                        {/* ADD BUTTON */}
                        <IonButton className="add-faculty-add-button" shape="round" onClick={approve}>Approve</IonButton>
                        <div className="spacer-w-xs" />
                    </div>
                </IonContent>
            </IonPage>
        )
    }else{
        return <Loading />
    }
}

export { ProjectFile, ProjectFileApprover };