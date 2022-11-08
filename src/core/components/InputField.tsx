import { IonItem, IonLabel, IonInput } from "@ionic/react";
import { useMediaQuery } from "react-responsive";
import { webWidth } from "../Utils";
import "./InputField.css";

const InputField = (props: {title: string, useState: any, obscure: boolean}) => {
    const isDesktop = useMediaQuery({minWidth: webWidth});

    const [value, setValue] = props.useState;
    
    return <IonItem lines="none" className={isDesktop ? "input-field" : "input-field-mobile"}>
        <IonLabel position="floating">
            {props.title}
        </IonLabel>
        <IonInput value={value} type={props.obscure ? "password" : "text"} onIonChange={(e: any) => setValue(e.target.value)} />
    </IonItem>;
}

export default InputField;