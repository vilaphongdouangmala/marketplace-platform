import { User } from "./user.model";

export interface Chat {
  id: number;
  chatName?: string | null;
  isGroup: boolean;
  latestMessage: string;
  latestMessageAt: string;
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
  user: User;
}

export interface DateGroupedMessage {
  date: string;
  messages: Message[];
}

export interface Message {
  id: number;
  content: string;
  createdAt: string;
  userId: number;
  chatId: number;
}
