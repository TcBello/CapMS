import { IonAvatar, IonCard } from "@ionic/react";
import UserModel from "../../../core/models/user_model";

const TeamCard = (props: {name: string, members: UserModel[], onClick: any}) => {
    return <IonCard className="item-card" button onClick={props.onClick}>
        <div className="image-container">
            {/* MEMBER IMAGES */}
            {props.members.map((member, index) => {
                return <IonAvatar className="team-card-avatar">
                    <img src={member.image}/>
                </IonAvatar>;
            })}
        </div>
        <div className="content-center">
            {/* TEAM NAME */}
            <p className="team-name">{props.name}</p>
        </div>
        <div className="content-left">
            {/* MEMBER NAMES */}
            {props.members.map((member, index) => {
                return <p className="member-name">{member.firstName} {member.lastName}</p>;
            })}
        </div>
    </IonCard>
}

export default TeamCard;