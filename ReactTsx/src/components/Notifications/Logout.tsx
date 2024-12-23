import React from 'react';
import '../../assets/components/Notifications/Logout.css';

interface NotificationsProps {
    Logout: () => void;
    toogleNotification: () => void;
}

const Notification: React.FC<NotificationsProps> = ({Logout, toogleNotification}) => {

  return (
    <div className='notification-container'>
        <div className='notification'>
            <h1>Do you want to log out?</h1>
            <div className='chose'>
                <button className='no'
                        onClick={toogleNotification}>No</button>
                <button className='yes'
                        onClick={Logout}>Yes</button>
            </div>
        </div>
    </div>
  );
};

export default Notification;

