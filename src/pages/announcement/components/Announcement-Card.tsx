import { IonButton, IonCard, IonIcon, IonItem, IonLabel } from "@ionic/react";
import AnnouncementModel from "../../../core/models/announcement_model";
import { format } from "date-fns";
import { close, create, trash } from "ionicons/icons";

const AnnouncementCard = (props: {announcementModel: AnnouncementModel}) => {
    var date = props.announcementModel.date.toDate();
    var formattedDate = format(date, "MMM d, yyyy");

    return (
        <IonCard className="announcement-card">
            <IonItem lines="none">
                {/* BY */}
                <IonLabel slot="start" className="title">By {props.announcementModel.by}</IonLabel>
                {/* DATE */}
                <IonLabel slot="end" className="title">{formattedDate}</IonLabel>
            </IonItem>
            {/* MESSAGE */}
            <p>{props.announcementModel.message}</p>
        </IonCard>
    );
};

const AnnouncementAdminCard = (props: {announcementModel: AnnouncementModel, onEdit: any, onDelete: any, isDesktop: boolean}) => {
    var date = props.announcementModel.date.toDate();
    var formattedDate = format(date, "MMM d, yyyy");

    if(props.isDesktop){
        return (
            <IonCard className="announcement-card">
                <IonItem lines="none">
                    {/* BY */}
                    <IonLabel slot="start" className="title">By {props.announcementModel.by}</IonLabel>
                    {/* DATE */}
                    <IonLabel slot="end" className="title">{formattedDate}</IonLabel>
                    {/* EDIT BUTTON */}
                    <IonButton slot="end" shape="round" className="announcement-edit-button" onClick={props.onEdit}>
                        <IonIcon icon={create} className="icon"/>
                    </IonButton>
                    {/* DELETE BUTTON */}
                    <IonButton slot="end" shape="round" className="announcement-delete-button" onClick={props.onDelete}>
                        <IonIcon icon={close} className="icon"/>
                    </IonButton>
                </IonItem>
                <p>{props.announcementModel.message}</p>
            </IonCard>
        );
    }
    else{
        return (
            <IonCard className="announcement-card">
                <IonItem lines="none">
                    {/* BY */}
                    <IonLabel slot="start" className="title">By {props.announcementModel.by}</IonLabel>
                    {/* EDIT BUTTON */}
                    <IonButton slot="end" shape="round" className="announcement-edit-button" onClick={props.onEdit}>
                        <IonIcon icon={create} className="icon"/>
                    </IonButton>
                    {/* DELETE BUTTON */}
                    <IonButton slot="end" shape="round" className="announcement-delete-button" onClick={props.onDelete}>
                        <IonIcon icon={close} className="icon"/>
                    </IonButton>
                </IonItem>
                {/* DATE */}
                <IonLabel className="announcement-date-mobile">{formattedDate}</IonLabel>
                <p>{props.announcementModel.message}</p>
            </IonCard>
        );
    }
};

export { AnnouncementCard, AnnouncementAdminCard };