import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './core/decorators/public.decorator';
import { AuthService } from './modules/auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private _authService: AuthService,
  ) {}

  @Public()
  @Get('')
  ping() {
    return { message: 'Ok, ping works' };
  }

  @Get('private')
  pingPrivate() {
    return { message: 'Ok, private ping works' };
  }
}
