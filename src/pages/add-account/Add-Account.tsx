import { IonButton, IonContent, IonIcon, IonInput, IonItem, IonLabel, IonPage } from "@ionic/react";
import { useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { MobileArrowBackAppBar } from "../../core/components/Mobile-Appbar";
import { webWidth } from "../../core/Utils";
import "./Add-Account.css";
import "../../core/components/Spacer.css";
import { add, addCircle } from "ionicons/icons";

const AddAccount = (props: any) => {
    const isDesktop = useMediaQuery({minWidth: webWidth});

    const inputFile = useRef<HTMLInputElement | null>(null);

    const isFaculty = props.match.params.role == "faculty-staffs";

    const [email, setEmail] = useState("");
    const [fName, setFname] = useState("");
    const [lName, setLname] = useState("");
    const [password, setPassword] = useState("");
    const [course, setCourse] = useState("");
    const [srCode, setSrCode] = useState("");
    const [file, setFile] = useState<any[]>([]);

    function handleChange(e: any) {
        setFile([...file, e.target.files[0]]);
    }

    function openFile(){
        inputFile.current?.click();
    }

    return <IonPage>
        {/* APP BAR */}
        <MobileArrowBackAppBar title={isFaculty ? "Add Faculty Staff" : "Add Student"} href="split-view-admin"/>
        {/* CONTENT */}
        <IonContent>
            <div className="spacer-h-m"/>
            <div className="add-faculty-content-center">
                <div className="add-faculty-avatar-container">
                    {/* ADD IMAGE BUTTON */}
                    <IonButton fill="clear" shape="round" className="add-faculty-stacked-button" onClick={openFile}>
                        <IonIcon icon={add} className="icon"/>
                    </IonButton>
                    <input type="file" ref={inputFile} onChange={handleChange}/>
                    {/* AVATAR */}
                    <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" />
                </div>
            </div>
            <div className="spacer-h-m"/>
            <div className="add-faculty-content-left">
                {/* FIRST NAME INPUT FIELD */}
                <IonItem lines="none" className={isDesktop ? "add-faculty-input-field" : "add-faculty-input-field-mobile"}>
                    <IonLabel position="floating">
                        First Name
                    </IonLabel>
                    <IonInput value={fName} onIonChange={(e: any) => setFname(e.target.value)} />
                </IonItem>
                <div className="spacer-h-s"/>
                {/* LAST NAME INPUT FIELD */}
                <IonItem lines="none" className={isDesktop ? "add-faculty-input-field" : "add-faculty-input-field-mobile"}>
                    <IonLabel position="floating">
                        Last Name
                    </IonLabel>
                    <IonInput value={lName} onIonChange={(e: any) => setLname(e.target.value)} />
                </IonItem>
                <div className="spacer-h-s"/>
                {/* EMAIL INPUT FIELD */}
                <IonItem lines="none" className={isDesktop ? "add-faculty-input-field" : "add-faculty-input-field-mobile"}>
                    <IonLabel position="floating">
                        Email
                    </IonLabel>
                    <IonInput value={email} onIonChange={(e: any) => setEmail(e.target.value)} />
                </IonItem>
                <div className="spacer-h-s"/>
                {/* PASSWORD INPUT FIELD */}
                <IonItem lines="none" className={isDesktop ? "add-faculty-input-field" : "add-faculty-input-field-mobile"}>
                    <IonLabel position="floating">
                        Password
                    </IonLabel>
                    <IonInput value={password} onIonChange={(e: any) => setPassword(e.target.value)} />
                </IonItem>
                <div className="spacer-h-s"/>
                {/* COURSE INPUT FIELD */}
                <IonItem lines="none" className={isDesktop ? "add-faculty-input-field" : "add-faculty-input-field-mobile"}>
                    <IonLabel position="floating">
                        Course
                    </IonLabel>
                    <IonInput value={course} onIonChange={(e: any) => setCourse(e.target.value)} />
                </IonItem>
                <div className="spacer-h-s"/>
                {/* SR CODE INPUT FIELD */}
                <IonItem lines="none" className={isDesktop ? "add-faculty-input-field" : "add-faculty-input-field-mobile"}>
                    <IonLabel position="floating">
                        SR Code
                    </IonLabel>
                    <IonInput value={srCode} onIonChange={(e: any) => setSrCode(e.target.value)} />
                </IonItem>
            </div>
            <div className="spacer-h-m"/>
            <div className="add-faculty-content-right">
                {/* CANCEL BUTTON */}
                <IonButton fill="clear" className="add-faculty-cancel-button" href="split-view-admin">Cancel</IonButton>
                <div className="spacer-w-xs" />
                {/* ADD BUTTON */}
                <IonButton className="add-faculty-add-button" shape="round">Add</IonButton>
                <div className="spacer-w-xs" />
            </div>
        </IonContent>
    </IonPage>
}

export default AddAccount;