import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from '../entities/contact.entity';

@Injectable()
export class ContactService {
  constructor(@InjectRepository(Contact) private contactRepository: Repository<Contact>) {}

  async create(userId: string, contactId: string) {
    const userFriend = new Contact();
    userFriend.userIdFrom = userId;
    userFriend.userIdTo = contactId;
    return this.contactRepository.save(userFriend);
  }

  async remove(userId: string, contactId: string) {
    return this.contactRepository.softDelete({ userIdFrom: userId, userIdTo: contactId });
  }
}
