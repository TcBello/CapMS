import { IonAvatar, IonCard } from "@ionic/react";

const TeamCard = (props: {name: string, members: {image: string, name: string}[], href: string}) => {
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
                return <p className="member-name">{member.name}</p>
            })}
        </div>
    </IonCard>
}

export default TeamCard;