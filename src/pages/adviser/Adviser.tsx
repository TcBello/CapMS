
import { Component} from "react";
import { IonPage } from '@ionic/react';
import AdviserWeb from './components/Adviser-Web';
import './Adviser.css';
import AdviserMobile from "./components/Adviser-Mobile";

class Adviser extends Component{


    render() {
        
        return(

            <IonPage>
                {/* ADVISER WEB VERSION */}
                <AdviserWeb />
                 {/* ADVISER MOBILE VERSION */}
                 <AdviserMobile />
            </IonPage>
        );



    }




}


export default Adviser;