import { IonAvatar, IonCard } from "@ionic/react";

const SelectStudentCard = (props: {name: string, image: string, href: string}) => {
    return <IonCard className="select-student-card" button>
        {/* STUDENT IMAGE */}
        <IonAvatar className="select-student-image">
            <img src={props.image}/>
        </IonAvatar>
        <h6 className="select-student-name">{props.name}</h6>
    </IonCard>
}

export default SelectStudentCard;