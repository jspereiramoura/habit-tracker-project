import { Test, TestingModule } from "@nestjs/testing";
import { PasswordEncoderService } from "./password-encoder.service";

describe("PasswordEncoderService", () => {
  let service: PasswordEncoderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasswordEncoderService]
    }).compile();

    service = module.get<PasswordEncoderService>(PasswordEncoderService);
  });

  it("should hash a password", async () => {
    const password = "testPassword";
    const hashedPassword = await service.hashPassword(password);

    expect(hashedPassword).not.toBe(password);
    expect(hashedPassword).toMatch(/^\$2[ayb]\$.{56}$/);
  });

  it("should compare a password with its hash", async () => {
    const password = "testPassword";
    const hashedPassword = await service.hashPassword(password);
    const isMatch = await service.comparePassword(password, hashedPassword);

    expect(isMatch).toBeTruthy();
  });

  it("should return false for an invalid password", async () => {
    const password = "testPassword";
    const hashedPassword = await service.hashPassword(password);
    const isMatch = await service.comparePassword(
      "wrongPassword",
      hashedPassword
    );

    expect(isMatch).toBe(false);
  });
});
