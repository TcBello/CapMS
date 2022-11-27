import { IonContent, IonFab, IonFabButton, IonIcon, IonPage, useIonToast } from "@ionic/react";
import { Component, useEffect, useState } from "react";
import "./Announcement.css";
import ContentHeader from "../../core/components/ContentHeader";
import { AnnouncementAdminCard, AnnouncementCard } from "./components/Announcement-Card";
import { useMediaQuery } from "react-responsive";
import { goPage, setStorageData, showToast, webWidth } from "../../core/Utils";
import { MobileMenuAppBar } from "../../core/components/Mobile-Appbar";
import { add } from "ionicons/icons";
import AnnouncementModel from "../../core/models/announcement_model";
import { deleteAnnouncement, getAllAnnouncements } from "../../core/services/admin_service";
import { SomethingWrongError } from "../../core/Errors";

const Announcement = () => {
    const isDesktop = useMediaQuery({minWidth: webWidth});
    const [announcements, setAnnouncements] = useState<AnnouncementModel[]>([]);

    function getAnnouncementData(){
        getAllAnnouncements().then((value: any) => {
            setAnnouncements(value as AnnouncementModel[])
        });
    }

    useEffect(() => {
        getAnnouncementData();
    }, []);

    return <IonPage>
        {/* APP BAR */}
        {
            isDesktop
             ? <ContentHeader title="Announcements" />
             : <MobileMenuAppBar title="Announcements" />
        }
        <IonContent className={isDesktop ? "announcement-content" : "announcement-content-mobile"}>
            <div className="announcement-container">
                {announcements.map((announcement, index) => {
                    // ANNOUNCEMENT CARD
                    return <AnnouncementCard announcementModel={announcement} />;
                })}
            </div>
        </IonContent>
    </IonPage>
}

const AnnouncementAdmin = () => {
    const isDesktop = useMediaQuery({minWidth: webWidth});
    const [announcements, setAnnouncements] = useState<AnnouncementModel[]>([]);

    const [toast] = useIonToast();

    async function editAnnouncement(announcementModel: AnnouncementModel){
        setStorageData("announcement", JSON.stringify(announcementModel));
        goPage("/home/admin/announcements/edit");
    }

    async function removeAnnouncement(announcementModel: AnnouncementModel){
        const result = await deleteAnnouncement(announcementModel);
        if(result){
            getAnnouncementData();
        }
        else{
            showToast(toast, SomethingWrongError);
        }
    }

    function getAnnouncementData(){
        getAllAnnouncements().then((value: any) => {
            setAnnouncements(value as AnnouncementModel[])
        });
    }

    useEffect(() => {
        getAnnouncementData();
    }, []);

    return <IonPage>
        {/* APP BAR */}
        {
            isDesktop
             ? <ContentHeader title="Announcements" />
             : <MobileMenuAppBar title="Announcements" />
        }
        <IonContent className={isDesktop ? "announcement-content" : "announcement-content-mobile"}>
            <div className="announcement-container">
                {announcements.map((announcement, index) => {
                    // ANNOUNCEMENT CARD
                    return <AnnouncementAdminCard
                        announcementModel={announcement}
                        onEdit={() => editAnnouncement(announcement)}
                        onDelete={() => removeAnnouncement(announcement)}
                        isDesktop={isDesktop}
                    />;
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