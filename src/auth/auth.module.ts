import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LocalStrategy } from './auth.strategy';

@Module({
  imports: [
    AuthModule,
    PassportModule,
    JwtModule.register({
      secret: 'test-test-test',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, UsersService],
  exports: [AuthService],
})
export class AuthModule {}
