import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DB_CONFIG } from "./dbConfig";

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot(DB_CONFIG)]
})
export class DbModule {}
