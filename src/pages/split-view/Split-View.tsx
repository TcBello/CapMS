import { IonSplitPane, IonRouterOutlet, IonPage, IonApp } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Component } from "react";
import { Route, Redirect } from "react-router";
import Menu from "../../core/components/Menu";
import MenuAdmin from "../../core/components/MenuAdmin";
import MenuFaculty from "../../core/components/MenuFaculty";
import { Home, HomeAdmin } from "../home/Home";
import './Split-View.css';

class SplitView extends Component{
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

class SplitViewAdviser extends Component{
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
                                <Home />
                            </Route>
                        </IonRouterOutlet>
                    </IonSplitPane>
                </IonReactRouter>
            </div>
        );
    }
}

class SplitViewAdmin extends Component{
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

export {SplitView, SplitViewAdviser, SplitViewAdmin};