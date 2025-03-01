import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiBody, ApiResponse } from "@nestjs/swagger";
import { ZodPipe } from "../config/zod/zod.pipe";
import {
  SignInDTO,
  SignInOutputDTO,
  signInSchema,
  SignUpDTO,
  SignUpOutputDTO,
  signUpSchema
} from "./auth.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    schema: { $ref: "#/components/schemas/SignInObject" }
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "The user has been successfully logged in.",
    type: SignInOutputDTO
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: "The provided credentials are invalid."
  })
  async login(@Body(new ZodPipe(signInSchema)) body: SignInDTO) {
    return await this.authService.signIn(body);
  }

  @Post("register")
  @ApiBody({
    schema: { $ref: "#/components/schemas/SignUpObject" }
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "The record has been successfully created.",
    type: SignUpOutputDTO
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: "The user with the provided mail or username already exists."
  })
  async register(@Body(new ZodPipe(signUpSchema)) body: SignUpDTO) {
    return await this.authService.signUp(body);
  }
}
