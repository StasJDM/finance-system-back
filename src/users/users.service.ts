import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    { id: 1, name: 'Stas', password: 'tempPwd!23' },
    { id: 2, name: 'Ivan', password: 'tempPwd!23' },
  ];

  async findOne(userName: string): Promise<User | undefined> {
    return this.users.find((user) => user.name === userName);
  }
}
