import { Routes } from '@angular/router';
import { chatRoutes } from './modules/chat/chat.routes';
import { authRoutes } from './auth/auth.routes';

export const routes: Routes = [...authRoutes, ...chatRoutes];
