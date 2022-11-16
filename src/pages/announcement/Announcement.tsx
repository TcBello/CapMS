import { IonContent, IonFab, IonFabButton, IonIcon, IonPage } from "@ionic/react";
import { Component, useEffect, useState } from "react";
import "./Announcement.css";
import ContentHeader from "../../core/components/ContentHeader";
import AnnouncementCard from "./components/Announcement-Card";
import { useMediaQuery } from "react-responsive";
import { webWidth } from "../../core/Utils";
import { MobileMenuAppBar } from "../../core/components/Mobile-Appbar";
import { add } from "ionicons/icons";
import AnnouncementModel from "../../core/models/announcement_model";
import { getAllAnnouncements } from "../../core/services/admin_service";

const Announcement = () => {
    const isDesktop = useMediaQuery({minWidth: webWidth});
    const [announcements, setAnnouncements] = useState<AnnouncementModel[]>([]);

    useEffect(() => {
        getAllAnnouncements().then((value: any) => {
            setAnnouncements(value as AnnouncementModel[])
        });
    }, []);

    return <IonPage>
        {/* APP BAR */}
        {
            isDesktop
             ? <ContentHeader title="Announcements" />
             : <MobileMenuAppBar title="Announcements" />
        }
        <div className={isDesktop ? "announcement-container" : "announcement-container-mobile"}>
            {announcements.map((announcement, index) => {
                // ANNOUNCEMENT CARD
                return <AnnouncementCard announcementModel={announcement} />;
            })}
        </div>
    </IonPage>
}

const AnnouncementAdmin = () => {
    const isDesktop = useMediaQuery({minWidth: webWidth});
    const [announcements, setAnnouncements] = useState<AnnouncementModel[]>([]);

    useEffect(() => {
        getAllAnnouncements().then((value: any) => {
            setAnnouncements(value as AnnouncementModel[])
        });
    }, []);

    return <IonPage>
        {/* APP BAR */}
        {
            isDesktop
             ? <ContentHeader title="Announcements" />
             : <MobileMenuAppBar title="Announcements" />
        }
        <IonContent>
        <div className={isDesktop ? "announcement-container" : "announcement-container-mobile"}>
            {announcements.map((announcement, index) => {
                // ANNOUNCEMENT CARD
                return <AnnouncementCard announcementModel={announcement} />;
            })}
        </div>
        {/* FAB BUTTON */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed" className="announcement-fab-button">
            <IonFabButton href="/home/admin/announcements/add">
                <IonIcon icon={add} className="icon"/>  
            </IonFabButton>
        </IonFab>
        </IonContent>
    </IonPage>
}

export { Announcement, AnnouncementAdmin };