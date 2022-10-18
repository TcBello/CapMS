import { IonContent, IonPage } from "@ionic/react";
import { useMediaQuery } from "react-responsive";
import ContentHeader from "../../core/components/ContentHeader";
import { MobileMenuAppBar } from "../../core/components/Mobile-Appbar";
import { webWidth } from "../../core/Utils";
import AdviseeCard from "./components/AdviseeCard";
import "./MyAdvisee.css";

interface MyAdviseeModel{
    members: {name: string, image: string}[]
}

const sampleData: MyAdviseeModel[] = [
    {
        members: [
            {
                image: "https://www.biowritingservice.com/wp-content/themes/tuborg/images/Executive%20Bio%20Sample%20Photo.png",
                name: "Sum Ting Wong"
            },
            {
                image: "https://www.biowritingservice.com/wp-content/themes/tuborg/images/Executive%20Bio%20Sample%20Photo.png",
                name: "Yu Stin Ki Puh"
            },
            {
                image: "https://www.biowritingservice.com/wp-content/themes/tuborg/images/Executive%20Bio%20Sample%20Photo.png",
                name: "Dum Fuk"
            }
        ]
    }
];

const MyAdvisee = () => {
    const isDesktop = useMediaQuery({minWidth: webWidth});

    return <IonPage>
        {/* CONTENT HEADER */}
        {
            isDesktop
                ? <ContentHeader title="My Advisees" />
                : <MobileMenuAppBar title="My Advisees" />
        }
        {/* CONTENT */}
        <IonContent className={isDesktop ? "my-advisee-content" : "my-advisee-content-mobile"}>
            <div className={isDesktop ? "my-advisee-container" : "my-advisee-container-mobile"}>
                {/* ADVISEE CARD */}
                {sampleData.map((advisee, index) => {
                    return <AdviseeCard members={advisee.members} href="/"/>;
                })}
            </div>
        </IonContent>
    </IonPage>;
}

export default MyAdvisee;