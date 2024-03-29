import { IonButton, IonContent, IonPage, useIonToast } from "@ionic/react";
import { User } from "firebase/auth";
import { useState } from "react";
import InputField from "../../core/components/InputField";
import { MobileArrowBackAppBar } from "../../core/components/Mobile-Appbar";
import { MissingFieldError, PasswordFailError, PasswordMatchError, SomethingWrongError } from "../../core/Errors";
import { changePassword } from "../../core/services/auth_service";
import { AddFileMessage, UpdatePasswordMessage } from "../../core/Success";
import { getStorageData, showToast, webWidth } from "../../core/Utils";
import "../../core/components/Spacer.css";
import "./add-files.css";
import { useMediaQuery } from "react-responsive";
import UserModel from "../../core/models/user_model";
import Loading from "../../core/components/Loading";
import { addProjectFile } from "../../core/services/user_service";
import ProjectModel from "../../core/models/project_model";
import TeamModel from "../../core/models/team_model";

const AddFile = (props: any) => {
    const [fileName, setFileName] = useState("");
    const [docLink, setDocLink] = useState("");
    const [isLoading, setLoading] = useState(false);

    const [toast] = useIonToast();

    const title: string = `${props.match.params.name}'s Files`;
    const projectName = props.match.params.name;

    const projectStorageData = getStorageData("project");
    const projectModel = (JSON.parse(projectStorageData!)) as ProjectModel;

    const adviseeStorageData = getStorageData("advisee");
    const teamModel = (JSON.parse(adviseeStorageData!)) as TeamModel;

    const userStorageData = getStorageData("user");
    const userModel = (JSON.parse(userStorageData!)) as UserModel;

    const isDesktop = useMediaQuery({minWidth: webWidth});

    async function addFile(){
        if(fileName != "" && docLink != ""){
            setLoading(true)
            // ADD FILE
            const result = await addProjectFile(
                projectModel != null ? projectModel.uid : teamModel.projectId,
                fileName,
                docLink
            );

            setLoading(false);

            if(result){
                // SHOW TOAST
                showToast(toast, AddFileMessage);
    
                // RESET VALUES
                setFileName("");
                setDocLink("");
            }
            else{
                showToast(toast, SomethingWrongError);
            }
        }
        else{
            showToast(toast, MissingFieldError);
        }
    }


    if(!isLoading){
        return (
            <IonPage>
                {/* APP BAR */}
                <MobileArrowBackAppBar title="Add File" href={`/${projectName}/files`} />
                <IonContent>
                    <div className="spacer-h-s" />
                    <div className={isDesktop ? "add-files-container": "add-files-container-mobile"}>
                        <InputField title="File Name" useState={[fileName, setFileName]} obscure={false} />
                        <div className="spacer-h-s" />
                        <InputField title="Google Docs Link" useState={[docLink, setDocLink]} obscure={false} />
                    </div>
                    <div className="edit-password-button-container">
                        {/* CANCEL BUTTON */}
                        <IonButton fill="clear" className="edit-password-cancel-button" href={`/${projectName}/files`}>Cancel</IonButton>
                        <div className="spacer-w-xs" />
                        {/* ADD BUTTON */}
                        <IonButton className="edit-password-add-button" shape="round" onClick={addFile}>Add</IonButton>
                    </div>
                </IonContent>
            </IonPage>
        );
    }
    else{
        return <Loading />
    }
}


export default AddFile;