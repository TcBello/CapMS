import { IonButton, IonContent, IonItem, IonPage, IonTextarea, useIonToast } from "@ionic/react";
import { MobileArrowBackAppBar } from "../../core/components/Mobile-Appbar";
import "./Add-Announcement.css";
import "../../core/components/Spacer.css";
import InputField from "../../core/components/InputField";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { showToast, webWidth } from "../../core/Utils";
import { createAnnouncement } from "../../core/services/admin_service";
import AnnouncementModel, { setAnnouncementModel } from "../../core/models/announcement_model";
import { CreateAnnouncementMessage } from "../../core/Success";
import Loading from "../../core/components/Loading";
import { MissingFieldError, SomethingWrongError } from "../../core/Errors";

const AddAnnouncement = () => {
    const [by, setBy] = useState("");
    const [message, setMessage] = useState("");

    const [loading, setLoading] = useState(false);

    const isDesktop = useMediaQuery({minWidth: webWidth});

    const [toast] = useIonToast();

    async function addAnnouncement(){
        if(by != "" && message != ""){
            // CREATE ANNOUNCEMENT

            setLoading(true);

            const result = await createAnnouncement(setAnnouncementModel({
                
                by: by,
                message: message

            }));

            setLoading(false);

            if(result){
                // SHOW TOAST
                showToast(toast, CreateAnnouncementMessage);

                // CLEAR INPUT FIELDS
                setBy("");
                setMessage("");
            }
            else{
                showToast(toast, SomethingWrongError);
            }
        }
        else{
            showToast(toast, MissingFieldError);
        }
    }

    if(!loading){
        return <IonPage>
        {/* APP BAR */}
        <MobileArrowBackAppBar title="Add Announcement" href="/split-view-admin/announcements"/>
        <IonContent>
            <div className="add-announcement-container">
                <div className={isDesktop ? "add-announcement-content-left" : "add-announcement-content-center"}>
                    {/* BY INPUT FIELD */}
                    <InputField title="By" useState={[by, setBy]} obscure={false}/>
                    <div className="spacer-h-s" />
                    {/* MESSAGE INPUT FIELD */}
                        <IonTextarea
                            placeholder="Enter a message"
                            value={message}
                            onIonChange={(e: any) => {setMessage(e.target.value)}}
                            className={isDesktop ? "add-announcement-message-container" : "add-announcement-message-container-mobile"}
                        />
                </div>
                <div className="add-announcement-button-container">
                    {/* CANCEL BUTTON */}
                    <IonButton fill="clear" className="add-announcement-cancel-button" href="/split-view-admin/announcements">Cancel</IonButton>
                    <div className="spacer-w-xs" />
                    {/* ADD BUTTON */}
                    <IonButton className="add-announcement-add-button" shape="round" onClick={addAnnouncement}>Add</IonButton>
                </div>
            </div>
        </IonContent>
    </IonPage>;
    }

    else {
        return <Loading />;
    }

};

export default AddAnnouncement;