import { IonSplitPane, IonRouterOutlet, IonPage, IonApp } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Component, useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router";
import Menu from "../../core/components/Menu";
import MenuAdmin from "../../core/components/MenuAdmin";
import MenuFaculty from "../../core/components/MenuFaculty";
import TeamModel from "../../core/models/team_model";
import UserModel from "../../core/models/user_model";
import { getMyTeam } from "../../core/services/user_service";
import { clearStorageData, getStorageData, removeStorageData, setStorageData } from "../../core/Utils";
import { Home, HomeAdmin, HomeFaculty } from "../home/Home";
import './Split-View.css';

class SplitView extends Component{
    componentDidMount(): void {
        const userStorageData = getStorageData("user");
        const userModel = (JSON.parse(userStorageData!)) as UserModel;
        const myTeamStorageData = getStorageData("my-team");

        removeStorageData("preffered-adviser");
        removeStorageData("project");

        getMyTeam(userModel.uid).then((value: any) => {
            const myTeamModel = value as TeamModel;

            if(myTeamStorageData == null){
                setStorageData("my-team", JSON.stringify(myTeamModel));
            }
        });
    }
    
    render(){
        return (
            <div>
                <IonReactRouter>
                    <IonSplitPane contentId="main" className="split-view">
                        <Menu />
                        <IonRouterOutlet id="main">
                            <Route path="/split-view" exact={true}>
                                <Redirect to="/home/student/announcements" />
                            </Route>
                            <Route path="/home/student/:name" exact={true}>
                                <Home />
                            </Route>
                        </IonRouterOutlet>
                    </IonSplitPane>
                </IonReactRouter>
            </div>
        );
    }
}

class SplitViewFaculty extends Component{
    render(){
        return (
            <div>
                <IonReactRouter>
                    <IonSplitPane contentId="main" className="split-view">
                        <MenuFaculty />
                        <IonRouterOutlet id="main">
                            <Route path="/split-view-faculty" exact={true}>
                                <Redirect to="/home/faculty/announcements" />
                            </Route>
                            <Route path="/home/faculty/:name" exact={true}>
                                <HomeFaculty />
                            </Route>
                        </IonRouterOutlet>
                    </IonSplitPane>
                </IonReactRouter>
            </div>
        );
    }
}

class SplitViewAdmin extends Component{

    componentDidMount(){
        removeStorageData("first-member");
        removeStorageData("second-member");
        removeStorageData("third-member");
        removeStorageData("student-profile");
        removeStorageData("faculty-profile");
        removeStorageData("team");
        removeStorageData("announcement");
    }
    
    render(){
        return (
            <div>
                <IonReactRouter>
                    <IonSplitPane contentId="main" className="split-view">
                        <MenuAdmin />
                        <IonRouterOutlet id="main">
                            <Route path="/split-view-admin" exact={true}>
                                <Redirect to="/home/admin/dashboard" />
                            </Route>
                            <Route path="/home/admin/:name" exact={true}>
                                <HomeAdmin />
                            </Route>
                        </IonRouterOutlet>
                    </IonSplitPane>
                </IonReactRouter>
            </div>
        );
    }
}

export {SplitView, SplitViewFaculty, SplitViewAdmin};