import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { PasswordEncoderService } from "./password-encoder/password-encoder.service";

@Module({
  providers: [AuthService, PasswordEncoderService]
})
export class AuthModule {}
