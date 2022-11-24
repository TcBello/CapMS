import { IonButton, IonContent, IonPage, useIonToast } from "@ionic/react";
import { User } from "firebase/auth";
import { useState } from "react";
import InputField from "../../core/components/InputField";
import { MobileArrowBackAppBar } from "../../core/components/Mobile-Appbar";
import { MissingFieldError, PasswordFailError, PasswordMatchError } from "../../core/Errors";
import { changePassword } from "../../core/services/auth_service";
import { AddFileMessage, UpdatePasswordMessage } from "../../core/Success";
import { getStorageData, showToast, webWidth } from "../../core/Utils";
import "../../core/components/Spacer.css";
import "./add-files.css";
import { useMediaQuery } from "react-responsive";
import UserModel from "../../core/models/user_model";
import Loading from "../../core/components/Loading";
import "../../core/components/Spacer.css";
import { addProjectFile } from "../../core/services/user_service";
import ProjectModel from "../../core/models/project_model";

const AddFile = (props: any) => {
    const [fileName, setFileName] = useState("");
    const [docLink, setDocLink] = useState("");

    const [toast] = useIonToast();

    const title: string = `${props.match.params.name}'s Files`;
    const projectName = props.match.params.name;

    const projectStorageData = getStorageData("project");
    const projectModel = (JSON.parse(projectStorageData!)) as ProjectModel;

    async function addFile(){
        // ADD FILE
        await addProjectFile(projectModel.uid, fileName, docLink);

        // SHOW TOAST
        showToast(toast, AddFileMessage);

        // RESET VALUES
        setFileName("");
        setDocLink("");
    }


    return (
        <IonPage>
            {/* APP BAR */}
            <MobileArrowBackAppBar title="Add File" href={`/${projectName}/files`} />
            <IonContent>
                <div className="spacer-h-s" />
                <InputField title="File Name" useState={[fileName, setFileName]} obscure={false} />
                <div className="spacer-h-s" />
                <InputField title="Google Docs Link" useState={[docLink, setDocLink]} obscure={false} />
                <div className="edit-password-button-container">
                    {/* CANCEL BUTTON */}
                    <IonButton fill="clear" className="edit-password-cancel-button" href="split-view-admin">Cancel</IonButton>
                    <div className="spacer-w-xs" />
                    {/* ADD BUTTON */}
                    <IonButton className="edit-password-add-button" shape="round" onClick={addFile}>Add</IonButton>
                </div>
            </IonContent>
        </IonPage>
    );
}


export default AddFile;