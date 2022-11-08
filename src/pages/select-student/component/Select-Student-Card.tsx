import { IonAvatar, IonCard } from "@ionic/react";

const SelectStudentCard = (props: {name: string, image: string, onClick: any}) => {
    return <IonCard className="select-student-card" button onClick={props.onClick}>
        {/* STUDENT IMAGE */}
        <IonAvatar className="select-student-image">
            <img src={props.image}/>
        </IonAvatar>
        <h6 className="select-student-name">{props.name}</h6>
    </IonCard>
}

export default SelectStudentCard;