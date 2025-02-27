import { Injectable } from "@nestjs/common";
import { Users } from "../users/users.entity";
import { UsersService } from "../users/users.service";
import { LoginDTO, SignUpDTO } from "./auth.dto";
import { PasswordEncoderService } from "./password-encoder/password-encoder.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly passwordEncoderService: PasswordEncoderService
  ) {}

  private async getUserStrategy(userDto: LoginDTO) {
    if (userDto.mail) return this.usersService.findByMail(userDto.mail);
    if (!userDto.username) throw new Error("Username or email is required");
    return this.usersService.findByUsername(userDto.username);
  }

  async signIn(userDto: LoginDTO) {
    const user = await this.getUserStrategy(userDto);

    if (!user) throw new Error("User not found");

    const isPasswordValid = await this.passwordEncoderService.comparePassword(
      userDto.password,
      user.hash
    );

    if (!isPasswordValid) throw new Error("Invalid password");

    return user;
  }

  async signUp(userDto: SignUpDTO) {
    let user: Users | null;

    user = await this.usersService.findByMail(userDto.mail);
    if (user) throw new Error("This email is already in use");

    user = await this.usersService.findByUsername(userDto.username);
    if (user) throw new Error("This username is already in use");

    return this.usersService.createUser({
      mail: userDto.mail,
      username: userDto.username,
      hash: await this.passwordEncoderService.hashPassword(userDto.password)
    });
  }
}
