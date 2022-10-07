import { IonPage } from "@ionic/react";
import { Component } from "react";
import AnnouncementMobile from "./components/AnnouncementMobile";
import AnnouncementWeb from "./components/AnnouncementWeb";
import "./Announcement.css";

class Announcement extends Component{
    render(){
        return (
            <IonPage>
                {/* WEB VERSION */}
                <AnnouncementWeb />
                {/* MOBILE VERSION */}
                <AnnouncementMobile />
            </IonPage>
        );
    }
}

export default Announcement;