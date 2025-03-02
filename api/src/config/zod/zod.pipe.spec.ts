import { BadRequestException } from "@nestjs/common";
import { z } from "zod";
import { ZodPipe } from "./zod.pipe";

describe("ZodPipePipe", () => {
  it("should transform valid value", () => {
    const schema = z.string();
    const pipe = new ZodPipe(schema);
    const value = "valid string";

    expect(pipe.transform(value)).toBe(value);
  });

  it("should throw BadRequestException for invalid value", () => {
    const schema = z.string().length(6);
    const pipe = new ZodPipe(schema);
    const value = 123;

    try {
      pipe.transform(value);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error).toHaveProperty("message");
    }
  });

  it("should rethrow non-ZodError errors", () => {
    const schema = z.string();
    const pipe = new ZodPipe(schema);
    const value = "valid string";

    jest.spyOn(schema, "parse").mockImplementation(() => {
      throw new Error("Unexpected error");
    });

    expect(() => pipe.transform(value)).toThrow("Unexpected error");
  });
});
