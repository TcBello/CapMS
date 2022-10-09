import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Page from './pages/home/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import SplitView from './pages/split-view/Split-View';
import Test from './pages/test';
import ProjectFile from './pages/project-file/Project-File';
import ProposeTopic from './pages/propose-topic/Propose-Topic';
import Adviser from './pages/adviser/Adviser';

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/" exact>
            <Redirect to="/login"/>
          </Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/split-view" exact={true} component={SplitView}></Route>
          <Route path="/test" exact={true} component={Test}></Route>
          <Route path="/home/:name" exact={true}>
            <Redirect to="/split-view"/>
          </Route>
          <Route path="/:name/files" component={ProjectFile}/>
          <Route path="/projects/propose-topic" component={ProposeTopic}/>
          <Route path="/projects/propose-topic/select-adviser/:number" component={Adviser}/>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
