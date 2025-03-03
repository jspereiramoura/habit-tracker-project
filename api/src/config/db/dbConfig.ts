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
  entities: [
    process.env.DB_ENTITIES ??
      join(__dirname, "../..", "**", "*.entity.{ts,js}")
  ],
  migrations: [
    process.env.DB_MIGRATIONS ?? join(__dirname, "migrations", "*.ts")
  ],
  synchronize: false
};
