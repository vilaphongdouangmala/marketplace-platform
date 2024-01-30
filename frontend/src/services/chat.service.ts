import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Chat, DateGroupedMessage } from '../models/chat.model';
import { ApiService } from './api.service';
import { apiEndpoints } from '../app/constants/api.constant';

@Injectable()
export class ChatService {
  constructor(private apiService: ApiService) {}

  selectedChat = new BehaviorSubject<Chat | null>(null);

  getChatMessages(chatId: number): Observable<DateGroupedMessage> {
    return this.apiService.get(apiEndpoints.chatMessages + chatId);
  }
}
