import {
  IonAvatar,
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
import { useSelector, useDispatch } from 'react-redux';
import UserModel from '../models/user_model';
import { initUser } from '../services/auth_service';

interface AppPage {
  url: string;
  icon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Announcements',
    url: '/home/faculty/announcements',
    icon: '/assets/icon/announcement.svg',
  },
  {
    title: 'Profile',
    url: '/home/faculty/profile',
    icon: person,
  },
  {
    title: 'My Advisees',
    url: '/home/faculty/my-advisees',
    icon: '/assets/icon/my-team.svg'
  },
  {
    title: 'Projects',
    url: '/home/faculty/projects',
    icon: '/assets/icon/project-icon.svg'
  },
  {
    title: 'Logout',
    url: '/home/faculty/logout',
    icon: logOut
  }
];

const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

const MenuFaculty: React.FC = () => {
  const location = useLocation();

  const user = useSelector((state: any) => state.user.value as UserModel);

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
            <IonAvatar className="profile-image">
              <img src={user.image}/>
            </IonAvatar>
            <div className='spacer-h-s' />
            {/* NAME */}
            <div className='name'>{user.firstName} {user.lastName}</div>
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

export default MenuFaculty;
