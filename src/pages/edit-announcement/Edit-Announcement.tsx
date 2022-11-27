import { IonButton, IonContent, IonItem, IonPage, IonTextarea, useIonToast } from "@ionic/react";
import { MobileArrowBackAppBar } from "../../core/components/Mobile-Appbar";
import "./Edit-Announcement.css";
import "../../core/components/Spacer.css";
import InputField from "../../core/components/InputField";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { getStorageData, replacePage, showToast, webWidth } from "../../core/Utils";
import { createAnnouncement, updateAnnouncement } from "../../core/services/admin_service";
import AnnouncementModel, { setAnnouncementModel } from "../../core/models/announcement_model";
import { CreateAnnouncementMessage, UpdateAnnouncementMessage } from "../../core/Success";
import Loading from "../../core/components/Loading";
import { SomethingWrongError } from "../../core/Errors";

const EditAnnouncement = () => {
    const [by, setBy] = useState("");
    const [message, setMessage] = useState("");

    const [loading, setLoading] = useState(false);

    const isDesktop = useMediaQuery({minWidth: webWidth});

    const [toast] = useIonToast();

    const storageData = getStorageData("announcement");
    const announcementModel = (JSON.parse(storageData!)) as AnnouncementModel;

    async function editAnnouncement(){
        // CREATE ANNOUNCEMENT

        setLoading(true);

        const result = await updateAnnouncement(setAnnouncementModel({
            by: by,
            message: message,
            date: announcementModel.date,
            uid: announcementModel.uid
        }));

        if(result){
            // SHOW TOAST
            showToast(toast, UpdateAnnouncementMessage);
            setLoading(false);
            replacePage("split-view-admin");
        }
        else{
            showToast(toast, SomethingWrongError);
            setLoading(false);
        }
    }

    useEffect(() => {
        setBy(announcementModel.by);
        setMessage(announcementModel.message);
    }, []);

    if(!loading){
        return <IonPage>
        {/* APP BAR */}
        <MobileArrowBackAppBar title="Add Announcement" href="split-view-admin"/>
        <IonContent>
            <div className="edit-announcement-container">
                <div className={isDesktop ? "edit-announcement-content-left" : "edit-announcement-content-center"}>
                    {/* BY INPUT FIELD */}
                    <InputField title="By" useState={[by, setBy]} obscure={false}/>
                    <div className="spacer-h-s" />
                    {/* MESSAGE INPUT FIELD */}
                        <IonTextarea
                            placeholder="Enter a message"
                            value={message}
                            onIonChange={(e: any) => {setMessage(e.target.value)}}
                            className={isDesktop ? "edit-announcement-message-container" : "edit-announcement-message-container-mobile"}
                        />
                </div>
                <div className="edit-announcement-button-container">
                    {/* CANCEL BUTTON */}
                    <IonButton fill="clear" className="edit-announcement-cancel-button" href="split-view-admin">Cancel</IonButton>
                    <div className="spacer-w-xs" />
                    {/* ADD BUTTON */}
                    <IonButton className="edit-announcement-add-button" shape="round" onClick={editAnnouncement}>Edit</IonButton>
                </div>
            </div>
        </IonContent>
    </IonPage>;
    }

    else {
        return <Loading />;
    }

};

export default EditAnnouncement;