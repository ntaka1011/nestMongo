import { Injectable } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from '../dto/user.dto';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);

    const token = this._createToken(user);

    return {
      email: user.email,
      ...token,
    };
  }

  async login(loginDto: LoginUserDto) {
    const user = await this.userService.findByAndLogin(loginDto);

    const token = this._createToken(user);

    return {
      email: user.email,
      ...token,
    };
  }

  async validateUser(email) {
    console.log(
      '🚀 ~ file: auth.service.ts:35 ~ AuthService ~ validateUser ~ email:',
      email,
    );
    const user = await this.userService.findByEmail(email);

    return user;
  }

  private _createToken({ email }): any {
    const accessToken = this.jwtService.sign({ email });
    return {
      expiresIn: process.env.EXPIRESIN,
      accessToken,
    };
  }
}
