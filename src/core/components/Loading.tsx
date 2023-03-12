import { IonContent, IonItem, IonPage, IonSpinner } from "@ionic/react";
import "./Loading.css";

const Loading = () => {
    return <IonPage>
        <IonContent>
            <div className="loading-content-center">
                <h1 className="loading-text">CAP<span>MS</span></h1>
                {/* LOADING SPINNER */}
                <IonItem lines="none">
                    <IonSpinner name="crescent" className="loading-color" />
                </IonItem>
            </div>
        </IonContent>
    </IonPage>;
};

export default Loading;