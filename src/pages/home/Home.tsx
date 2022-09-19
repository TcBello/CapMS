import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import Profile from '../profile/Profile';
import './Home.css';

const Home: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

  switch(name){
    // PROFILE PAGE
    case "profile":
      return <Profile />;
    // ADVISER PAGE
    case "advisers":
      return (
        <div>
          <h1>this is advisers</h1>
        </div>
      );
    // WORKBENCH PAGE
    case "workbench":
      return (
        <div>
          <h1>this is workbench</h1>
        </div>
      );
    // PROJECT PAGE
    case "projects":
      return (
        <div>
          <h1>this is projects</h1>
        </div>
      );
    // LOGOUT PAGE
    case "logout":
      return (
        <div>
          <h1>this is logout</h1>
        </div>
      );
    default:
      return(
        <div></div>
      );
  }
};

export default Home;
