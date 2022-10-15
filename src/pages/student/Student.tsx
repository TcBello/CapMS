import { IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonPage } from "@ionic/react";
import { add } from "ionicons/icons";
import { useMediaQuery } from "react-responsive";
import ContentHeader from "../../core/components/ContentHeader";
import { MobileMenuAppBar } from "../../core/components/Mobile-Appbar";
import { webWidth } from "../../core/Utils";
import StudentCard from "./components/StudentCard";
import "./Student.css";

interface StudentModel{
    image: string,
    name: string
}

const sampleData: StudentModel[] = [
    {
        image: "https://www.biowritingservice.com/wp-content/themes/tuborg/images/Executive%20Bio%20Sample%20Photo.png",
        name: "Sum Ting Wongasdjaskdjhaskjdh"
    },
    {
        image: "https://www.biowritingservice.com/wp-content/themes/tuborg/images/Executive%20Bio%20Sample%20Photo.png",
        name: "Sum Ting Wong"
    },
    {
        image: "https://www.biowritingservice.com/wp-content/themes/tuborg/images/Executive%20Bio%20Sample%20Photo.png",
        name: "Sum Ting Wong"
    },
    {
        image: "https://www.biowritingservice.com/wp-content/themes/tuborg/images/Executive%20Bio%20Sample%20Photo.png",
        name: "Sum Ting Wong"
    },
    {
        image: "https://www.biowritingservice.com/wp-content/themes/tuborg/images/Executive%20Bio%20Sample%20Photo.png",
        name: "Sum Ting Wong"
    },
    {
        image: "https://www.biowritingservice.com/wp-content/themes/tuborg/images/Executive%20Bio%20Sample%20Photo.png",
        name: "Sum Ting Wong"
    }
];

const Student = () => {
    const isDesktop = useMediaQuery({minWidth: webWidth});

    return <IonPage>
        {/* CONTENT HEADER */}
        {
            isDesktop
                ? <ContentHeader title="Students" />
                : <MobileMenuAppBar title="Students" />
        }
        <div className={isDesktop ? "student-container" : "student-container-mobile"}>
            {sampleData.map((student, index) => {
                return <StudentCard image={student.image} name={student.name} href="/"/>
            })}
        </div>
        <IonContent className={isDesktop ? "student-content" : "student-content-mobile"}>
        <IonFab vertical="bottom" horizontal="end" slot="fixed" className="student-fab-button">
            <IonFabButton>
                <IonIcon icon={add} className="icon"/>
            </IonFabButton>
        </IonFab>
        </IonContent>
    </IonPage>;
}

export default Student;