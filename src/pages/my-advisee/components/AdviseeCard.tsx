import { IonAvatar, IonCard } from "@ionic/react";
import TeamModel from "../../../core/models/team_model";

const AdviseeCard = (props: {teamModel: TeamModel, onClick: any}) => {
    return <IonCard className="advisee-item-card" button onClick={props.onClick}>
        <div className="advisee-image-container">
            {props.teamModel.members.map((member, index) => {
                if(index < props.teamModel.members.length - 1){
                    return <IonAvatar className="advisee-avatar">
                        <img src={member.image} />
                    </IonAvatar>;
                }

                return <div></div>;
            })}
        </div>
        <div className="advisee-content-center">
            <h3 className="advisee-team-name">{props.teamModel.teamName}</h3>
            <h4 className="advisee-project-name">{props.teamModel.projectTitle}</h4>
        </div>
        <div className="spacer-h-xs" />
        <div className="content-left">
            {/* ADVISEE MEMBER NAME */}
            {props.teamModel.members.map((member, index) => {
                if(index < props.teamModel.members.length - 1){
                    return <p className="advisee-member-name">{member.firstName} {member.lastName}</p>;
                }

                return <div></div>;
            })}
        </div>
    </IonCard>
};

export default AdviseeCard;