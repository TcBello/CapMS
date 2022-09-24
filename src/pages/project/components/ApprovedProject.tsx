import { IonCard } from "@ionic/react";
import { Component } from "react";
import '../Project.css';
import '../../../core/components/Spacer.css';

class ApprovedProject extends Component<{name: string}, {}>{
    constructor(props: any){
        super(props);
    }

    render(){
        return (
            // CARD
            <IonCard className="item-card">
                {/* STATUS COLOR */}
                <div className="project-status-approved-color"/>
                <div className="spacer-h-xs"/>
                {/* STATUS IMAGE */}
                <div className="project-status-approved-image"/>
                {/* PROJECT NAME */}
                <h2 className="project-item-name">{this.props.name}</h2>
            </IonCard>
        );
    }
}

export default ApprovedProject;