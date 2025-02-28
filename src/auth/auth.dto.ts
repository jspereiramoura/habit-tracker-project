import { UUIDTypes } from "uuid";
import { z } from "zod";

export const signUpSchema = z.object({
  mail: z.string().email(),
  password: z.string().min(8).max(255),
  username: z
    .string()
    .min(3, { message: "The username must have at least 3 characters." })
    .max(255, { message: "The username must have less than 255 characters." })
    .regex(/^[^@]+$/, { message: "The username mustn't include '@'." })
});

export const signInSchema = z.object({
  password: z.string(),
  mail: z.string().optional(),
  username: z.string().optional()
});

export class SignUpOutputDTO {
  uuid: UUIDTypes;
  mail: string;
  username: string;
}

export class SignInOutputDTO {
  user: {
    uuid: UUIDTypes;
    mail: string;
    username: string;
  };
  access_token: string;
}

export class JwtPayload {
  sub: UUIDTypes;
  mail: string;
  username: string;
}

export type SignUpDTO = z.infer<typeof signUpSchema>;
export type SignInDTO = z.infer<typeof signInSchema>;
