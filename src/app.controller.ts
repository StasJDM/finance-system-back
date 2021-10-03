import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './modules/auth/auth.service';
import { JwtAuthGuard } from './modules/auth/jwt/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private _authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
