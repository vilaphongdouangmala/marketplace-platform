import { User } from './user.model';

export interface Chat {
  id: number;
  chatName?: string | null;
  isGroup: boolean;
  latestMessage: string;
  latestMessageTime: Date;
  chatUsers: ChatUser[];
}

export interface ChatDetails {
  chatId: number;
  chatName: string;
  chatUsers: ChatUser[];
  messages: Message[];
}

export interface ChatUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Message {
  id: number;
  message: string;
  created_at: Date;
}
