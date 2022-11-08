import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

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
import Login from './pages/login/Login';
import ProjectFile from './pages/project-file/Project-File';
import ProposeTopic from './pages/propose-topic/Propose-Topic';
import { SplitView, SplitViewAdmin, SplitViewFaculty } from './pages/split-view/Split-View';
import { Adviser } from './pages/adviser/Adviser';
import AddAccount from './pages/add-account/Add-Account';
import AddTeam from './pages/add-team/Add-Team';
import SelectStudent from './pages/select-student/Select-Student';

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
          <Route path="/split-view" exact={true} component={SplitView} />
          <Route path="/split-view-faculty" exact={true} component={SplitViewFaculty} />
          <Route path="/split-view-admin" exact={true} component={SplitViewAdmin} />
          <Route path="/home/student/:name" exact={true}>
            <Redirect to="/split-view"/>
          </Route>
          <Route path="/home/faculty/:name" exact={true}>
            <Redirect to="/split-view-faculty"/>
          </Route>
          <Route path="/home/admin/:name" exact={true}>
            <Redirect to="/split-view-admin"/>
          </Route>
          <Route path="/:name/files" component={ProjectFile}/>
          <Route path="/projects/propose-topic" component={ProposeTopic}/>
          <Route path="/projects/propose-topic/select-adviser/:number" component={Adviser}/>
          <Route path="/home/admin/:role/add" component={AddAccount} />
          <Route path="/home/admin/teams/add" component={AddTeam} />
          <Route path="/home/admin/teams/add/select-a-student/:memberNumber" component={SelectStudent} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
