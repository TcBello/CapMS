import { IonCard } from "@ionic/react";
import { Component } from "react";
import '../Project.css';
import '../../../core/components/Spacer.css';

class PendingProject extends Component<{name: string, href: string}, {}>{
    constructor(props: any){
        super(props);
    }

    render(){
        return (
            // CARD
            <IonCard className="item-card" href={this.props.href}>
                {/* STATUS COLOR */}
                <div className="project-status-pending-color"/>
                <div className="spacer-h-xs"/>
                {/* STATUS IMAGE */}
                <div className="project-status-pending-image"/>
                {/* PROJECT NAME */}
                <h2 className="project-item-name">{this.props.name}</h2>
            </IonCard>
        );
    }
}

export default PendingProject;