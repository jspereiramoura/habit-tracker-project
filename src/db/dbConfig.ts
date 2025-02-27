import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";

import { config } from "dotenv";

config();

export const DB_CONFIG: TypeOrmModuleOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [join(__dirname, "..", "**", "*.entity.{ts,js}")],
  migrations: [join(__dirname, "migrations", "*.ts")],
  synchronize: false
};
