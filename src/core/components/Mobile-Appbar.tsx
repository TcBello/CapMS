import { IonButton, IonHeader, IonIcon, IonMenuButton } from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import { Component } from "react";
import "./Mobile-Appbar.css";

class MobileMenuAppBar extends Component<{title: string},{}>{
    constructor(props: any){
        super(props);
    }

    render(){
        return (
            <div>
                {/* APPBAR */}
                <IonHeader className="mobile-appbar">
                    {/* MENU BUTTON */}
                    <IonMenuButton className="menu-button"></IonMenuButton>
                    <div className="spacer-w-xs"/>
                    {/* PROFILE HEADER */}
                    <h6 className="header">{this.props.title}</h6>
                </IonHeader>
            </div>
        );
    }
}

class MobileArrowBackAppBar extends Component<{title: string, href: string},{}>{
    constructor(props: any){
        super(props);
    }

    render(){
        return (
            <div>
                {/* APPBAR */}
                <IonHeader className="mobile-appbar">
                    {/* MENU BUTTON */}
                    <IonButton href={this.props.href} fill="clear">
                        <IonIcon icon={arrowBack} className="back-button-icon"/>
                    </IonButton>
                    <div className="spacer-w-xs"/>
                    {/* PROFILE HEADER */}
                    <h6 className="header">{this.props.title}</h6>
                </IonHeader>
            </div>
        );
    }
}

export {MobileMenuAppBar, MobileArrowBackAppBar};