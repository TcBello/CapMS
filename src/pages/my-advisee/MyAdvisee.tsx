import { IonContent, IonLabel, IonPage } from "@ionic/react";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import ContentHeader from "../../core/components/ContentHeader";
import { MobileMenuAppBar } from "../../core/components/Mobile-Appbar";
import TeamModel from "../../core/models/team_model";
import UserModel from "../../core/models/user_model";
import { getAdvisees } from "../../core/services/user_service";
import { getStorageData, goPage, setStorageData, webWidth } from "../../core/Utils";
import AdviseeCard from "./components/AdviseeCard";
import "./MyAdvisee.css";

const MyAdvisee = () => {
    const isDesktop = useMediaQuery({minWidth: webWidth});
    const [advisees, setAdvisees] = useState<TeamModel[]>([]);

    const userStorageData = getStorageData("user");
    const userModel = (JSON.parse(userStorageData!)) as UserModel;

    function selectAdvisee(teamModel: TeamModel){
        setStorageData("advisee", JSON.stringify(teamModel));
        goPage("/home/faculty/my-advisees/profile");
    }

    useEffect(() => {
        getAdvisees(userModel.uid).then((value: any) => {
            setAdvisees(value as TeamModel[]);
        });
    }, []);

    return <IonPage>
        {/* CONTENT HEADER */}
        {
            isDesktop
                ? <ContentHeader title="My Advisees" />
                : <MobileMenuAppBar title="My Advisees" />
        }
        {/* CONTENT */}
        <IonContent className={isDesktop ? "my-advisee-content" : "my-advisee-content-mobile"}>
            <div className={isDesktop ? "my-advisee-container" : "my-advisee-container-mobile"}>
                {/* ADVISEE CARD */}
                
                {advisees.map((advisee, index) => {
                    return <AdviseeCard teamModel={advisee} onClick={() => {selectAdvisee(advisee)}}/>;
                })}
            </div>
        </IonContent>
    </IonPage>;
}

export default MyAdvisee;