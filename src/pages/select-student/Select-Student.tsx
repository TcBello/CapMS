import { IonContent, IonPage } from "@ionic/react";
import { useEffect, useState } from "react";
import { MobileArrowBackAppBar } from "../../core/components/Mobile-Appbar";
import UserModel from "../../core/models/user_model";
import { getAllStudents } from "../../core/services/admin_service";
import SelectStudentCard from "./component/Select-Student-Card";
import "./Select-Student.css";
import "../../core/components/Spacer.css";
import { useSelector } from "react-redux";
import { selectFirstMember, selectSecondMember, selectThirdMember } from "../../core/redux/slices/select-student-slice";
import { replacePage } from "../../core/Utils";

const SelectStudent = (props: any) => {
    const [students, setStudents] = useState<UserModel[]>([]);

    const memberNumber = props.match.params.memberNumber;

    const selectedStudents = useSelector((state: any) => state.selectStudent);

    useEffect(() => {
        getAllStudents().then((value) => {
            setStudents(value as UserModel[]);
        });
    }, []);

    function selectStudent(student: UserModel){
        if(memberNumber == "first-member"){
            selectFirstMember(student);
            // replacePage("/home/admin/teams/add");
            console.log(selectedStudents.firstMember);
        }
        if(memberNumber == "second-member"){
            selectSecondMember(student);
            replacePage("/home/admin/teams/add");
        }
        if(memberNumber == "third-member"){
            selectThirdMember(student);
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