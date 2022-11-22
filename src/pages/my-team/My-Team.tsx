import { IonContent, IonPage } from "@ionic/react";
import "./My-Team.css";
import "../../core/components/Spacer.css";
import ContentHeader from "../../core/components/ContentHeader";
import { MyTeamAdviserItem, MyTeamMemberItem } from "./components/My-Team-Member-Item";
import { useMediaQuery } from "react-responsive";
import { getStorageData, webWidth } from "../../core/Utils";
import { MobileMenuAppBar } from "../../core/components/Mobile-Appbar";
import { useEffect, useState } from "react";
import TeamModel, { setTeamModel } from "../../core/models/team_model";
import { getMyTeam } from "../../core/services/user_service";
import { getStorage } from "firebase/storage";
import UserModel from "../../core/models/user_model";

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

const MyTeam = () => {
    const isDesktop = useMediaQuery({minWidth: webWidth});
    const [myTeam, setMyTeam] = useState(setTeamModel({}));

    const storageData = getStorageData("user");
    const userModel = (JSON.parse(storageData!)) as UserModel;

    useEffect(() => {
        getMyTeam(userModel.uid, userModel).then((value: any) => {
            setMyTeam(value as TeamModel);
        });
    }, []);

    return <IonPage>
    {/* CONTENT HEADER */}
    {
        isDesktop
            ? <ContentHeader title="My Team" />
            : <MobileMenuAppBar title="My Team" />
    }
    <IonContent>
        {
            isDesktop
                ? <div className="my-team-container">
                    <div className="spacer-h-l" />
                    {/* ADVISER */}
                    {myTeam.members.map((member, index) => {
                        if(member.role == "Adviser"){
                            return <MyTeamAdviserItem image={member.image} name={member.firstName + " " + member.lastName} role={member.role} />;
                        }
        
                        return <div className="my-team-student-container"></div>;
                    })}
                    <div className="spacer-h-l" />
                    {/* STUDENT */}
                    <div className="my-team-student-container">
                        {myTeam.members.map((member, index) => {
                            if(member.role == "Student"){
                                return <MyTeamMemberItem image={member.image} name={member.firstName + " " + member.lastName} role={member.role} />;
                            }
        
                            return <div></div>;
                        })}
                    </div>
                </div>
                : <div>
                    {myTeam.members.map((member, index) => {
                        return <div>
                            <div className="spacer-h-m" />
                            <MyTeamAdviserItem image={member.image} name={member.firstName + " " + member.lastName} role={member.role} />
                            <div className="spacer-h-xs" />
                        </div>;
                    })}
                </div>
        }
    </IonContent>
</IonPage>;
}

export default MyTeam;