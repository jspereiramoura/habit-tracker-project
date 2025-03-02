import { describe, it, expect } from "vitest";
import parseDate from "./parseDate";

describe("Utils: parseDate", () => {
  it("should parse a date correctly", () => {
    const date = new Date(2023, 9, 25);
    const result = parseDate(date);

    expect(result.day).toBe(25);
    expect(result.dayOfWeek).toBe("Quarta");
    expect(result.month).toBe("Outubro");
    expect(result.year).toBe(2023);
    expect(result.toString()).toBe("25 de Outubro de 2023");
  });

  it("should parse another date correctly", () => {
    const date = new Date(2022, 0, 1);
    const result = parseDate(date);

    expect(result.day).toBe(1);
    expect(result.dayOfWeek).toBe("Sábado");
    expect(result.month).toBe("Janeiro");
    expect(result.year).toBe(2022);
    expect(result.toString()).toBe("1 de Janeiro de 2022");
  });

  it("should handle leap year dates correctly", () => {
    const date = new Date(2020, 1, 29);
    const result = parseDate(date);

    expect(result.day).toBe(29);
    expect(result.dayOfWeek).toBe("Sábado");
    expect(result.month).toBe("Fevereiro");
    expect(result.year).toBe(2020);
    expect(result.toString()).toBe("29 de Fevereiro de 2020");
  });

  it("should handle end of year dates correctly", () => {
    const date = new Date(2023, 11, 31);
    const result = parseDate(date);

    expect(result.day).toBe(31);
    expect(result.dayOfWeek).toBe("Domingo");
    expect(result.month).toBe("Dezembro");
    expect(result.year).toBe(2023);
    expect(result.toString()).toBe("31 de Dezembro de 2023");
  });
});
