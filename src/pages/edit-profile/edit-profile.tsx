import { IonButton, IonContent, IonPage, useIonToast } from "@ionic/react";
import { User } from "firebase/auth";
import { useState } from "react";
import InputField from "../../core/components/InputField";
import { MobileArrowBackAppBar } from "../../core/components/Mobile-Appbar";
import { MissingFieldError, PasswordFailError, PasswordMatchError } from "../../core/Errors";
import { changePassword } from "../../core/services/auth_service";
import { UpdatePasswordMessage } from "../../core/Success";
import { getStorageData, showToast, webWidth } from "../../core/Utils";
import "../../core/components/Spacer.css";
// import "./Edit-Password.css";
import { useMediaQuery } from "react-responsive";
import UserModel from "../../core/models/user_model";

const EditProfile = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const [newFirstName, setNewFirstName] = useState("ako")
    const [newLastName, setNewLastName] = useState("")
    const [newEmail, setNewEmail] = useState("")
    const [newSrCode, setNewSrCode] = useState("")
    const [newCourse, setNewCourse] = useState("")

    const [toast] = useIonToast();

    const isDesktop = useMediaQuery({minWidth: webWidth});

    const storageData = getStorageData("user");
    const userModel = (JSON.parse(storageData!)) as UserModel;

    const href = userModel.role == "Student"
        ? "split-view"
        : userModel.role == "Faculty"
            ? "split-view-faculty"
            : "split-view-admin";

    async function applyNewPassword() {
        if (newPassword && confirmNewPassword != "") {
            if (newPassword == confirmNewPassword) {
                // CHANGE PASSWORD
                const result = await changePassword(newPassword);

                if(result){
                    // CLEAR INPUT FIELDS
                    setNewPassword("");
                    setConfirmNewPassword("");

                    // SHOW TOAST
                    showToast(toast, UpdatePasswordMessage);
                }
                else{
                    showToast(toast, PasswordFailError);
                }
            }
            else {
                showToast(toast, PasswordMatchError);
            }
        }
        else {
            showToast(toast, MissingFieldError);
        }
    }

    return (
        <IonPage>
            {/* APP BAR */}
            <MobileArrowBackAppBar title="Edit Profile" href={href} />
            {/* CONTENT */}
            <IonContent>
                <div className={isDesktop ? "edit-password-input-field-container" : "edit-password-input-field-container-mobile"}>
                    {/* EDIT FIRST NAME FIELD */}
                    <InputField title="First Name" useState={[newFirstName, setNewFirstName]} obscure={false}/>
                    <div className="spacer-h-s" />
                    {/* EDIT LAST NAME FIELD */}
                    <InputField title="Last Name" useState={[newLastName, setNewLastName]} obscure={false} />
                    <div className="spacer-h-s" />
                    {/* EDIT EMAIL FIELD */}
                    <InputField title="Email" useState={[newEmail, setNewEmail]} obscure={false} />
                    <div className="spacer-h-s" />
                    {/* EDIT SR CODE FIELD */}
                    <InputField title="Sr-Code" useState={[newSrCode, setNewSrCode]} obscure={false} />
                    <div className="spacer-h-s" /> 
                    {/* EDIT COURSE FIELD */}
                    <InputField title="Course" useState={[newCourse, setNewCourse]} obscure={false} />
                    <div className="spacer-h-s" /> 
                </div>
                <div className="edit-password-button-container">
                    {/* CANCEL BUTTON */}
                    <IonButton fill="clear" className="edit-password-cancel-button" href="split-view-admin">Cancel</IonButton>
                    <div className="spacer-w-xs" />
                    {/* ADD BUTTON */}
                    <IonButton className="edit-password-add-button" shape="round" onClick={applyNewPassword}>Apply</IonButton>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default EditProfile;