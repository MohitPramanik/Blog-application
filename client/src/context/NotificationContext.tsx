import React, { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export type NotificationTarget =
  | { kind: 'blog'; id: string }
  | { kind: 'profile'; id: string };

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  timeout?: number; // ms, 0 means sticky
  target?: NotificationTarget;
  createdAt?: number;
}

interface NotificationContextValue {
  notifications: Notification[];
  notify: (
    type: NotificationType,
    message: string,
    timeoutOrOptions?: number | { timeout?: number; target?: NotificationTarget },
  ) => string;
  removeNotification: (id: string) => void;
  clearAll: () => void;
  fetchOlder: (count?: number) => Promise<void>;
}

const NotificationContext = createContext<NotificationContextValue | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const notify = useCallback(
    (type: NotificationType, message: string, timeoutOrOptions: number | { timeout?: number; target?: NotificationTarget } = 5000) => {
      let timeout: number | undefined = 5000;
      let target: NotificationTarget | undefined;

      if (typeof timeoutOrOptions === 'number') timeout = timeoutOrOptions;
      else {
        timeout = timeoutOrOptions.timeout ?? 5000;
        target = timeoutOrOptions.target;
      }

      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      const n: Notification = { id, type, message, timeout, target, createdAt: Date.now() };
      setNotifications((prev) => [n, ...prev]);

      if (timeout && timeout > 0) {
        setTimeout(() => removeNotification(id), timeout);
      }

      return id;
    },
    [removeNotification],
  );

  const clearAll = useCallback(() => setNotifications([]), []);

  // Simulate fetching older notifications from server by generating mock items
  const fetchOlder = useCallback(async (count = 10) => {
    // fake network delay
    await new Promise((res) => setTimeout(res, 600));
    const older: Notification[] = Array.from({ length: count }).map((_, i) => {
      const id = `old-${Date.now()}-${Math.random().toString(36).slice(2, 6)}-${i}`;
      const kind: NotificationTarget['kind'] = Math.random() > 0.5 ? 'blog' : 'profile';
      const target: NotificationTarget = kind === 'blog' ? { kind: 'blog', id: `${Math.floor(Math.random() * 1000) + 1}` } : { kind: 'profile', id: `${Math.floor(Math.random() * 100) + 1}` };
      const types: NotificationType[] = ['info', 'success', 'warning', 'error'];
      return {
        id,
        type: types[Math.floor(Math.random() * types.length)],
        message: `Old notification ${i + 1}`,
        timeout: 0,
        target,
        createdAt: Date.now() - (i + 1) * 1000 * 60,
      };
    });

    setNotifications((prev) => [...prev, ...older]);
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, notify, removeNotification, clearAll, fetchOlder }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextValue => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotification must be used within a NotificationProvider');
  return ctx;
};

export default NotificationProvider;