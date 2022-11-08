import { IonAvatar, IonCard} from "@ionic/react";
import { useHistory} from "react-router-dom";
import { goPage } from "../../../core/Utils";

const UnavailableCard = (props: {name: string, course: string, image: string, href: string}) => {
    function goBack(){
        goPage(props.href);
    }

    return <IonCard className="item-card" button onClick={goBack}>
        {/* STATUS COLOR */}
        <div className="status-color-unavailable" />
        {/* ADVISER IMAGE */}
        <IonAvatar className="adviser-avatar">
            <img src={props.image} />
        </IonAvatar>
        {/* ADVISER NAME */}
        <h6 className="name">{props.name}</h6>
        {/* ADVISER COURSE */}
        <p className="course">{props.course}</p>
    </IonCard>;
}

export default UnavailableCard;