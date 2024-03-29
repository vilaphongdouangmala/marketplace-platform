import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  async getUserChats(@Req() req: any) {
    const userId = req.user.userId;
    return await this.chatService.getUserChats(+userId);
  }

  @Get('messages/:id')
  async getChatMessages(@Param('id') id: string) {
    return await this.chatService.getChatMessages(+id);
  }

  @Post('messages')
  async createChatMessage(
    @Req() req: any,
    @Body() createMessageDto: CreateMessageDto,
  ) {
    const userId = req.user.userId;
    return await this.chatService.createChatMessage(createMessageDto, +userId);
  }
}
