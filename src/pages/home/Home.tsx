import { useParams } from 'react-router';
import { AdviserAdmin } from '../adviser/Adviser';
import Announcement from '../announcement/Announcement';
import MyAdvisee from '../my-advisee/MyAdvisee';
import MyTeam from '../my-team/My-Team';
import Profile from '../profile/Profile';
import Project from '../project/Project';
import Student from '../student/Student';
import Team from '../team/Team';
import './Home.css';

const Home: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

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

const HomeFaculty: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

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

const HomeAdmin: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

  switch(name){
    // DASHBOARD PAGE
    case "dashboard":
      return <div></div>;
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

export {Home, HomeFaculty, HomeAdmin};
