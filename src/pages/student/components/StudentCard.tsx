import { IonAvatar, IonCard } from "@ionic/react";

const StudentCard = (props: {image: string, name: string, href: string}) => {
    return <IonCard className="item-card" button href={props.href}>
        {/* STUDENT IMAGE */}
        <IonAvatar className="student-card-avatar">
            <img src={props.image} />
        </IonAvatar>
        {/* STUDENT NAME */}
        <h6 className="name">{props.name}</h6>
    </IonCard>
}

export default StudentCard;