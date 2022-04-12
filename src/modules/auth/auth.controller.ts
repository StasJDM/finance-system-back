import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { Public } from 'src/core/decorators/public.decorator';
import { UserDto } from '../users/user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private _authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return await this._authService.login(req.user);
  }

  @Public()
  @Post('register')
  async singUp(@Body() user: UserDto) {
    return await this._authService.create(user);
  }
}
