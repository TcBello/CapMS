import { IonContent, IonPage } from "@ionic/react";
import { useEffect, useState } from "react";
import { MobileArrowBackAppBar } from "../../core/components/Mobile-Appbar";
import UserModel from "../../core/models/user_model";
import { getAllStudents } from "../../core/services/admin_service";
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
    const [students, setStudents] = useState<UserModel[]>([]);

    useEffect(() => {
        getAllStudents().then((value) => {
            setStudents(value as UserModel[]);
        });
    }, []);

    return <IonPage>
        {/* APP BAR */}
        <MobileArrowBackAppBar title="Select a Student" href="/home/admin/teams/add" />
        {/* CONTENT */}
        <IonContent>
            <div className="select-student-container">
                {/* SELECT STUDENT CARD */}
                {students.map((student, index) => {
                    return <SelectStudentCard
                        name={student.firstName + " " + student.lastName}
                        image={student.image} href=""
                    />;
                })}
            </div>
        </IonContent>
    </IonPage>
}

export default SelectStudent;