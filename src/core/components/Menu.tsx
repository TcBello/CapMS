import {
  IonAvatar,
  IonContent,
  IonIcon,
  IonImg,
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
import { useDispatch, useSelector } from 'react-redux';
import UserModel from '../models/user_model';
import { useEffect, useLayoutEffect } from 'react';
import { debug } from 'console';
import { authenticate, initUser } from '../services/auth_service';
import { getStorageData } from '../Utils';

interface AppPage {
  url: string;
  icon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Announcements',
    url: '/home/student/announcements',
    icon: '/assets/icon/announcement.svg',
  },
  {
    title: 'Profile',
    url: '/home/student/profile',
    icon: person,
  },
  {
    title: 'My Team',
    url: '/home/student/my-team',
    icon: '/assets/icon/my-team.svg'
  },
  {
    title: 'Projects',
    url: '/home/student/projects',
    icon: '/assets/icon/project-icon.svg'
  },
  {
    title: 'Logout',
    url: '/home/student/logout',
    icon: logOut
  }
];

const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

const Menu: React.FC = () => {
  const location = useLocation();

  const user = useSelector((state: any) => state.user.value as UserModel);

  const dispatch = useDispatch();

  const userData = getStorageData("user");
  const userModel = (JSON.parse(userData!)) as UserModel;

  useEffect(() => {
    initUser(dispatch, userModel.uid);
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
            <div className='name'>{user.firstName}  {user.lastName}</div>
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

export default Menu;
