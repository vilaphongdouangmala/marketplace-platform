import { Component, OnInit, inject } from '@angular/core';
import { Chat, DateGroupedMessage } from '../../../models/chat.model';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../../services/chat.service';
import { BrowserStorageService } from '../../../services/brower-storage.service';

@Component({
  selector: 'app-chat',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent implements OnInit {
  chatService = inject(ChatService);
  browserStorageService = inject(BrowserStorageService);
  userId = this.browserStorageService.get('userId');
  messages: DateGroupedMessage | undefined;

  chats: Chat[] = [];

  ngOnInit(): void {
    this.chatService.selectedChat.next(this.chats[0]);
    this.chatService.getUserChats().subscribe({
      next: (chats) => {
        this.chats = chats;
        console.log(this.chats);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  selectChat(selectedChat: Chat): void {
    this.chatService.selectedChat.next(selectedChat);
    this.chatService.getChatMessages(1).subscribe({
      next: (messages) => {
        this.messages = messages;
        console.log(this.messages);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  getPrivateMessageChatName(chat: Chat): string {
    const chatPartner = chat.chatUsers.find(
      (chatUser) => chatUser.user.id !== Number(this.userId)
    )?.user;
    console.log(chatPartner);
    return chatPartner
      ? `${chatPartner.firstName} ${chatPartner.lastName}`
      : '';
  }
}
