import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/core/constants';
import { UserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  async create(user: UserDto): Promise<User> {
    return await this.userRepository.create<User>(user);
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { email } });
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { id } });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll<User>();
  }

  async update(id: number, user: UserDto): Promise<any> {
    return await this.userRepository.update<User>(
      { ...user },
      { where: { id } },
    );
  }

  async delete(id: number): Promise<any> {
    return await this.userRepository.destroy({ where: { id } });
  }
}
