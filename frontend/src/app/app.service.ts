import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { ChatService } from '../services/chat.service';
import { BrowserStorageService } from '../services/brower-storage.service';

export const appServices = [
  ApiService,
  AuthService,
  ChatService,
  BrowserStorageService,
];
