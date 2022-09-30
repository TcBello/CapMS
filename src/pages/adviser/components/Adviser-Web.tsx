import { IonPage, IonContent, IonCard, IonHeader, IonMenuButton, IonTitle, IonList, IonItem, IonIcon, IonLabel, IonImg, IonButton, IonGrid, IonRow, IonCol} from "@ionic/react";
import { Component } from "react";
import MediaQuery from 'react-responsive';
import ContentHeader from "../../../core/components/ContentHeader";
import { webWidth } from "../../../core/Utils";
import "../Adviser.css";

class AdviserWeb extends Component{
    render(){
        return (
           
            <MediaQuery minWidth={webWidth}>
                <IonPage>
                    {/* CONTENT HEADER */}
                    <ContentHeader title="Advisers"/>
                        <IonContent className="content" >
                            
                            <IonGrid>
                                <IonRow>
                                    <IonCol size-xs="10" size-md="4.5">
                                        <IonCard className="item-card">
                                             {/* ADVISER IMAGE */}
                                            <div className="adviser-image"></div>
                                                {/* ADVISER NAME */}
                                                <IonLabel><h1 className="adviser-1">Mr. Gomez</h1></IonLabel>     
                                        </IonCard>
                                    </IonCol>
                                    <IonCol size-xs="12" size-md="6">
                                        <IonCard className="item-card">
                                            {/* ADVISER IMAGE */}
                                            <div className="adviser-image"></div>
                                            {/* ADVISER NAME */}
                                                <IonLabel><h1 className="adviser-1">Mr. Richard</h1></IonLabel>
                                        </IonCard>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                            
                        </IonContent>
        
                    </IonPage>
            </MediaQuery>
        );
    }
}

export default AdviserWeb;