import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from '../dto/user.dto';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);

    const userDb = await this.userRepository.findByCondition({
      email: createUserDto.email,
    });

    if (userDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    return await this.userRepository.create(createUserDto);
  }

  async findByAndLogin(loginUserDto: LoginUserDto) {
    const user = await this.userRepository.findByCondition({
      email: loginUserDto.email,
    });

    if (!user) {
      throw new HttpException('Email not exist', HttpStatus.BAD_REQUEST);
    }

    const is_equal = bcrypt.compareSync(loginUserDto.password, user.password);

    if (!is_equal) {
      throw new HttpException('Password not exist', HttpStatus.BAD_REQUEST);
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findByCondition({
      email: email,
    });

    if (!user) {
      throw new HttpException('Email not exist', HttpStatus.BAD_REQUEST);
    }

    return user;
  }
}
