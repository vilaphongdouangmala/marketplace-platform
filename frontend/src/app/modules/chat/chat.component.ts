import { Component, OnInit, inject } from '@angular/core';
import { Chat, DateGroupedMessage } from '../../../models/chat.model';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../../services/chat.service';
import { BrowserStorageService } from '../../../services/brower-storage.service';
import { SharedModule } from '../../shared/shared.module';
import { getDynamicTimeDifference, getTimeFromDateTimeString } from '../../shared/utils/datetime.utils';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-chat',
  imports: [CommonModule, SharedModule],
  standalone: true,
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent implements OnInit {
  chatService = inject(ChatService);
  browserStorageService = inject(BrowserStorageService);
  userId = Number(this.browserStorageService.get('userId'));
  chats: Chat[] = [];
  messages: DateGroupedMessage[] = [];

  ngOnInit(): void {
    // get user selected chat messsage
    this.chatService.getUserChats().subscribe({
      next: (chats) => {
        this.chats = chats;
      },
      error: (err) => {
        console.error(err);
      },
    });
    // subscribe selected chat messsage
    this.chatService.selectedChatMessages.subscribe({
      next: (messages) => {
        this.messages = messages;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  selectChat(selectedChat: Chat): void {
    // select chat
    this.chatService.selectedChat.next(selectedChat);
    // get selected chat messsage
    this.chatService.getChatMessages(selectedChat.id).subscribe({
      next: (messages) => {
        this.chatService.selectedChatMessages.next(messages);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  getPrivateMessageChatName(chat: Chat): string {
    const chatPartner: User | undefined = chat.chatUsers.find(
      (chatUser) => chatUser.user.id !== this.userId
    )?.user;
    return chatPartner
      ? `${chatPartner.firstName} ${chatPartner.lastName}`
      : '';
  }

  formatTime(dateTime: string): string {
    return getTimeFromDateTimeString(dateTime);
  }

  getDynamicTimeDifference(dateTime: string): string {
    return getDynamicTimeDifference(dateTime);
  }
}
