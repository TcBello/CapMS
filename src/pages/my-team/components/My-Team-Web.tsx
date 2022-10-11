import { IonPage } from "@ionic/react";
import ContentHeader from "../../../core/components/ContentHeader";
import MediaQuery from "react-responsive";
import { webWidth } from "../../../core/Utils";
import { MyTeamAdviserItem, MyTeamMemberItem } from "./My-Team-Member-Item";

interface MyTeamModel{
    image: string,
    name: string,
    role: string
}

const sampleData: MyTeamModel[] = [
    {
        image: "https://media.istockphoto.com/photos/mean-female-teacher-holding-ruler-and-pointing-her-finger-picture-id118969824?k=20&m=118969824&s=612x612&w=0&h=oc33oWXzSkXM7ohx3EaYe-MXnZPZQQbV05PV53tiQxE=",
        name: "Fa Kin Su Pah",
        role: "Adviser"
    },
    {
        image: "https://www.biowritingservice.com/wp-content/themes/tuborg/images/Executive%20Bio%20Sample%20Photo.png",
        name: "Sum Ting Wong",
        role: "Student"
    },
    {
        image: "https://www.eyeployment.com/wp-content/uploads/2018/01/ts_report1.jpg",
        name: "Yu Stin Ki Pu",
        role: "Student"
    },
    {
        image: "https://www.crucial.com.au/wp-content/uploads/2014/07/example-person.png",
        name: "Dum Fuk",
        role: "Student"
    },
];

const MyTeamWeb = (props: any) => {
    return (
        <MediaQuery minWidth={webWidth}>
            <IonPage>
                {/* CONTENT HEADER */}
                <ContentHeader title="My Team" />
                <div className="my-team-container">
                    <div className="spacer-h-l" />
                    {/* ADVISER */}
                    {sampleData.map((member, index) => {
                        if(member.role == "Adviser"){
                            return <MyTeamAdviserItem image={member.image} name={member.name} role={member.role} />;
                        }

                        return <div className="my-team-student-container"></div>;
                    })}
                    <div className="spacer-h-l" />
                    {/* STUDENT */}
                    <div className="my-team-student-container">
                        {sampleData.map((member, index) => {
                            if(member.role == "Student"){
                                return <MyTeamMemberItem image={member.image} name={member.name} role={member.role} />;
                            }

                            return <div></div>;
                        })}
                    </div>
                </div>
            </IonPage>
        </MediaQuery>
    );
};

export default MyTeamWeb;