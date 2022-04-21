import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from './user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async create(createUserDto: UserDto): Promise<User> {
    const { firstName, lastName, email, password, salt, gender } = createUserDto;

    const user = new User();

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.password = password;
    user.salt = salt;
    user.gender = gender;

    return await this.userRepository.save(user);
  }

  // Only for auth service
  async findOneByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  async findOneById(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id);
    const { password, salt, ...safeUser } = user;
    return safeUser;
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.find();
    const safeUsers = users.map((user) => {
      const { password, salt, ...safeUser } = user;
      return safeUser;
    });
    return safeUsers;
  }

  async update(id: string, updateUserDto: UserDto): Promise<any> {
    const { firstName, lastName, email, gender } = updateUserDto;
    const user = await this.userRepository.findOne(id);

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.gender = gender || user.gender;

    await this.userRepository.save(user);

    const { password, salt, ...safeUser } = user;
    return safeUser;
  }

  async delete(id: string): Promise<any> {
    return await this.userRepository.delete(id);
  }
}
