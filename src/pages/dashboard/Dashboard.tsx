import { IonPage } from "@ionic/react";
import { useMediaQuery } from "react-responsive";
import ContentHeader from "../../core/components/ContentHeader";
import { MobileMenuAppBar } from "../../core/components/Mobile-Appbar";
import { webWidth } from "../../core/Utils";
import "./Dashboard.css";

const Dashboard = () => {
    const isDesktop = useMediaQuery({minWidth: webWidth});

    return <IonPage>
        {/* CONTENT HEADER */}
        {
            isDesktop
                ? <ContentHeader title="Dashboard" />
                : <MobileMenuAppBar title="Dashboard" />
        }
    </IonPage>
}

export default Dashboard;