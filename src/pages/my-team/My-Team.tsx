import { IonContent, IonPage } from "@ionic/react";
import "./My-Team.css";
import "../../core/components/Spacer.css";
import ContentHeader from "../../core/components/ContentHeader";
import { MyTeamAdviserItem, MyTeamMemberItem } from "./components/My-Team-Member-Item";
import { useMediaQuery } from "react-responsive";
import { getStorageData, setStorageData, webWidth } from "../../core/Utils";
import { MobileMenuAppBar } from "../../core/components/Mobile-Appbar";
import { useEffect, useState } from "react";
import TeamModel, { setTeamModel } from "../../core/models/team_model";
import { getMyTeam } from "../../core/services/user_service";
import { getStorage } from "firebase/storage";
import UserModel from "../../core/models/user_model";

const MyTeam = () => {
    const isDesktop = useMediaQuery({minWidth: webWidth});
    const [myTeam, setMyTeam] = useState(setTeamModel({}));

    const storageData = getStorageData("user");
    const userModel = (JSON.parse(storageData!)) as UserModel;

    useEffect(() => {
        getMyTeam(userModel.uid).then((value: any) => {
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