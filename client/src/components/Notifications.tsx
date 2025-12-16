import React from 'react';
import { useNotification, type Notification } from '../context/NotificationContext';
import '../styles/Notifications.css';

const NotificationItem: React.FC<{ n: Notification; onClose: (id: string) => void }> = ({ n, onClose }) => {
  return (
    <div className={`notification ${n.type}`} role="alert">
      <div className="notification-message">{n.message}</div>
      <button className="notification-close" onClick={() => onClose(n.id)} aria-label="Close">
        ×
      </button>
    </div>
  );
};

const Notifications: React.FC = () => {
  const { notifications, removeNotification } = useNotification();

  if (!notifications.length) return null;

  return (
    <div className="notifications-container">
      {notifications.map((n) => (
        <NotificationItem key={n.id} n={n} onClose={removeNotification} />
      ))}
    </div>
  );
};

export default Notifications;