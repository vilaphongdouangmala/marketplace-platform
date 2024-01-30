import { ApiProperty } from '@nestjs/swagger';
import { ChatUser, Message } from '../../chat/entities/chat.entity';
import { AbstractEntity } from '../../common/entities/abstract.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserType } from '../enums/user.enum';

@Entity()
export class User extends AbstractEntity<User> {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({
    length: 50,
    type: 'varchar',
    nullable: false,
    unique: true,
    name: 'username',
  })
  @ApiProperty()
  username: string;

  @Column({ length: 50, type: 'varchar', nullable: false, name: 'password' })
  @ApiProperty()
  password: string;

  @Column({ length: 50, type: 'varchar', nullable: false, name: 'first_name' })
  @ApiProperty()
  firstName: string;

  @Column({ length: 50, type: 'varchar', nullable: true, name: 'last_name' })
  @ApiProperty()
  lastName: string;

  @Column({ length: 50, type: 'varchar', nullable: false })
  @ApiProperty()
  email: string;

  @Column({ type: 'timestamptz', name: 'date_of_birth', nullable: false })
  @ApiProperty()
  dateOfBirth: Date;

  @Column({ length: 50, type: 'varchar', nullable: false })
  @ApiProperty()
  country: string;

  @Column({ type: 'enum', enum: UserType, name: 'user_type', nullable: false, default: UserType.Buyer })
  @ApiProperty()
  userType: UserType;

  @OneToMany(() => ChatUser, (chatUser) => chatUser.user)
  @ApiProperty()
  chatUsers: ChatUser[];

  @OneToMany(() => Message, (message) => message.user)
  @ApiProperty()
  messages: Message[];
}
