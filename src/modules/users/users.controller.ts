import { Body, Controller, Delete, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { SelfGuard } from 'src/core/guards/self.guard';
import { UserDto } from './user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

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
}
