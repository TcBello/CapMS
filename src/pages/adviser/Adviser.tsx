
import { Component} from "react";
import { IonContent, IonPage } from '@ionic/react';
import './Adviser.css';
import { MobileArrowBackAppBar } from "../../core/components/Mobile-Appbar";
import AvailableCard from "./components/AvailableCard";
import UnavailableCard from "./components/UnavailableCard";

interface AdviserModel{
    image: string,
    name: string,
    status: string
}

const sampleData: AdviserModel[] = [
    {
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7kIQYr1SywpoSYppX-aC8pbvHqjNlnr2CDA&usqp=CAU",
        name: "Sum Ting Wongasdd",
        status: "available"
    },
    {
        image: "https://www.biowritingservice.com/wp-content/themes/tuborg/images/Executive%20Bio%20Sample%20Photo.png",
        name: "Sum Ting Wong",
        status: "unavailable"
    },
    {
        image: "https://www.biowritingservice.com/wp-content/themes/tuborg/images/Executive%20Bio%20Sample%20Photo.png",
        name: "Sum Ting Wong",
        status: "available"
    },
    {
        image: "https://www.biowritingservice.com/wp-content/themes/tuborg/images/Executive%20Bio%20Sample%20Photo.png",
        name: "Sum Ting Wong",
        status: "unavailable"
    },
    {
        image: "https://www.biowritingservice.com/wp-content/themes/tuborg/images/Executive%20Bio%20Sample%20Photo.png",
        name: "Sum Ting Wong",
        status: "available"
    },
    {
        image: "https://www.biowritingservice.com/wp-content/themes/tuborg/images/Executive%20Bio%20Sample%20Photo.png",
        name: "Sum Ting Wong",
        status: "unavailable"
    },
    {
        image: "https://www.biowritingservice.com/wp-content/themes/tuborg/images/Executive%20Bio%20Sample%20Photo.png",
        name: "Sum Ting Wong",
        status: "available"
    },
    {
        image: "https://www.biowritingservice.com/wp-content/themes/tuborg/images/Executive%20Bio%20Sample%20Photo.png",
        name: "Sum Ting Wong",
        status: "unavailable"
    },
    {
        image: "https://www.biowritingservice.com/wp-content/themes/tuborg/images/Executive%20Bio%20Sample%20Photo.png",
        name: "Sum Ting Wong",
        status: "available"
    },
    {
        image: "https://www.biowritingservice.com/wp-content/themes/tuborg/images/Executive%20Bio%20Sample%20Photo.png",
        name: "Sum Ting Wong",
        status: "unavailable"
    }
];

class Adviser extends Component{
    render(){
        return (
            <IonPage>
                {/* CONTENT HEADER */}
                <MobileArrowBackAppBar title="Select an Adviser" href="/projects/propose-topic" />
                <IonContent className="adviser-content">
                    <div className="adviser-container">
                        {sampleData.map((adviser, index) => {
                            switch(adviser.status){
                                case "available":
                                    return <AvailableCard name={adviser.name} image={adviser.image} href="/projects/propose-topic"/>;
                                case "unavailable":
                                    return <UnavailableCard name={adviser.name} image={adviser.image} href=""/>;
                                default:
                                    return <div></div>;
                            }
                        })}
                    </div>
                </IonContent>
            </IonPage>
        );
    }
}


export default Adviser;