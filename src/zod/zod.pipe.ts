import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { ZodError, ZodTypeAny } from "zod";

@Injectable()
export class ZodPipe implements PipeTransform {
  constructor(private readonly schema: ZodTypeAny) {}

  transform(value: unknown) {
    try {
      this.schema.parse(value);
      return value;
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException(error);
      }

      throw error;
    }
  }
}
