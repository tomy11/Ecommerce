import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../users/entity/users.entity';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from '../utils/jwt/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { Profile } from '../profile/entity/profile.entity';
import { ProfileService } from '../profile/profile.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Profile]),
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: '24h',
        },
      }),
    }),
  ],
  providers: [
    JwtStrategy,
    AuthService,
    UsersService,
    ProfileService,
    ConfigService,
  ],
  controllers: [AuthController],
  exports: [
    JwtStrategy,
    PassportModule,
    AuthService,
    UsersService,
    ProfileService,
    ConfigService,
  ],
})
export class AuthModule {}
