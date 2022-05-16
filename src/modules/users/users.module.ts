import { Module } from '@nestjs/common';

import { UsersService } from './services/users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Contact } from './entities/contact.entity';
import { ContactService } from './services/contact.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Contact])],
  providers: [UsersService, ContactService],
  controllers: [UsersController],
  exports: [UsersService, TypeOrmModule],
})
export class UsersModule {}
