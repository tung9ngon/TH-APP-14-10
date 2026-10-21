import { createContext, useContext, useState, type ReactNode } from 'react';
import { ACCOUNTS, USERS, CONVERSATIONS, NOTIFICATIONS } from '../data/mockData';
import type { Account, Conversation, Notification, User } from '../types';

type AppContextValue = {
  user: Account | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  users: User[];
  getUser: (id: string) => User;
  conversations: Conversation[];
  openConversationWith: (userId: string) => string;
  markConversationRead: (id: string) => void;
  sendMessage: (id: string, text: string) => void;
  notifications: Notification[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
};

const AppContext = createContext<AppContextValue | null>(null);

const nowTime = () => {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Account | null>(null);
  const [conversations, setConversations] = useState(CONVERSATIONS);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const login = (username: string, password: string) => {
    const account = ACCOUNTS.find((a) => a.username === username && a.password === password);
    if (account) setUser(account);
    return Boolean(account);
  };

  const logout = () => setUser(null);

  // Mọi userId trong dữ liệu mẫu đều có trong USERS.
  const getUser = (id: string) => USERS.find((u) => u.id === id) as User;

  // Mở cuộc trò chuyện với một người trong danh bạ; chưa có thì tạo mới.
  const openConversationWith = (userId: string) => {
    const existing = conversations.find((c) => c.userId === userId);
    if (existing) return existing.id;
    const conversation: Conversation = { id: `c${Date.now()}`, userId, unread: 0, messages: [] };
    setConversations((prev) => [conversation, ...prev]);
    return conversation.id;
  };

  const markConversationRead = (id: string) =>
    setConversations((prev) => prev.map((c) => (c.id === id ? { ...c, unread: 0 } : c)));

  const sendMessage = (id: string, text: string) =>
    setConversations((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, messages: [...c.messages, { id: `m${Date.now()}`, fromMe: true, text, time: nowTime() }] }
          : c
      )
    );

  const markNotificationRead = (id: string) =>
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));

  const markAllNotificationsRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        logout,
        users: USERS,
        getUser,
        conversations,
        openConversationWith,
        markConversationRead,
        sendMessage,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// AppProvider bọc toàn bộ app (App.tsx) nên context luôn có giá trị.
export const useApp = () => useContext(AppContext) as AppContextValue;
