import { IonPage } from "@ionic/react";
import MyTeamMobile from "./components/My-Team-Mobile";
import MyTeamWeb from "./components/My-Team-Web";
import "./My-Team.css";
import "../../core/components/Spacer.css";

const MyTeam = (props: any) => {
    return (
        <IonPage>
            {/* MY TEAM WEB VERSION */}
            <MyTeamWeb />
            {/* MY TEAM MOBILE VERSION */}
            <MyTeamMobile />
        </IonPage>
    );
}
export default MyTeam;