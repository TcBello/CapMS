
import { Component, useEffect, useState} from "react";
import { IonContent, IonFab, IonFabButton, IonIcon, IonPage } from '@ionic/react';
import './Adviser.css';
import { MobileArrowBackAppBar, MobileMenuAppBar } from "../../core/components/Mobile-Appbar";
import AvailableCard from "./components/AvailableCard";
import UnavailableCard from "./components/UnavailableCard";
import { add } from "ionicons/icons";
import ContentHeader from "../../core/components/ContentHeader";
import { useMediaQuery } from "react-responsive";
import { goPage, setStorageData, webWidth } from "../../core/Utils";
import UserModel from "../../core/models/user_model";
import { getAllFaculties, getAllStudents } from "../../core/services/admin_service";

interface AdviserModel{
    image: string,
    name: string,
    status: string,
    course: string
}

const sampleData: AdviserModel[] = [
    {
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7kIQYr1SywpoSYppX-aC8pbvHqjNlnr2CDA&usqp=CAU",
        name: "Sum Ting Wongasdd",
        status: "available",
        course: "BSIT"
    },
    {
        image: "https://www.biowritingservice.com/wp-content/themes/tuborg/images/Executive%20Bio%20Sample%20Photo.png",
        name: "Sum Ting Wong",
        status: "unavailable",
        course: "BSIT"
    },
    {
        image: "https://www.biowritingservice.com/wp-content/themes/tuborg/images/Executive%20Bio%20Sample%20Photo.png",
        name: "Sum Ting Wong",
        status: "available",
        course: "BSIT"
    },
    {
        image: "https://www.biowritingservice.com/wp-content/themes/tuborg/images/Executive%20Bio%20Sample%20Photo.png",
        name: "Sum Ting Wong",
        status: "unavailable",
        course: "BSIT"
    },
    {
        image: "https://www.biowritingservice.com/wp-content/themes/tuborg/images/Executive%20Bio%20Sample%20Photo.png",
        name: "Sum Ting Wong",
        status: "available",
        course: "BSIT"
    },
    {
        image: "https://www.biowritingservice.com/wp-content/themes/tuborg/images/Executive%20Bio%20Sample%20Photo.png",
        name: "Sum Ting Wong",
        status: "unavailable",
        course: "BSIT"
    },
    {
        image: "https://www.biowritingservice.com/wp-content/themes/tuborg/images/Executive%20Bio%20Sample%20Photo.png",
        name: "Sum Ting Wong",
        status: "available",
        course: "BSIT"
    },
    {
        image: "https://www.biowritingservice.com/wp-content/themes/tuborg/images/Executive%20Bio%20Sample%20Photo.png",
        name: "Sum Ting Wong",
        status: "unavailable",
        course: "BSIT"
    },
    {
        image: "https://www.biowritingservice.com/wp-content/themes/tuborg/images/Executive%20Bio%20Sample%20Photo.png",
        name: "Sum Ting Wong",
        status: "available",
        course: "BSIT"
    },
    {
        image: "https://www.biowritingservice.com/wp-content/themes/tuborg/images/Executive%20Bio%20Sample%20Photo.png",
        name: "Sum Ting Wong",
        status: "unavailable",
        course: "BSIT"
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
                                // case "available":
                                //     return <AvailableCard name={adviser.name} course={adviser.course} image={adviser.image} href="/projects/propose-topic"/>;
                                // case "unavailable":
                                //     return <UnavailableCard name={adviser.name} course={adviser.course} image={adviser.image} href="/projects/propose-topic"/>;
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

const AdviserAdmin = () => {
    const isDesktop = useMediaQuery({minWidth: webWidth});

    const [faculties, setFaculties] = useState<UserModel[]>([]);

    useEffect(() => {
        getAllFaculties().then((value: any) => {
            setFaculties(value as UserModel[]);
        });
    }, []);

    function onClickFaculty(userModel: UserModel){
        setStorageData("faculty-profile", JSON.stringify(userModel));
        goPage("/home/admin/faculty-staffs/profile");
    }

    
    return (
        <IonPage>
            {/* CONTENT HEADER */}
            {
                isDesktop
                    ? <ContentHeader title="Faculty Staffs" />
                    : <MobileMenuAppBar title="Faculty Staffs" />
            }
            <IonContent className={isDesktop ? "adviser-content" : "adviser-content-mobile"}>
                <div className="adviser-container">
                    {faculties.map((faculty, index) => {
                        switch(faculty.status){
                            case "Available":
                                return <AvailableCard
                                    userModel={faculty}
                                    onClick={() => onClickFaculty(faculty)}
                                />;
                            case "Unavailable":
                                return <UnavailableCard
                                    userModel={faculty}
                                    onClick={() => onClickFaculty(faculty)}
                                />;
                            default:
                                return <div></div>;
                        }
                    })}
                </div>
                <IonFab vertical="bottom" horizontal="end" slot="fixed" className="adviser-fab-button">
                    <IonFabButton href="/home/admin/faculty-staffs/add">
                        <IonIcon icon={add} className="icon"/>
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    );
}


export {Adviser, AdviserAdmin};