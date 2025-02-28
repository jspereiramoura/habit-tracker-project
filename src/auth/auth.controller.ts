import { Body, Controller, Post } from "@nestjs/common";
import { ZodPipe } from "../config/zod/zod.pipe";
import { SignInDTO, signInSchema, SignUpDTO, signUpSchema } from "./auth.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  login(@Body(new ZodPipe(signInSchema)) body: SignInDTO) {
    return this.authService.signIn(body);
  }

  @Post("register")
  register(@Body(new ZodPipe(signUpSchema)) body: SignUpDTO) {
    return this.authService.signUp(body);
  }
}
