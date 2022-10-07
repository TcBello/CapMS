import { IonContent } from "@ionic/react";
import { Component } from "react";
import MediaQuery from "react-responsive";
import { MobileMenuAppBar } from "../../../core/components/Mobile-Appbar";
import { webWidth } from "../../../core/Utils";
import AnnouncementCard from "./Announcement-Card";

interface AnnouncementData{
    by: string,
    createdAt: string,
    content: string
}

const sampleData: AnnouncementData[] = [
    {
        by: "CICS Alangilan",
        createdAt: "Oct. 8, 2022",
        content: "Pasado na sa capstone ang lahat ng studyante"
    },
    {
        by: "CICS Alangilan",
        createdAt: "Oct. 7, 2022",
        content: "WALANG PASOK NGAYON HEHE"
    },
    {
        by: "CICS Alangilan",
        createdAt: "Oct. 6, 2022",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam condimentum, orci sed ullamcorper gravida, nibh metus viverra lectus, quis tincidunt arcu leo pharetra est. Mauris facilisis fringilla lacus, eget porta nunc interdum vel. Vivamus placerat porttitor lectus, quis efficitur ligula gravida sit amet. Curabitur feugiat ornare blandit. Fusce bibendum tempor feugiat. In a aliquam nunc. Sed cursus convallis orci, sit amet commodo orci tristique a. Phasellus sed orci efficitur, venenatis justo vel, luctus metus. Suspendisse ut orci non sapien molestie dignissim sed vitae arcu. Ito ang link https://www.youtube.com/watch?v=BBJa32lCaaY"
    }
];

class AnnouncementMobile extends Component{
    render(){
        return (
            <IonContent>
                {/* CONTENT HEADER */}
                <MobileMenuAppBar title="Announcements"/>
                <div className="announcement-container">
                    {sampleData.map((announcement, index) => {
                        return <AnnouncementCard by={announcement.by} createdAt={announcement.createdAt} content={announcement.content} />;
                    })}
                </div>
            </IonContent>
        );
    }
}

export default AnnouncementMobile;