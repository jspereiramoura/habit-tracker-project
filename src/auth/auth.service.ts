import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import { PasswordEncoderService } from "./password-encoder/password-encoder.service";
import {
  SignInDTO,
  SignInOutputDTO,
  SignUpDTO,
  SignUpOutputDTO
} from "./auth.dto";
import { Users } from "../users/users.entity";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly passwordEncoderService: PasswordEncoderService
  ) {}

  async validateUser(loginData: SignInDTO): Promise<Users | null> {
    const user = await this.getUserStrategy(loginData);
    if (!user) return null;

    const isPasswordValid = await this.passwordEncoderService.comparePassword(
      loginData.password,
      user.hash
    );

    if (!isPasswordValid) return null;
    return user;
  }

  private async getUserStrategy(userDto: SignInDTO) {
    if (userDto.mail) return this.usersService.findByMail(userDto.mail);
    if (!userDto.username) throw new Error("Username or email is required");
    return this.usersService.findByUsername(userDto.username);
  }

  async signIn(userDto: SignInDTO): Promise<SignInOutputDTO> {
    const user = await this.validateUser(userDto);
    if (!user) throw new UnauthorizedException("Invalid Credentials");

    const payload = {
      sub: user.uuid,
      username: user.username,
      email: user.mail
    };
    const token = this.jwtService.sign(payload);

    return {
      user: {
        uuid: user.uuid,
        mail: user.mail,
        username: user.username
      },
      access_token: token
    };
  }

  async signUp(userDto: SignUpDTO): Promise<SignUpOutputDTO> {
    let user: Users | null;

    user = await this.usersService.findByMail(userDto.mail);
    if (user) throw new Error("This email is already in use");

    user = await this.usersService.findByUsername(userDto.username);
    if (user) throw new Error("This username is already in use");

    const output = await this.usersService.createUser({
      mail: userDto.mail,
      username: userDto.username,
      hash: await this.passwordEncoderService.hashPassword(userDto.password)
    });

    return {
      uuid: output.uuid,
      mail: output.mail,
      username: output.username
    };
  }
}
