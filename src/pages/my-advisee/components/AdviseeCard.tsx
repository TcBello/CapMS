import { IonCard } from "@ionic/react";

const AdviseeCard = (props: {members: {name: string, image: string}[], href: string}) => {
    return <IonCard className="advisee-item-card" button href={props.href}>
        <div className="advisee-image-container">
            {props.members.map((member, index) => {
                return <img src={member.image} />
            })}
        </div>
        <div className="content-left">
            {/* ADVISEE MEMBER NAME */}
            {props.members.map((member, index) => {
                return <p className="advisee-member-name">{member.name}</p>;
            })}
        </div>
    </IonCard>
};

export default AdviseeCard;