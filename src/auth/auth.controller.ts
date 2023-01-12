import { Body, Controller, Logger, Post } from '@nestjs/common';
import { IResponse } from '../utils/interface/IResponse';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() userRegis: RegisterDto): Promise<IResponse> {
    try {
      const result: any = await this.authService.register(userRegis);
      if (result != null || result != undefined) {
        const resultData: IResponse = {
          message: 'register user successfuly',
          data: result,
        };
        this.logger.log('register user successfuly', result);
        return resultData;
      } else {
        const resultData: IResponse = {
          message: 'email or username duplicate in the system',
          data: result,
        };
        this.logger.log('user email dupication', result);
        return resultData;
      }
    } catch (error) {
      console.log('error ', error);
      const result: IResponse = {
        message: 'error register ',
        data: error.message,
      };
      this.logger.log('error register user ', error);
      return result;
    }
  }

  @Post('/login')
  async login(@Body() userLogin: LoginDto): Promise<any> {
    try {
      const result: any = await this.authService.login(userLogin);

      if (result != null || result != undefined) {
        const resultData: IResponse = {
          message: 'login user successfuly',
          data: result,
        };
        this.logger.log('login user successfuly');
        return resultData;
      } else {
        const resultData: IResponse = {
          message: 'login user not found',
          data: null,
        };
        return resultData;
      }
    } catch (error) {
      console.log('error ', error);
      const result: IResponse = {
        message: 'login email or password error',
        data: error.message,
      };
      this.logger.log('error login ', error);
      return result;
    }
  }
}
