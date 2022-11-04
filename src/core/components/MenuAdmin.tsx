import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { archiveOutline, archiveSharp, bookmarkOutline, document, heartOutline, heartSharp, logOut, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, person, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';
import './Menu.css';
import '../../core/components/Spacer.css';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { initUser } from '../services/auth_service';

interface AppPage {
  url: string;
  icon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Dashboard',
    url: '/home/admin/dashboard',
    icon: '/assets/icon/dashboard.svg',
  },
  {
    title: 'Announcements',
    url: '/home/admin/announcements',
    icon: '/assets/icon/announcement.svg',
  },
  {
    title: 'Profile',
    url: '/home/admin/profile',
    icon: person,
  },
  {
    title: 'Teams',
    url: '/home/admin/teams',
    icon: '/assets/icon/my-team.svg'
  },
  {
    title: 'Students',
    url: '/home/admin/students',
    icon: '/assets/icon/student.svg'
  },
  {
    title: 'Faculty Staffs',
    url: '/home/admin/faculty-staffs',
    icon: '/assets/icon/faculty.svg'
  },
  {
    title: 'Logout',
    url: '/home/admin/logout',
    icon: logOut
  }
];

const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

const MenuAdmin: React.FC = () => {
  const location = useLocation();

  const [cookies, setCookie, removeCookie] = useCookies(['uid']);

  const dispatch = useDispatch();

  useEffect(() => {
    initUser(dispatch, cookies.uid);
  }, []);

  return (
    <IonMenu contentId="main" type="push">
      <IonContent>
        <IonList id="inbox-list" lines='none'>
          <div className='center'>
            {/* PROFILE IMAGE */}
            <div className='profile-image' />
            {/* NAME */}
            <div className='name'>Admin</div>
          </div>
          <div className='spacer-h-m'/>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot='start' src={appPage.icon}/>
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default MenuAdmin;
