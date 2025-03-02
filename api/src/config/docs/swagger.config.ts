import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { signInSchema, signUpSchema } from "../../auth/auth.dto";
import {
  logsQuerySchema,
  updateLogSchema
} from "../../habit/dto/habit-log.dto";
import {
  createHabitSchema,
  updateHabitSchema
} from "../../habit/dto/habit.dto";

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle("Owl Habit Tracker API")
    .setDescription("The Owl Habit Tracker API description")
    .setVersion("1.0")
    .addBearerAuth({
      type: "http",
      scheme: "Bearer",
      bearerFormat: "JWT",
      in: "Header"
    })
    .build();

  const swaggerDoc = SwaggerModule.createDocument(app, config);

  const zodGen = new OpenApiGeneratorV3([
    signInSchema,
    signUpSchema,
    createHabitSchema,
    updateHabitSchema,
    updateLogSchema,
    logsQuerySchema
  ]);

  const zodComponents = zodGen.generateComponents();

  swaggerDoc.components = {
    ...swaggerDoc.components,
    ...zodComponents,
    schemas: {
      ...swaggerDoc.components?.schemas,
      ...zodComponents.components?.schemas,
      ...{}
    }
  };

  SwaggerModule.setup("api", app, swaggerDoc);
}
