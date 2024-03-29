import { IonButton, IonContent, IonPage, useIonToast } from "@ionic/react";
import { User } from "firebase/auth";
import { useState } from "react";
import InputField from "../../core/components/InputField";
import { MobileArrowBackAppBar } from "../../core/components/Mobile-Appbar";
import { MissingFieldError, PasswordFailError, PasswordLengthError, PasswordMatchError } from "../../core/Errors";
import { changePassword } from "../../core/services/auth_service";
import { UpdatePasswordMessage } from "../../core/Success";
import { getStorageData, showToast, webWidth } from "../../core/Utils";
import "../../core/components/Spacer.css";
import "./Edit-Password.css";
import { useMediaQuery } from "react-responsive";
import UserModel from "../../core/models/user_model";
import Loading from "../../core/components/Loading";

const EditPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const [toast] = useIonToast();

    const isDesktop = useMediaQuery({minWidth: webWidth});

    const storageData = getStorageData("user");
    const userModel = (JSON.parse(storageData!)) as UserModel;

    const href = userModel.role == "Student"
        ? "/home/student/profile"
        : userModel.role == "Faculty"
            ? "/split-view-faculty/profile"
            : "/split-view-admin/profile";

    
    async function applyNewPassword() {
        if (newPassword && confirmNewPassword != "") {
            if(!(newPassword.length < 6 && confirmNewPassword.length < 6)){
                if (newPassword == confirmNewPassword) {
                
                    setLoading(true);
    
                    // CHANGE PASSWORD
                    const result = await changePassword(newPassword);
    
                    setLoading(false);
    
    
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
            else{
                showToast(toast, PasswordLengthError);
            }
        }
        else {
            showToast(toast, MissingFieldError);
        }
    }

   if (!loading){
    return (
        <IonPage>
            {/* APP BAR */}
            <MobileArrowBackAppBar title="Edit Password" href={href} />
            {/* CONTENT */}
            <IonContent>
                <div className={isDesktop ? "edit-password-input-field-container" : "edit-password-input-field-container-mobile"}>
                    {/* NEW PASSWORD FIELD */}
                    <InputField title="New Password" useState={[newPassword, setNewPassword]} obscure />
                    <div className="spacer-h-s" />
                    {/* CONFIRM NEW PASSWORD FIELD */}
                    <InputField title="Confirm New Password" useState={[confirmNewPassword, setConfirmNewPassword]} obscure />
                </div>
                <div className="edit-password-button-container">
                    {/* CANCEL BUTTON */}
                    <IonButton fill="clear" className="edit-password-cancel-button" href={href}>Cancel</IonButton>
                    <div className="spacer-w-xs" />
                    {/* ADD BUTTON */}
                    <IonButton className="edit-password-add-button" shape="round" onClick={applyNewPassword}>Apply</IonButton>
                </div>
            </IonContent>
        </IonPage>
    );
   }

   else {

        return <Loading />;
   }
};

export default EditPassword;