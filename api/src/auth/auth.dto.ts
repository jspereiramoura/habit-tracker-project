import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { ApiResponseProperty } from "@nestjs/swagger";
import { UUIDTypes } from "uuid";
import { z } from "zod";

extendZodWithOpenApi(z);

export const signUpSchema = z
  .object({
    mail: z.string().email().openapi({ example: "some@email.test" }),
    password: z.string().min(8).max(255).openapi({ example: "password123" }),
    username: z
      .string()
      .min(3, { message: "The username must have at least 3 characters." })
      .max(255, { message: "The username must have less than 255 characters." })
      .regex(/^[^@]+$/, { message: "The username mustn't include '@'." })
      .openapi({ example: "john_doe" })
  })
  .openapi("SignUpObject");

export const signInSchema = z
  .object({
    password: z.string().openapi({ example: "password123" }),
    mail: z.string().optional().openapi({ example: "some@email.test" }),
    username: z.string().optional().openapi({ example: "john_doe" })
  })
  .openapi("SignInObject");

export class AuthOutputDTO {
  @ApiResponseProperty({
    example: {
      uuid: "123e4567-e89b-12d3-a456-426614174000",
      mail: "some@email.test",
      username: "john_doe"
    }
  })
  user: {
    uuid: UUIDTypes;
    mail: string;
    username: string;
  };
  @ApiResponseProperty({
    example:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30"
  })
  access_token: string;
}

export class JwtPayload {
  sub: UUIDTypes;
  mail: string;
  username: string;
}

export type SignUpDTO = z.infer<typeof signUpSchema>;
export type SignInDTO = z.infer<typeof signInSchema>;
