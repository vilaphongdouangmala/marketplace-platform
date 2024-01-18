import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat, ChatUser, Message } from './entities/chat.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, ChatUser, Message, User])],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
