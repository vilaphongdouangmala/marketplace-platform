import { ApiProperty } from '@nestjs/swagger';
import { AbstractEntity } from '../../common/entities/abstract.entity';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Chat extends AbstractEntity<Chat> {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ length: 50, type: 'varchar', nullable: true, name: 'chat_name' })
  @ApiProperty()
  chatName: string;

  @Column({ type: 'boolean', default: false, name: 'is_group' })
  @ApiProperty()
  isGroup: boolean;

  @OneToMany(() => ChatUser, (chatUser) => chatUser.chat)
  @ApiProperty()
  chatUsers: ChatUser[];

  @OneToMany(() => Message, (message) => message.chat)
  @ApiProperty()
  messages: Message[];
}

@Entity()
export class ChatUser extends AbstractEntity<ChatUser> {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ApiProperty()
  @Column({ nullable: false, name: 'chat_id'})
  chatId: number;

  @ManyToOne(() => Chat, (chat) => chat.chatUsers)
  @JoinColumn({ name: 'chat_id' })
  @ApiProperty()
  chat: Chat;

  @ApiProperty()
  @Column({ nullable: false, name: 'user_id'})
  userId: number;

  @ManyToOne(() => User, (user) => user.chatUsers)
  @JoinColumn({ name: 'user_id' })
  @ApiProperty()
  user: User;
}

@Entity()
export class Message extends AbstractEntity<Message> {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ length: 512, type: 'varchar', nullable: false, name: 'content' })
  content: string;

  @Column({ type: 'boolean', default: false, name: 'is_read' })
  isRead: boolean;

  @ApiProperty()
  @Column({ nullable: false, name: 'chat_id'})
  chatId: number;

  @ManyToOne(() => Chat, (chat) => chat.messages)
  @JoinColumn({ name: 'chat_id' })
  @ApiProperty()
  chat: Chat;

  @ApiProperty()
  @Column({ nullable: false, name: 'user_id'})
  userId: number;

  @ManyToOne(() => User, (user) => user.messages)
  @JoinColumn({ name: 'user_id' })
  @ApiProperty()
  user: User;
}
