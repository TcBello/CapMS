import { IonCard} from "@ionic/react";
import { useHistory} from "react-router-dom";

const UnavailableCard = (props: any) => {
    let history = useHistory();

    function goBack(){
        history.replace(props.href);
    }

    return <IonCard className="item-card" button onClick={goBack}>
        {/* STATUS COLOR */}
        <div className="status-color-unavailable" />
        {/* ADVISER IMAGE */}
        <img src={props.image} />
        {/* ADVISER NAME */}
        <h6 className="name">{props.name}</h6>
    </IonCard>;
}

export default UnavailableCard;