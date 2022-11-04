import { useCookies } from 'react-cookie';
import { useParams } from 'react-router';
import { logout } from '../../core/services/auth_service';
import { replacePage } from '../../core/Utils';
import { AdviserAdmin } from '../adviser/Adviser';
import Announcement from '../announcement/Announcement';
import Dashboard from '../dashboard/Dashboard';
import MyAdvisee from '../my-advisee/MyAdvisee';
import MyTeam from '../my-team/My-Team';
import Profile from '../profile/Profile';
import Project from '../project/Project';
import Student from '../student/Student';
import Team from '../team/Team';
import './Home.css';

const Home: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

  const [cookies, setCookie, removeCookie] = useCookies(['uid']);

  switch(name){
    case "announcements":
      return <Announcement />;
    // PROFILE PAGE
    case "profile":
      return <Profile />;
    // MY TEAM PAGE
    case "my-team":
     return <MyTeam />
    // PROJECT PAGE
    case "projects":
      return <Project />;
    // LOGOUT PAGE
    case "logout":
      logout().then(value => {
        removeCookie("uid");
        replacePage("/");
      });
      return <div></div>;
    default:
      return(
        <div></div>
      );
  }
};

const HomeFaculty: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

  const [cookies, setCookie, removeCookie] = useCookies(['uid']);

  switch(name){
    case "announcements":
      return <Announcement />;
    // PROFILE PAGE
    case "profile":
      return <Profile />;
    // MY TEAM PAGE
    case "my-advisees":
     return <MyAdvisee />
    // PROJECT PAGE
    case "projects":
      return <Project />;
    // LOGOUT PAGE
    case "logout":
      logout().then(value => {
        removeCookie("uid");
        replacePage("/");
      });
      return <div></div>;
    default:
      return(
        <div></div>
      );
  }
};

const HomeAdmin: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

  const [cookies, setCookie, removeCookie] = useCookies(['uid']);

  switch(name){
    // DASHBOARD PAGE
    case "dashboard":
      return <Dashboard />;
    // ANNOUNCEMENT PAGE
    case "announcements":
      return <Announcement />;
    // PROFILE PAGE
    case "profile":
      return <Profile />;
    // MY TEAM PAGE
    case "teams":
     return <Team />
    // STUDENT PAGE
    case "students":
      return <Student /> ;
    // FACULTY STAFF PAGE
    case "faculty-staffs":
      return <AdviserAdmin />;
    // LOGOUT PAGE
    case "logout":
      logout().then(value => {
        removeCookie("uid");
        replacePage("/");
      });
      return <div></div>;
    default:
      return(
        <div></div>
      );
  }
};

export {Home, HomeFaculty, HomeAdmin};
