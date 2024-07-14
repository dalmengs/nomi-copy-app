import React, { useEffect, useState } from 'react';
import GetNotification from '../utils/GetNotification';
import NotificationContent from './NotificationContent';

function Notification() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        async function fetchNotifications() {
        const data = await GetNotification();
        setNotifications(data);
        }

        fetchNotifications();
    }, []);

    //^ 개행 문자 변환 
    const formatMessage = (message) => {
        return message.split('\n').map((str, index) => (
        <p key={index}>
            {str}
        </p>
        ));
    };

    return (
        <div className="-2 mb-4 rounded">
            {notifications.map((notification, index) => (
            <NotificationContent
                key={index}
                content={formatMessage(notification.content)}
                isOdd={index % 2 !== 0}
            />
            ))}
        </div>
    );
}

export default Notification;
