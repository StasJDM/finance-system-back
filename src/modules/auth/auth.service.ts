import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private _jwtService: JwtService,
    private _usersService: UsersService,
    private _configService: ConfigService,
  ) {}

  async validateUser(userEmail: string, userPassword: string): Promise<any> {
    const user = await this._usersService.findOneByEmail(userEmail);

    if (!user) {
      return null;
    }

    const match = await this.comparePassword(userPassword, user.password);
    if (!match) {
      return null;
    }

    const { password, salt, ...result } = user['dataValues'];
    return result;
  }

  public async login(user: any) {
    console.log('@@@', user);
    return await this._generateToken(user);
  }

  public async create(user) {
    const saltToHash = await bcrypt.genSalt(
      Number(this._configService.get('hash_rounds')),
    );
    const hashedPassword = await bcrypt.hash(user.password, saltToHash);

    const newUser = await this._usersService.create({
      ...user,
      password: hashedPassword,
      salt: saltToHash,
    });

    const { password, salt, ...result } = newUser['dataValues'];
    const token = await this._generateToken(result);
    return { user: result, token };
  }

  private async comparePassword(enteredPassword, dbPassword) {
    return await bcrypt.compare(enteredPassword, dbPassword);
  }

  private async _generateToken(user) {
    return { access_token: this._jwtService.sign(user) };
  }
}
