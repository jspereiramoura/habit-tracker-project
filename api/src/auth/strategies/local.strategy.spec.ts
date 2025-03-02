import { LocalStrategy } from "./local.strategy";
import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "../auth.service";
import { mockedUser } from "../../../test/mocks/user.mocks";

describe("Authentication LocalStrategy", () => {
  let strategy: LocalStrategy;

  const mockAuthService = {
    validateUser: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocalStrategy,
        {
          provide: AuthService,
          useValue: mockAuthService
        }
      ]
    }).compile();

    strategy = module.get<LocalStrategy>(LocalStrategy);
    jest.clearAllMocks();
  });

  it("should validate user by mail", async () => {
    const password = "some_password";
    const identifier = mockedUser.mail;
    mockAuthService.validateUser.mockResolvedValue(mockedUser);

    await expect(
      strategy.validate(identifier, password)
    ).resolves.toStrictEqual(mockedUser);

    expect(mockAuthService.validateUser).toHaveBeenCalledWith({
      password,
      mail: identifier
    });
  });

  it("should validate user by username", async () => {
    const password = "some_password";
    const identifier = mockedUser.username;
    mockAuthService.validateUser.mockResolvedValue(mockedUser);

    await expect(
      strategy.validate(identifier, password)
    ).resolves.toStrictEqual(mockedUser);

    expect(mockAuthService.validateUser).toHaveBeenCalledWith({
      password,
      username: identifier
    });
  });

  it("should throw an error if user is not found", async () => {
    const password = "some_password";
    const identifier = "unknown_identifier";
    mockAuthService.validateUser.mockResolvedValue(null);

    await expect(strategy.validate(identifier, password)).rejects.toThrow(
      "Unauthorized"
    );
  });
});
