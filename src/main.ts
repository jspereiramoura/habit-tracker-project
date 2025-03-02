import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { setupSwagger } from "./config/docs/swagger.config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: process.env.CORS_ORIGIN,
      allowedHeaders: "Content-Type, Authorization, Accept",
      methods: "GET, POST, PUT, PATCH, DELETE, OPTIONS",
      credentials: true
    }
  });

  setupSwagger(app);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
