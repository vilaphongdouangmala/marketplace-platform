import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
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

  @Column({ type: 'boolean', default: false, name: 'is_super_user' })
  isSuperUser: boolean;
}
