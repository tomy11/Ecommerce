import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto, UserResultDto } from './dto/users.dto';
import { Users } from './entity/users.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async findAll(current: number, pageSize: number): Promise<any[]> {
    try {
      const [_results, _count] = await Promise.all([
        this.userRepository.find({
          order: { id: 'DESC' },
          skip: (current - 1) * pageSize,
          take: pageSize,
        }),
        this.userRepository.count(),
      ]);
      const result: any[] = [{ datas: _results, countTotal: _count }];
      this.logger.log('findall user success');
      return result;
    } catch (error) {
      console.log('error findall user ', error);
      this.logger.error('error findall user ', error);
    }
  }

  async save(idata: UserDto): Promise<UserDto> {
    try {
      const iuser = new Users();
      iuser.name = idata.name;
      iuser.email = idata.email;
      iuser.password = idata.password;
      iuser.isActive = idata.isActive;
      iuser.userNumber = idata.userNumber;
      const result: any = await this.userRepository.save(iuser);
      this.logger.log('save user success');
      return result;
    } catch (error) {
      console.log('error save user ', error);
      this.logger.error('error save user ', error);
    }
  }

  async findById(uid: number): Promise<UserDto> {
    try {
      const result = await this.userRepository.findOne({ where: { id: uid } });
      this.logger.log('find by user id success');
      return result;
    } catch (error) {
      console.log('error find by user id', error);
      this.logger.error('error find by user id ', error);
    }
  }

  async findUserSelect(uid: number): Promise<UserResultDto> {
    try {
      const result = await this.userRepository
        .createQueryBuilder('user')
        .select('user.id')
        .addSelect('user.name')
        .addSelect('user.email')
        .addSelect('user.isActive')
        .addSelect('user.userNumber')
        .where('user.id = :id', { id: uid })
        .getOne();
      this.logger.log('find by user id select success');
      return result;
    } catch (error) {
      console.log('error find by user id select', error);
      this.logger.error('error find by user id select ', error);
    }
  }

  async findByEmail(iemail: string): Promise<UserResultDto> {
    try {
      const result = await this.userRepository.findOne({
        where: { email: iemail },
      });
      if (result) {
        this.logger.log('find email user success');
        return result;
      } else {
        return null;
      }
    } catch (error) {
      console.log('error find email user ', error);
      this.logger.error('error find email user ', error);
    }
  }

  async findUserNumber(unumber: string): Promise<UserResultDto> {
    try {
      const result = await this.userRepository.findOne({
        where: { userNumber: unumber },
      });
      if (result) {
        this.logger.log('find user number success');
        return result;
      } else {
        return null;
      }
    } catch (error) {
      console.log('error find user number ', error);
      this.logger.error('error find user number ', error);
    }
  }

  async update(id: any, idata: any): Promise<UserDto> {
    try {
      const iuser = await this.userRepository.findOne(id);
      iuser.name = idata.name;
      iuser.email = idata.email;
      iuser.password = idata.password;
      iuser.isActive = idata.isActive;
      const result: any = await this.userRepository.update(id, iuser);
      this.logger.log('update user success');
      return result;
    } catch (error) {
      console.log('error update user ', error);
      this.logger.error('error update user ', error);
    }
  }
}
