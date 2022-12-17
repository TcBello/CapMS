import { IonAvatar } from "@ionic/react";

const MyTeamMemberItem = (props: {image: string, name: string, role: string, responsibilities: string[]}) => {
    return <div className="my-team-member-item-container">
        {/* AVATAR */}
        <IonAvatar className="avatar">
            <img src={props.image}/>
        </IonAvatar>
        <div className="spacer-h-s"/>
        {/* NAME */}
        <h6 className="name">{props.name}</h6>
        {/* ROLE */}
        <p className="role">{props.role}</p>
        {/* RESPONSIBILITIES */}
        {props.responsibilities.map((responsibility, index) => {
            return <p className="responsibilities">{responsibility}</p>
        })}
    </div>;
};

const MyTeamAdviserItem = (props: {image: string, name: string, role: string}) => {
    return <div className="my-team-adviser-item-container">
        {/* AVATAR */}
        <IonAvatar className="avatar">
            <img src={props.image}/>
        </IonAvatar>
        <div className="spacer-h-s"/>
        {/* NAME */}
        <h6 className="name">{props.name}</h6>
        {/* ROLE */}
        <p className="role">{props.role}</p>
    </div>;
};


export {MyTeamMemberItem, MyTeamAdviserItem};
