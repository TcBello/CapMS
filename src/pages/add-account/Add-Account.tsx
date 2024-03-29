import { IonAvatar, IonButton, IonContent, IonIcon, IonInput, IonItem, IonLabel, IonPage, useIonToast } from "@ionic/react";
import { useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { MobileArrowBackAppBar } from "../../core/components/Mobile-Appbar";
import { showToast, webWidth } from "../../core/Utils";
import "./Add-Account.css";
import "../../core/components/Spacer.css";
import { add, addCircle } from "ionicons/icons";
import { createAccount } from "../../core/services/admin_service";
import { setUserModel } from "../../core/models/user_model";
import { CreateAccountMessage } from "../../core/Success";
import Loading from "../../core/components/Loading";
import { MissingFieldError, PasswordLengthError, SomethingWrongError } from "../../core/Errors";
import InputField from "../../core/components/InputField";

const AddAccount = (props: any) => {
    const isDesktop = useMediaQuery({ minWidth: webWidth });

    const inputFile = useRef<HTMLInputElement | null>(null);

    const isFaculty = props.match.params.role == "faculty-staffs";

    const defaultImage = "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png";

    const [email, setEmail] = useState("");
    const [fName, setFname] = useState("");
    const [lName, setLname] = useState("");
    const [password, setPassword] = useState("");
    const [course, setCourse] = useState("");
    const [specialized, setSpecialized] = useState("");
    const [srCode, setSrCode] = useState("");
    const [file, setFile] = useState<any>(null);
    const [image, setImage] = useState(defaultImage);
    const [loading, setLoading] = useState(false);

    const href = isFaculty ? "/split-view-admin/faculty-staffs" : "/split-view-admin/students";

    const [toast] = useIonToast();

    function handleChange(e: any) {
        if (e.target.files && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
            setFile(e.target.files[0]);
        }
    }

    function openFile() {
        inputFile.current?.click();
    }

    async function addAccount() {
        const specializedList = specialized.split(",");
        const role = isFaculty ? "Faculty" : "Student"
        const userModel = isFaculty
            ? setUserModel({
                firstName: fName,
                lastName: lName,
                email: email,
                password: password,
                course: course,
                srCode: srCode,
                role: role,
                specializes: specializedList,
                status: "Available"
            })
            : setUserModel({
                firstName: fName,
                lastName: lName,
                email: email,
                password: password,
                course: course,
                srCode: srCode,
                role: role,
                responsibilities: specializedList,
                status: ""
            })

        if (file != null) {
            if (email != "" && fName != "" && lName != "" && password != "" && course != "" && srCode != "") {
                if (!(password.length < 6)) {
                    setLoading(true);
                    const result = await createAccount(userModel, file);

                    setLoading(false);

                    if (result) {
                        showToast(toast, CreateAccountMessage);

                        // CLEAR TEXT FIELDS
                        setFname("");
                        setLname("");
                        setEmail("");
                        setPassword("");
                        setCourse("");
                        setSpecialized("");
                        setSrCode("");
                        // CLEAR IMAGE
                        setFile(null);
                        setImage(defaultImage);
                    }
                    else {
                        showToast(toast, SomethingWrongError);
                    }
                }
                else {
                    showToast(toast, PasswordLengthError);
                }
            }
            else {
                showToast(toast, MissingFieldError);
            }
        }
        else {
            showToast(toast, "Missing Picture");
        }
    }

    if (!loading) {
        return <IonPage>
            {/* APP BAR */}
            <MobileArrowBackAppBar title={isFaculty ? "Add Faculty" : "Add Student"} href={href} />
            {/* CONTENT */}
            <IonContent>
                <div className="spacer-h-m" />
                <div className="add-faculty-content-center">
                    <div className="add-faculty-avatar-container">
                        {/* ADD IMAGE BUTTON */}
                        <IonButton fill="clear" shape="round" className="add-faculty-stacked-button" onClick={openFile}>
                            <IonIcon icon={add} className="icon" />
                        </IonButton>
                        <input type="file" ref={inputFile} onChange={handleChange} />
                        {/* AVATAR */}
                        <IonAvatar className="add-faculty-avatar">
                            <img src={image} />
                        </IonAvatar>
                    </div>
                </div>
                <div className="spacer-h-m" />
                <div className="add-faculty-content-left">
                    {/* FIRST NAME INPUT FIELD */}
                    <IonItem lines="none" className={isDesktop ? "add-faculty-input-field" : "add-faculty-input-field-mobile"}>
                        <IonLabel position="floating">
                            First Name
                        </IonLabel>
                        <IonInput value={fName} onIonChange={(e: any) => setFname(e.target.value)} />
                    </IonItem>
                    <div className="spacer-h-s" />
                    {/* LAST NAME INPUT FIELD */}
                    <IonItem lines="none" className={isDesktop ? "add-faculty-input-field" : "add-faculty-input-field-mobile"}>
                        <IonLabel position="floating">
                            Last Name
                        </IonLabel>
                        <IonInput value={lName} onIonChange={(e: any) => setLname(e.target.value)} />
                    </IonItem>
                    <div className="spacer-h-s" />
                    {/* EMAIL INPUT FIELD */}
                    <IonItem lines="none" className={isDesktop ? "add-faculty-input-field" : "add-faculty-input-field-mobile"}>
                        <IonLabel position="floating">
                            Email
                        </IonLabel>
                        <IonInput value={email} onIonChange={(e: any) => setEmail(e.target.value)} />
                    </IonItem>
                    <div className="spacer-h-s" />
                    {/* PASSWORD INPUT FIELD */}
                    <IonItem lines="none" className={isDesktop ? "add-faculty-input-field" : "add-faculty-input-field-mobile"}>
                        <IonLabel position="floating">
                            Password
                        </IonLabel>
                        <IonInput value={password} onIonChange={(e: any) => setPassword(e.target.value)} />
                    </IonItem>
                    <div className="spacer-h-s" />
                    {/* COURSE INPUT FIELD */}
                    <IonItem lines="none" className={isDesktop ? "add-faculty-input-field" : "add-faculty-input-field-mobile"}>
                        <IonLabel position="floating">
                            Course
                        </IonLabel>
                        <IonInput value={course} onIonChange={(e: any) => setCourse(e.target.value)} />
                    </IonItem>
                    <div className="spacer-h-s" />
                    {/* RESPONSIBILITIES / SPECIALIZED MAJOR INPUT FIELD */}
                    <InputField title={isFaculty ? "Specialized Major" : "Responsibilities"} useState={[specialized, setSpecialized]} obscure={false} />
                    <p><b>Note:</b> Use COMMA to separate inputs</p>
                    <div className="spacer-h-s" />
                    {/* SR CODE INPUT FIELD */}
                    <IonItem lines="none" className={isDesktop ? "add-faculty-input-field" : "add-faculty-input-field-mobile"}>
                        <IonLabel position="floating">
                            {isFaculty ? "Employee ID" : "SR Code"}
                        </IonLabel>
                        <IonInput value={srCode} onIonChange={(e: any) => setSrCode(e.target.value)} />
                    </IonItem>
                </div>
                <div className="spacer-h-l" />
                <div className="add-faculty-content-right">
                    {/* CANCEL BUTTON */}
                    <IonButton fill="clear" className="add-faculty-cancel-button" href={href}>Cancel</IonButton>
                    <div className="spacer-w-xs" />
                    {/* ADD BUTTON */}
                    <IonButton className="add-faculty-add-button" shape="round" onClick={addAccount}>Add</IonButton>
                    <div className="spacer-w-xs" />
                </div>
                <div className="spacer-h-s" />
            </IonContent>
        </IonPage>
    }
    else {
        return <Loading />;
    }
}

export default AddAccount;