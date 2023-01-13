import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { IResponse } from 'src/utils/interface/IResponse';
import { ProfileDto } from './dto/profile.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  private readonly logger = new Logger(ProfileController.name);
  constructor(private readonly profileRepository: ProfileService) {}

  @Get()
  async findAll(): Promise<IResponse> {
    try {
      const result = await this.profileRepository.findAll();
      const resultData: IResponse = {
        message: 'find profile all successfuly',
        data: result,
      };
      this.logger.log('find profile all successfuly', result);
      return resultData;
    } catch (error) {
      const resultData: IResponse = {
        message: 'find profile all error',
        data: error.message,
      };
      this.logger.log('find profile all error', error);
      return resultData;
    }
  }

  @Get('/:id')
  async findById(@Param('id') id: number): Promise<IResponse> {
    try {
      const result = await this.profileRepository.findById(id);
      const resultData: IResponse = {
        message: 'find profile successfuly',
        data: result,
      };
      this.logger.log('find profile successfuly', result);
      return resultData;
    } catch (error) {
      const resultData: IResponse = {
        message: 'find profile error',
        data: error.message,
      };
      this.logger.log('find profile error', error);
      return resultData;
    }
  }

  @Get('/user/:id')
  async findByUserId(@Param('id') id: number): Promise<IResponse> {
    try {
      const result = await this.profileRepository.findByUserId(id);
      const resultData: IResponse = {
        message: 'find profile by userId successfuly',
        data: result,
      };
      this.logger.log('find profile by userId successfuly', result);
      return resultData;
    } catch (error) {
      const resultData: IResponse = {
        message: 'find profile by userId error',
        data: error.message,
      };
      this.logger.log('find profile by userId error', error);
      return resultData;
    }
  }

  @Post('/save')
  async save(@Body() idata: ProfileDto): Promise<IResponse> {
    try {
      const result = await this.profileRepository.save(idata);
      const resultData: IResponse = {
        message: 'save profile successfuly',
        data: result,
      };
      this.logger.log('save profile successfuly', result);
      return resultData;
    } catch (error) {
      const resultData: IResponse = {
        message: 'save profile error',
        data: error.message,
      };
      this.logger.log('save profile error', error);
      return resultData;
    }
  }

  @Put('/update/:id')
  async update(
    @Param('id') id: number,
    @Body() idata: ProfileDto,
  ): Promise<IResponse> {
    try {
      const result = await this.profileRepository.update(id, idata);
      const resultData: IResponse = {
        message: 'update profile successfuly',
        data: result,
      };
      this.logger.log('update profile successfuly', result);
      return resultData;
    } catch (error) {
      const resultData: IResponse = {
        message: 'update profile error',
        data: error.message,
      };
      this.logger.log('update profile error', error);
      return resultData;
    }
  }

  @Delete('/:id')
  async delete(@Param('id') id: number): Promise<IResponse> {
    try {
      const result = await this.profileRepository.delete(id);
      const resultData: IResponse = {
        message: 'delete profile by id successfuly',
        data: result,
      };
      this.logger.log('delete profile by id successfuly', result);
      return resultData;
    } catch (error) {
      const resultData: IResponse = {
        message: 'delete profile by id error',
        data: error.message,
      };
      this.logger.log('delete profile by id error', error);
      return resultData;
    }
  }
}
