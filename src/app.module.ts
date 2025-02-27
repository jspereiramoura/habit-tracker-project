import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DbModule } from "./config/db/db.module";

@Module({
  imports: [DbModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
