import {
  ConflictException,
  Injectable,
  UnauthorizedException
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Users } from "../users/users.entity";
import { UsersService } from "../users/users.service";
import { AuthOutputDTO, SignInDTO, SignUpDTO } from "./auth.dto";
import { PasswordEncoderService } from "./password-encoder/password-encoder.service";

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
    if (!userDto.username)
      throw new UnauthorizedException("Username or email is required");
    return this.usersService.findByUsername(userDto.username);
  }

  async signIn(userDto: SignInDTO): Promise<AuthOutputDTO> {
    const user = await this.validateUser(userDto);
    if (!user) throw new UnauthorizedException("Invalid Credentials");

    const token = this.jwtService.sign({
      sub: user.uuid,
      username: user.username,
      email: user.mail
    });

    return {
      user: {
        uuid: user.uuid,
        mail: user.mail,
        username: user.username
      },
      access_token: token
    };
  }

  async signUp(userDto: SignUpDTO): Promise<AuthOutputDTO> {
    let user: Users | null;

    user = await this.usersService.findByMail(userDto.mail);
    if (user) throw new ConflictException("This email is already in use");

    user = await this.usersService.findByUsername(userDto.username);
    if (user) throw new ConflictException("This username is already in use");

    const output = await this.usersService.createUser({
      mail: userDto.mail,
      username: userDto.username,
      hash: await this.passwordEncoderService.hashPassword(userDto.password)
    });

    const token = this.jwtService.sign({
      sub: output.uuid,
      username: output.username,
      email: output.mail
    });

    return {
      user: {
        uuid: output.uuid,
        mail: output.mail,
        username: output.username
      },
      access_token: token
    };
  }
}
