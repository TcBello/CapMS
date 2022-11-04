import { IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonPage } from "@ionic/react";
import { add } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import ContentHeader from "../../core/components/ContentHeader";
import { MobileMenuAppBar } from "../../core/components/Mobile-Appbar";
import UserModel from "../../core/models/user_model";
import { getAllStudents } from "../../core/services/admin_service";
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

    const [students, setStudents] = useState<UserModel[]>([]);

    useEffect(() => {
        getAllStudents().then((value) => {
            setStudents(value as UserModel[]);
        });
    });

    return <IonPage>
        {/* CONTENT HEADER */}
        {
            isDesktop
                ? <ContentHeader title="Students" />
                : <MobileMenuAppBar title="Students" />
        }
        <IonContent className={isDesktop ? "student-content" : "student-content-mobile"}>
            {/* STUDENT CARD */}
            <div className={isDesktop ? "student-container" : "student-container-mobile"}>
                {students.map((student, index) => {
                    return <StudentCard
                        image={sampleData[0].image}
                        name={student.firstName + " " + student.lastName}
                        href="/"
                    />
                })}
            </div>
            {/* FAB BUTTON */}
            <IonFab vertical="bottom" horizontal="end" slot="fixed" className="student-fab-button">
                <IonFabButton href="/home/admin/students/add">
                    <IonIcon icon={add} className="icon"/>  
                </IonFabButton>
            </IonFab>
        </IonContent>
    </IonPage>;
}

export default Student;