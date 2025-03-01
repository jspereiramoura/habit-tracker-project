import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { DbModule } from "./config/db/db.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [DbModule, UsersModule, AuthModule]
})
export class AppModule {}
