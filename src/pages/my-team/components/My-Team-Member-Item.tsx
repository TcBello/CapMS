import { IonAvatar } from "@ionic/react";

const MyTeamMemberItem = (props: {image: string, name: string, role: string}) => {
    return <div className="my-team-member-item-container">
        <IonAvatar className="avatar">
            <img src={props.image}/>
        </IonAvatar>
        <div className="spacer-h-s"/>
        <h6 className="name">{props.name}</h6>
        <p className="role">{props.role}</p>
    </div>;
};

const MyTeamAdviserItem = (props: {image: string, name: string, role: string}) => {
    return <div className="my-team-adviser-item-container">
        <IonAvatar className="avatar">
            <img src={props.image}/>
        </IonAvatar>
        <div className="spacer-h-s"/>
        <h6 className="name">{props.name}</h6>
        <p className="role">{props.role}</p>
    </div>;
};


export {MyTeamMemberItem, MyTeamAdviserItem};
