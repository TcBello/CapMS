import { IonContent, IonPage } from "@ionic/react";
import { useEffect, useState } from "react";
import { MobileArrowBackAppBar } from "../../core/components/Mobile-Appbar";
import UserModel from "../../core/models/user_model";
import { getAllStudents } from "../../core/services/admin_service";
import SelectStudentCard from "./component/Select-Student-Card";
import "./Select-Student.css";
import "../../core/components/Spacer.css";
import { replacePage, setStorageData } from "../../core/Utils";

const SelectStudent = (props: any) => {
    const [students, setStudents] = useState<UserModel[]>([]);

    const memberNumber = props.match.params.memberNumber;

    useEffect(() => {
        getAllStudents().then((value) => {
            setStudents(value as UserModel[]);
        });
    }, []);

    function selectStudent(student: UserModel){
        if(memberNumber == "first-member"){
            setStorageData('first-member', JSON.stringify(student));
            replacePage("/home/admin/teams/add");
        }
        if(memberNumber == "second-member"){
            setStorageData('second-member', JSON.stringify(student));
            replacePage("/home/admin/teams/add");
        }
        if(memberNumber == "third-member"){
            setStorageData('third-member', JSON.stringify(student));
            replacePage("/home/admin/teams/add");
        }
    }

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
                        image={student.image}
                        onClick={() => selectStudent(student)}
                    />;
                })}
            </div>
        </IonContent>
    </IonPage>
}

export default SelectStudent;