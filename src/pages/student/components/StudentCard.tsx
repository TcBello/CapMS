import { IonAvatar, IonCard } from "@ionic/react";
import UserModel from "../../../core/models/user_model";
import { goPage, setStorageData } from "../../../core/Utils";

const StudentCard = (props: {userModel: UserModel, href: string}) => {
    function onClick(){
        setStorageData("student-profile", JSON.stringify(props.userModel));
        goPage(props.href);
    }

    return <IonCard className="item-card" button onClick={onClick}>
        {/* STUDENT IMAGE */}
        <IonAvatar className="student-card-avatar">
            <img src={props.userModel.image} />
        </IonAvatar>
        {/* STUDENT NAME */}
        <h6 className="name">{props.userModel.firstName} {props.userModel.lastName}</h6>
    </IonCard>
}

export default StudentCard;