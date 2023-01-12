import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileDto } from './dto/profile.dto';
import { Profile } from './entity/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async save(idata: ProfileDto): Promise<ProfileDto> {
    try {
      const iuser = new Profile();
      iuser.userId = idata.userId;
      iuser.userNumber = idata.userNumber;
      iuser.firstName = idata.firstName;
      iuser.lastName = idata.lastName;
      iuser.phone = idata.phone;
      iuser.birthday = idata.birthday;
      iuser.address = idata.address;
      iuser.country = idata.country;
      const result: any = await this.profileRepository.save(iuser);
      return result;
    } catch (error) {
      console.log('error save profile ', error);
    }
  }

  async findAll(): Promise<ProfileDto[]> {
    try {
      const result = await this.profileRepository.find();
      return result;
    } catch (error) {
      console.log('error find all profile', error);
    }
  }

  async findById(uid: number): Promise<ProfileDto> {
    try {
      const result = await this.profileRepository.findOne({
        where: { id: uid },
      });
      return result;
    } catch (error) {
      console.log('error find profile by id', error);
    }
  }

  async findByUserId(uid: number): Promise<ProfileDto> {
    try {
      const result = await this.profileRepository.findOne({
        where: { userId: uid },
      });
      return result;
    } catch (error) {
      console.log('error find profile by user id', error);
    }
  }

  async update(uid: any, idata: any): Promise<ProfileDto> {
    try {
      const iprofile = await this.profileRepository.findOne({
        where: { userId: uid },
      });
      iprofile.firstName = idata.firstName;
      iprofile.lastName = idata.lastName;
      iprofile.phone = idata.phone;
      iprofile.birthday = idata.birthday;
      iprofile.address = idata.address;
      iprofile.country = idata.country;

      const result: any = await this.profileRepository.update(
        iprofile.id,
        iprofile,
      );
      return result;
    } catch (error) {
      console.log('error update profile ', error);
    }
  }

  async delete(uid: any): Promise<ProfileDto> {
    try {
      const result: any = await this.profileRepository.delete(uid);
      return result;
    } catch (error) {
      console.log('error delete profile ', error);
    }
  }
}
