import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat, Message } from './entities/chat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
  ) {}

  async getUserChats(userId: number) {
    const userChats = await this.chatRepository
      .createQueryBuilder('chat')
      .innerJoin('chat.chatUsers', 'chatUser', 'chatUser.userId = :userId', {
        userId,
      })
      .leftJoinAndSelect('chat.chatUsers', 'chatUsers')
      .leftJoin('chatUsers.user', 'user')
      .addSelect(['user.id', 'user.firstName', 'user.lastName', 'user.email', 'user.userType'])
      .getMany();

    return userChats;
  }

  async getChatMessages(chatId: number) {
    const messageQuery = await this.messageRepository.find({
      where: { chatId },
      order: { createdAt: 'DESC' },
    });

    // group queried messages by date
    const groupedMessages = messageQuery.reduce((acc, message) => {
      const date = message.createdAt.toISOString().split('T')[0];
      const existingGroup = acc.find((group) => group.date === date);
      if (existingGroup) {
        existingGroup.messages.push(message);
      } else {
        acc.push({ date, messages: [message] });
      }
      return acc;
    }, []);

    return groupedMessages;
  }
}
