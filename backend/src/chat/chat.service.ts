import { Injectable } from '@nestjs/common';
import { Chat, Message } from './entities/chat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';

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
      .addSelect([
        'user.id',
        'user.firstName',
        'user.lastName',
        'user.email',
        'user.userType',
      ])
      .orderBy('chat.latestMessageAt', 'DESC')
      .getMany();

    return userChats;
  }

  async getChatMessages(chatId: number) {
    const messageQuery = await this.messageRepository.find({
      where: { chatId },
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

    // sort groupedMessages by date in ascending order
    groupedMessages.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA.getTime() - dateB.getTime();
    });

    return groupedMessages;
  }

  async createChatMessage(createMessageDto: CreateMessageDto, userId: number) {
    const { chatId, content } = createMessageDto;
    const newMessage = this.messageRepository.create({
      chatId,
      userId,
      content,
    });
    await this.messageRepository.save(newMessage);
    return newMessage;
  }
}
