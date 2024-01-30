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

  chats: Chat[] = [
    {
      id: 1,
      chatName: null,
      isGroup: false,
      latestMessage: 'Hello there!',
      latestMessageTime: new Date(),
      chatUsers: [
        {
          id: 1,
          firstName: 'User1',
          lastName: 'User1',
          email: 'user@gmail.com',
        },
      ],
    },
    {
      id: 2,
      chatName: 'Chat 2',
      isGroup: true,
      latestMessage: 'Group message!',
      latestMessageTime: new Date(),
      chatUsers: [
        {
          id: 2,
          firstName: 'User2',
          lastName: 'User2',
          email: 'user@gmail.com',
        },
        {
          id: 3,
          firstName: 'User3',
          lastName: 'User3',
          email: 'user@gmail.com',
        },
      ],
    },
    {
      id: 3,
      chatName: null,
      isGroup: false,
      latestMessage: 'How are you?',
      latestMessageTime: new Date(),
      chatUsers: [
        {
          id: 4,
          firstName: 'User4',
          lastName: 'User4',
          email: 'user@gmail.com',
        },
      ],
    },
    // ... Repeat this pattern for the remaining entries
  ];

  ngOnInit(): void {
    this.chatService.selectedChat.next(this.chats[0]);
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
}
