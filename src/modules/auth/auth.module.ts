import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt/jwt.strategy';
import { LocalStrategy } from './local/local.strategy';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { jwt_expire_time, jwt_secret } from 'src/config/configuration';

@Module({
  imports: [
    AuthModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configModule: ConfigService) => ({
        secret: jwt_secret,
        signOptions: { expiresIn: jwt_expire_time },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, UsersService, ConfigService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
