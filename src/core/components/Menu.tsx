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

interface AppPage {
  url: string;
  icon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Announcements',
    url: '/home/announcements',
    icon: '/assets/icon/announcement.svg',
  },
  {
    title: 'Profile',
    url: '/home/profile',
    icon: person,
  },
  {
    title: 'My Team',
    url: '/home/advisers',
    icon: '/assets/icon/my-team.svg'
  },
  {
    title: 'Projects',
    url: '/home/projects',
    icon: '/assets/icon/project-icon.svg'
  },
  {
    title: 'Logout',
    url: '/home/logout',
    icon: logOut
  }
];

const labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="push">
      <IonContent>
        <IonList id="inbox-list" lines='none'>
          <div className='center'>
            {/* PROFILE IMAGE */}
            <div className='profile-image' />
            {/* NAME */}
            <div className='name'>Sum Ting Wong</div>
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

        {/* <IonList id="labels-list">
          <IonListHeader>Labels</IonListHeader>
          {labels.map((label, index) => (
            <IonItem lines="none" key={index}>
              <IonIcon slot="start" icon={bookmarkOutline} />
              <IonLabel>{label}</IonLabel>
            </IonItem>
          ))}
        </IonList> */}
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
