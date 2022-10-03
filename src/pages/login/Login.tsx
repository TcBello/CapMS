import { IonButton, IonCard, IonIcon, IonInput, IonItem, IonLabel, IonPage} from "@ionic/react";
import { lockClosed } from "ionicons/icons";
import { Component } from "react";
import BackgroundLogin from "./components/BackgroundLogin";
import "../../core/components/Spacer.css";
import MediaQuery from "react-responsive";
import LoginWeb from "./components/Login-Web";
import LoginMobile from "./components/Login-Mobile";
import "./Login.css";

class Login extends Component{
    constructor(props: {}){
        super(props);
    }

    render(){
        return (
            <div>
                <IonPage>
                    {/* WEB VERSION */}
                    <LoginWeb />
                    {/* MOBILE VERSION */}
                    <LoginMobile />
                </IonPage>
            </div>
        );
    }
}

export default Login;