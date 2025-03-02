// strategies/local.strategy.ts

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { Users } from "../../users/users.entity";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: "identifier",
      passwordField: "password"
    });
  }

  async validate(identifier: string, password: string): Promise<Users> {
    const isEmail = identifier.includes("@");
    const identifierKey = isEmail ? "mail" : "username";

    const user = await this.authService.validateUser({
      password,
      [identifierKey]: identifier
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
