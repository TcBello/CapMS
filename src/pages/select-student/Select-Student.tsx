import { IonContent, IonPage } from "@ionic/react";
import { MobileArrowBackAppBar } from "../../core/components/Mobile-Appbar";
import SelectStudentCard from "./component/Select-Student-Card";
import "./Select-Student.css";

interface StudentModel{
    name: string,
    image: string
}

const sampleData: StudentModel[] = [
    {
        name: "Sum Ting Wong",
        image: "https://www.biowritingservice.com/wp-content/themes/tuborg/images/Executive%20Bio%20Sample%20Photo.png"
    },
    {
        name: "Sum Ting Wong",
        image: "https://www.biowritingservice.com/wp-content/themes/tuborg/images/Executive%20Bio%20Sample%20Photo.png"
    },
    {
        name: "Sum Ting Wong",
        image: "https://www.biowritingservice.com/wp-content/themes/tuborg/images/Executive%20Bio%20Sample%20Photo.png"
    },
    {
        name: "Sum Ting Wong",
        image: "https://www.biowritingservice.com/wp-content/themes/tuborg/images/Executive%20Bio%20Sample%20Photo.png"
    },
    {
        name: "Sum Ting Wong",
        image: "https://www.biowritingservice.com/wp-content/themes/tuborg/images/Executive%20Bio%20Sample%20Photo.png"
    },
    {
        name: "Sum Ting Wong",
        image: "https://www.biowritingservice.com/wp-content/themes/tuborg/images/Executive%20Bio%20Sample%20Photo.png"
    },
    {
        name: "Sum Ting Wong",
        image: "https://www.biowritingservice.com/wp-content/themes/tuborg/images/Executive%20Bio%20Sample%20Photo.png"
    }
];

const SelectStudent = () => {
    return <IonPage>
        {/* APP BAR */}
        <MobileArrowBackAppBar title="Select a Student" href="/home/admin/teams/add" />
        {/* CONTENT */}
        <IonContent>
            <div className="select-student-container">
                {/* SELECT STUDENT CARD */}
                {sampleData.map((student, index) => {
                    return <SelectStudentCard name={student.name} image={student.image} href=""/>;
                })}
            </div>
        </IonContent>
    </IonPage>
}

export default SelectStudent;