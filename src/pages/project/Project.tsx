import { IonPage } from "@ionic/react";
import { Component } from "react";
import ProjectMobile from "./components/ProjectMobile";
import ProjectWeb from "./components/ProjectWeb";

class Project extends Component{
    render(){
        return (
            <IonPage>
                {/* PROJECT WEB VERSION */}
                <ProjectWeb />
                {/* PROJECT MOBILE VERSION */}
                <ProjectMobile />
            </IonPage>
        );
    }
}

export default Project;