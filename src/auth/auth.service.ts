import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { Users } from '../users/entity/users.entity';
import { UserDto } from '../users/dto/users.dto';
import { LoginDto } from './dto/auth.dto';
import { ProfileService } from '../profile/profile.service';
import { Profile } from '../profile/entity/profile.entity';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private userService: UsersService,
    private profileService: ProfileService,
    private jwtService: JwtService,
  ) {}

  async register(idata: UserDto): Promise<any> {
    try {
      const { name, email, password } = idata;
      const resultEmail = await this.userService.findByEmail(email);
      this.logger.log('Email ', resultEmail);

      if (!resultEmail) {
        const saltOrRounds = 10;
        const salt = await bcrypt.genSalt(saltOrRounds);
        const hash = await bcrypt.hash(password, salt);
        const currentRegis = Date.now();
        const fnId = `N${currentRegis}`;
        const iuser = new Users();
        iuser.name = name;
        iuser.email = email;
        iuser.password = hash;
        iuser.isActive = false;
        iuser.userNumber = fnId;
        const result = await this.userService.save(iuser);

        const unumber = await this.userService.findUserNumber(fnId);
        const iprofile = new Profile();
        iprofile.userId = unumber.id;
        iprofile.userNumber = fnId;
        iprofile.firstName = '';
        iprofile.lastName = '';
        iprofile.phone = '';
        iprofile.birthday = '';
        iprofile.address = '';
        iprofile.country = '';
        this.profileService.save(iprofile);
        return result;
      } else {
        console.log(
          'Email or Phone duplicate in the system',
          resultEmail.email,
        );
        this.logger.log('Email or Phone duplicate in the system');
        return null;
      }
    } catch (error) {
      console.log('error register ', error);
      this.logger.error('error register ', error);
      throw new UnauthorizedException('Please check your login credentials');
    }
  }

  async login(idata: LoginDto): Promise<any> {
    try {
      const { email, password } = idata;
      const user = await this.userService.findByEmail(email);
      const isMatch = await bcrypt.compare(password, user.password);
      const payload = { email: user.email, sub: user.id, name: user.name };
      const access_token = await this.jwtService.sign(payload);
      const currentTimes = Date.now();
      const exptime = currentTimes + 1000 * 60 * 60 * 24;
      if (user && isMatch === true) {
        const datas: any = {
          userId: user.id,
          userName: user.name,
          email: user.email,
          expiryDate: exptime.toString(),
          token: access_token,
        };
        this.logger.log('login success');
        return datas;
      } else {
        console.log('Please check your login email or password');
        return null;
      }
    } catch (error) {
      this.logger.error('error login ', error);
      throw new UnauthorizedException('Please check username or password');
    }
  }
}
