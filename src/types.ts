import type { NavigatorScreenParams } from '@react-navigation/native';

export type Account = {
  username: string;
  password: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
};

export type User = {
  id: string;
  name: string;
  avatar: string;
  online: boolean;
};

export type Message = {
  id: string;
  fromMe: boolean;
  text: string;
  time: string;
};

export type Conversation = {
  id: string;
  userId: string;
  unread: number;
  messages: Message[];
};

export type Notification = {
  id: string;
  content: string;
  time: string;
  read: boolean;
};

export type MainTabParamList = {
  Home: undefined;
  Contacts: undefined;
  Notifications: undefined;
  Settings: undefined;
};

export type RootStackParamList = {
  Login: undefined;
  Main: NavigatorScreenParams<MainTabParamList>;
  Chat: { conversationId: string };
};
