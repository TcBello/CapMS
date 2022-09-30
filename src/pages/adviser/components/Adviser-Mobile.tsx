import { IonHeader, IonMenuButton, IonPage } from "@ionic/react";
import { Component } from "react";

class AdviserMobile extends Component{
    render(){
        return (
            <IonPage>
                <IonHeader>
                    <IonMenuButton></IonMenuButton>
                </IonHeader>
            </IonPage>
        );
    }
}

export default AdviserMobile;