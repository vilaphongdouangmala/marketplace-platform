import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Chat } from '../models/chat.model';

Injectable({
  providedIn: 'root',
});
export class ChatService {
  selectedChat = new BehaviorSubject<Chat | null>(null);
}
