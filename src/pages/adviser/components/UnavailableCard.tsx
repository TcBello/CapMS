import { IonAvatar, IonCard} from "@ionic/react";
import { useHistory} from "react-router-dom";
import UserModel from "../../../core/models/user_model";
import { goPage } from "../../../core/Utils";

const UnavailableCard = (props: {userModel: UserModel, onClick: any}) => {
    return <IonCard className="item-card" button onClick={props.onClick}>
        {/* STATUS COLOR */}
        <div className="status-color-unavailable" />
        {/* ADVISER IMAGE */}
        <IonAvatar className="adviser-avatar">
            <img src={props.userModel.image} />
        </IonAvatar>
        {/* ADVISER NAME */}
        <h6 className="name">{props.userModel.firstName} {props.userModel.lastName}</h6>
        {/* ADVISER COURSE */}
        <p className="course">{props.userModel.course}</p>
    </IonCard>;
}

export default UnavailableCard;