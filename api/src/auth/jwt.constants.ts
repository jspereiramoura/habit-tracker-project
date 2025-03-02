import * as dotenv from "dotenv";

dotenv.config();

export const jwtConstants = {
  secret: process.env.JWT_SECRET || "defaultSecret",
  signOptions: { expiresIn: "1d" }
};
