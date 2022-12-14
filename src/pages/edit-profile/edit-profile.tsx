import { IonButton, IonContent, IonPage, useIonToast } from "@ionic/react";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import InputField from "../../core/components/InputField";
import { MobileArrowBackAppBar } from "../../core/components/Mobile-Appbar";
import { MissingFieldError, PasswordFailError, PasswordMatchError, SomethingWrongError } from "../../core/Errors";
import { changePassword } from "../../core/services/auth_service";
import { UpdatePasswordMessage, UpdateProfileMessage } from "../../core/Success";
import { getStorageData, replacePage, setStorageData, showToast, webWidth } from "../../core/Utils";
import "../../core/components/Spacer.css";
// import "./Edit-Password.css";
import { useMediaQuery } from "react-responsive";
import UserModel, { setUserModel } from "../../core/models/user_model";
import { updateUserAccount } from "../../core/services/admin_service";
import Loading from "../../core/components/Loading";

const EditProfile = (props: any) => {
    const [newFirstName, setNewFirstName] = useState("");
    const [newLastName, setNewLastName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newSrCode, setNewSrCode] = useState("");
    const [newCourse, setNewCourse] = useState("");
    const [loading, setLoading] = useState(false);

    const [toast] = useIonToast();

    const isDesktop = useMediaQuery({minWidth: webWidth});

    const isFaculty = props.match.params.role == "faculty-staffs";

    const storageData = isFaculty
        ? getStorageData("faculty-profile")
        : getStorageData("student-profile");
    const userModel = (JSON.parse(storageData!)) as UserModel;

    const href = isFaculty
        ? "/home/admin/faculty-staffs/profile"
        : "/home/admin/students/profile";

    async function updateProfile(){
        // DATA THAT WILL BE USED IN UPDATING USER
        const user = setUserModel({
            uid: userModel.uid,
            firstName: newFirstName,
            lastName: newLastName,
            email: newEmail,
            srCode: newSrCode,
            course: newCourse,
            image: userModel.image,
            role: userModel.role,
            status: userModel.status
        });

        setLoading(true);

        // UPDATE USER
        const result = await updateUserAccount(user);
        
        if(result){
            setLoading(false);

            // SET STORAGE DATA OF USER
            if(isFaculty){
                setStorageData("faculty-profile", JSON.stringify(user));
            }
            else{
                setStorageData("student-profile", JSON.stringify(user));
            }

            // SHOW TOAST
            showToast(toast, UpdateProfileMessage);

            replacePage(href);
        }
        else{
            setLoading(false);
            showToast(toast, SomethingWrongError);
        }
    }

    useEffect(() => {
        setNewFirstName(userModel.firstName);
        setNewLastName(userModel.lastName);
        setNewEmail(userModel.email);
        setNewSrCode(userModel.srCode);
        setNewCourse(userModel.course);
    }, []);

    if(!loading){
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
                        <InputField title={isFaculty ? "Employee ID" : "Sr-Code"} useState={[newSrCode, setNewSrCode]} obscure={false} />
                        <div className="spacer-h-s" /> 
                        {/* EDIT COURSE FIELD */}
                        <InputField title="Course" useState={[newCourse, setNewCourse]} obscure={false} />
                        <div className="spacer-h-s" /> 
                    </div>
                    <div className="edit-password-button-container">
                        {/* CANCEL BUTTON */}
                        <IonButton fill="clear" className="edit-password-cancel-button" href={href}>Cancel</IonButton>
                        <div className="spacer-w-xs" />
                        {/* ADD BUTTON */}
                        <IonButton className="edit-password-add-button" shape="round" onClick={updateProfile}>Apply</IonButton>
                    </div>
                </IonContent>
            </IonPage>
        );
    }
    else{
        return <Loading />;
    }
};

export default EditProfile;