import { IonPage } from "@ionic/react";
import { Component } from "react";
import ProposeTopicMobile from "./components/Propose-Topic-Mobile";
import ProposeTopicWeb from "./components/Propose-Topic-Web";
import "./Propose-Topic.css";
import "../../core/components/Spacer.css";

class ProposeTopic extends Component{
    render(){
        return (
            <IonPage>
                {/* PROPOSE TOPIC WEB VERSION */}
                <ProposeTopicWeb />
                {/* PROPOSE TOPIC MOBILE VERSION */}
                <ProposeTopicMobile />
            </IonPage>
        );
    }
}

export default ProposeTopic;