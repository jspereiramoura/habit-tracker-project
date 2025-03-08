import { createIdFromText } from "./createIdFromText";

describe("Utils: createIdFromText", () => {
  it.each`
    text                                     | parsedText
    ${"normal"}                              | ${"normal"}
    ${"Another Title"}                       | ${"another_title"}
    ${"Title with ^&*() special characters"} | ${"title_with_special_characters"}
    ${"Title with numbers 1234567890"}       | ${"title_with_numbers_1234567890"}
  `("should parse $text to $parsedText", ({ text, parsedText }) => {
    const result = createIdFromText(text);
    expect(result).toBe(parsedText);
  });
});
