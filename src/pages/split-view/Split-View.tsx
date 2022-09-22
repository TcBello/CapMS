import { IonSplitPane, IonRouterOutlet, IonPage, IonApp } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Component } from "react";
import { Route, Redirect } from "react-router";
import Menu from "../../core/components/Menu";
import Home from "../home/Home";
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
                                <Redirect to="/home/profile" />
                            </Route>
                            <Route path="/home/:name" exact={true}>
                                <Home />
                            </Route>
                        </IonRouterOutlet>
                    </IonSplitPane>
                </IonReactRouter>
            </div>
        );
    }
}

export default SplitView;