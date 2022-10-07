import { IonBackButton, IonButton, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonItem, IonLabel, IonPage } from "@ionic/react";
import { Component } from "react";
import "./Project-File.css";
import "../../core/components/Spacer.css";
import { add, arrowBack, document } from "ionicons/icons";
import { MobileArrowBackAppBar } from "../../core/components/Mobile-Appbar";

interface FilesData{
    name: string,
    gDocsLink: string
};

const sampleData: FilesData[] = [
    {
        name: "Abstract Form",
        gDocsLink: "https://docs.google.com/document/d/1YvFSbvS1icW8goiYBpFthwyagygjYU9UZB6bEhFJk_g/edit"
    },
    {
        name: "Chapter 1",
        gDocsLink: "https://docs.google.com/document/d/1YvFSbvS1icW8goiYBpFthwyagygjYU9UZB6bEhFJk_g/edit"
    },
    {
        name: "Chapter 2",
        gDocsLink: "https://docs.google.com/document/d/1YvFSbvS1icW8goiYBpFthwyagygjYU9UZB6bEhFJk_g/edit"
    }
];

class ProjectFile extends Component<{match: any},{}>{
    render(){
        const title: string = `${this.props.match.params.name}'s Files`;
        
        return (
            <IonPage>
                {/* APPBAR */}
                <MobileArrowBackAppBar title={title} href="/split-view" />
                {/* CONTENT */}
                <IonContent>
                    {/* FILE ITEMS */}
                    {sampleData.map((file, index) => {
                        return <IonItem lines="none" href={file.gDocsLink}>
                            <IonIcon icon={document} slot="start"/>
                            <IonLabel>{file.name}</IonLabel>
                        </IonItem>
                    })}
                    {/* ADD FILE BUTTON */}
                    <IonFab vertical="bottom" horizontal="end" slot="fixed">
                        <IonFabButton>
                            <IonIcon icon={add} className="project-file-add-button-icon"/>
                        </IonFabButton>
                    </IonFab>
                </IonContent>
            </IonPage>
        );
    }
}

export default ProjectFile;