import { IonCard, IonItem, IonLabel } from "@ionic/react";
import AnnouncementModel from "../../../core/models/announcement_model";
import { format } from "date-fns";

const AnnouncementCard = (props: {announcementModel: AnnouncementModel}) => {
    var date = props.announcementModel.date.toDate();
    var formattedDate = format(date, "MMM d, yyyy");

    return (
        <IonCard className="announcement-card">
            <IonItem lines="none">
                <IonLabel slot="start" className="title">By {props.announcementModel.by}</IonLabel>
                <IonLabel slot="end" className="title">{formattedDate}</IonLabel>
            </IonItem>
            <p>{props.announcementModel.message}</p>
        </IonCard>
    );
};

export default AnnouncementCard;