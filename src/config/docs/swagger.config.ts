import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle("Owl Habit Tracker API")
    .setDescription("The Owl Habit Tracker API description")
    .setVersion("1.0")
    .addBasicAuth()
    .addSecurity("basic", {
      type: "http",
      scheme: "basic"
    })
    .build();

  const swaggerDoc = SwaggerModule.createDocument(app, config);

  const zodGen = new OpenApiGeneratorV3([]);

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
