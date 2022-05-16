import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { SelfGuard } from 'src/core/guards/self.guard';
import { UserDto } from './user.dto';
import { UsersService } from './services/users.service';
import { ContactService } from './services/contact.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService, private contactService: ContactService) {}

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id) {
    return await this.usersService.findOneById(id);
  }

  @Patch(':id')
  @UseGuards(SelfGuard)
  async update(@Param('id') id, @Body() user: UserDto) {
    return this.usersService.update(id, user);
  }

  @Delete(':id')
  @UseGuards(SelfGuard)
  async delete(@Param('id') id) {
    return this.usersService.delete(id);
  }

  @Post('contacts/:contactId')
  async addContact(@Request() req, @Param('contactId') contactId: string) {
    const userId: string = req.user.id;
    return this.contactService.create(userId, contactId);
  }

  @Delete('contacts/:contactId')
  async removeContact(@Request() req, @Param('contactId') contactId: string) {
    const userId: string = req.user.id;
    return this.contactService.remove(userId, contactId);
  }
}
