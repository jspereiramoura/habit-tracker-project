import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { DbModule } from "./config/db/db.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [DbModule, UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
