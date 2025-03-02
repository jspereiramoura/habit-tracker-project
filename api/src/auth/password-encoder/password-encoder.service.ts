import { Injectable } from "@nestjs/common";
import { hash, genSalt, compare } from "bcrypt";

@Injectable()
export class PasswordEncoderService {
  async hashPassword(password: string) {
    const salt = await genSalt();
    const hashedPass = await hash(password, salt);

    return hashedPass;
  }

  async comparePassword(password: string, hash: string) {
    return await compare(password, hash);
  }
}
