import { IonBackButton, IonButton, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonPage, useIonToast } from "@ionic/react";
import { Component, useEffect, useState } from "react";
import "./Project-File.css";
import "../../core/components/Spacer.css";
import { add, arrowBack, checkmarkCircle, closeCircle, document, trash } from "ionicons/icons";
import { MobileArrowBackAppBar } from "../../core/components/Mobile-Appbar";
import { approveProjectFile, approveTopic, deleteProjectFile, denyTopic, getProjectFiles, unapproveProjectFile } from "../../core/services/user_service";
import ProjectFileModel from "../../core/models/project_file_model";
import { getStorageData, openNewTab, replacePage, showToast } from "../../core/Utils";
import ProjectModel from "../../core/models/project_model";
import UserModel from "../../core/models/user_model";
import { ApproveFileMessage, ApproveTopicMessage, DeleteFileMessage, DenyTopicMessage, UnapproveFileMessage } from "../../core/Success";
import Loading from "../../core/components/Loading";
import { SomethingWrongError } from "../../core/Errors";
import TeamModel from "../../core/models/team_model";

const ProjectFile = (props: any) => {
    const title: string = `${props.match.params.name} Files`;
    const projectName = props.match.params.name;

    const [files, setFiles] = useState<ProjectFileModel[]>([]);

    const projectStorageData = getStorageData("project");
    const projectModel = (JSON.parse(projectStorageData!)) as ProjectModel;
    const userStorageData = getStorageData("user");
    const userModel = (JSON.parse(userStorageData!)) as UserModel;
    const adviseeStorageData = getStorageData("advisee");
    const teamModel = (JSON.parse(adviseeStorageData!)) as TeamModel;

    const [toast] = useIonToast();

    function getFiles(){
        if(projectModel != null){
            getProjectFiles(projectModel.uid).then((value: any) => {
                setFiles(value as ProjectFileModel[]);
            });
        }

        if(teamModel != null){
            getProjectFiles(teamModel.projectId).then((value: any) => {
                setFiles(value as ProjectFileModel[]);
            });
        }
    }

    function openFile(url: string){
        openNewTab(url);
    }

    async function deleteFile(id: string){
        const result = await deleteProjectFile(id);

        if(result){
            showToast(toast, DeleteFileMessage);
            getFiles();
        }
        else{
            showToast(toast, SomethingWrongError);
        }
    }

    async function approveFile(id: string){
        const result = await approveProjectFile(id);

        if(result){
            showToast(toast, ApproveFileMessage);
            getFiles();
        }
        else{
            showToast(toast, SomethingWrongError);
        }
    }

    async function unapproveFile(id: string){
        const result = await unapproveProjectFile(id);

        if(result){
            showToast(toast, UnapproveFileMessage);
            getFiles();
        }
        else{
            showToast(toast, SomethingWrongError);
        }
    }

    useEffect(() => {
        getFiles();
    }, []);

    return (
        <IonPage>
            {/* APPBAR */}
            <MobileArrowBackAppBar
                title={title}
                href={userModel.role == "Student" ? "/split-view" : teamModel != null ? "/home/faculty/my-advisees/profile" : "split-view-faculty"}
            />
            {/* CONTENT */}
            <IonContent>
                {/* FILE ITEMS */}
                {files.map((file, index) => {
                    return <div className="project-file-container">
                        {/* FILE */}
                        <IonItem className="project-file-item" lines="none" button onClick={() => {openFile(file.gDocLink)}}>
                            <IonIcon icon={document} slot="start" />
                            <IonLabel>{file.fileName}</IonLabel>
                            {
                                file.status == "approved"
                                    ? <IonImg src="/assets/images/approved.png" slot="end" className="project-file-approve-icon" />
                                    : <div />
                            }
                        </IonItem>
                        {/* APPROVE FILE BUTTON */}
                        {
                            userModel.role == "Faculty"
                                ? <IonButton fill="clear" onClick={() => {
                                    if(file.status == "approved"){
                                        unapproveFile(file.uid);
                                        console.log("unapprove");
                                    }
                                    else{
                                        approveFile(file.uid);
                                    }
                                }}>
                                    <IonIcon icon={file.status == "approved" ? closeCircle : checkmarkCircle} className={file.status == "approved" ? "project-file-unapprove-file-icon" : "project-file-approve-file-icon"} />
                                </IonButton>
                                : <div></div>
                        }
                        {/* DELETE BUTTON */}
                        <IonButton fill="clear" onClick={() => deleteFile(file.uid)}>
                            <IonIcon icon={trash} className="delete-file-icon" />
                        </IonButton>
                    </div>
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
                    <div className="project-file-content-right">
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