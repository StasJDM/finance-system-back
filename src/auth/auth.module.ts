import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt/jwt.strategy';
import { LocalStrategy } from './local/local.strategy';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configModule: ConfigService) => ({
        secret: configModule.get('jwt_secret'),
        signOptions: { expiresIn: configModule.get('jwt_expire_time') },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, LocalStrategy, UsersService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
