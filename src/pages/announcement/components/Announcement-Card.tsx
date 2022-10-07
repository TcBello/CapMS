import { IonCard, IonItem, IonLabel } from "@ionic/react";
import { Component } from "react";

class AnnouncementCard extends Component<{by: string, createdAt: string, content: string},{}>{
    constructor(props: any){
        super(props);
    }

    render(){
        return (
            <IonCard className="announcement-card">
                <IonItem lines="none">
                    <IonLabel slot="start" className="title">By {this.props.by}</IonLabel>
                    <IonLabel slot="end" className="title">By {this.props.createdAt}</IonLabel>
                </IonItem>
                <p>{this.props.content}</p>
            </IonCard>
        );
    }
}

export default AnnouncementCard;