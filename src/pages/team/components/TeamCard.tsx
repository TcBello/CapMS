import { IonAvatar, IonCard } from "@ionic/react";
import UserModel from "../../../core/models/user_model";

const TeamCard = (props: {name: string, members: UserModel[], href: string}) => {
    return <IonCard className="item-card" button href={props.href}>
        <div className="image-container">
            {/* MEMBER IMAGES */}
            {props.members.map((member, index) => {
                return <img src={member.image}/>;
            })}
        </div>
        <div className="content-center">
            {/* TEAM NAME */}
            <p className="team-name">{props.name}</p>
        </div>
        <div className="content-left">
            {/* MEMBER NAMES */}
            {props.members.map((member, index) => {
                return <p className="member-name">{member.image}</p>;
            })}
        </div>
    </IonCard>
}

export default TeamCard;