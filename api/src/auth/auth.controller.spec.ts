import { Test, TestingModule } from "@nestjs/testing";
import { mockedUser } from "../../test/mocks/user.mocks";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

describe("AuthController", () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signIn: jest.fn(),
            signUp: jest.fn()
          }
        }
      ]
    }).compile();

    authService = module.get<AuthService>(AuthService);
    controller = module.get<AuthController>(AuthController);
  });

  it("should call authService.signIn", async () => {
    (authService.signIn as jest.Mock).mockResolvedValueOnce({
      token: "fakeToken"
    });

    await expect(
      controller.login({
        username: mockedUser.username,
        password: "some_password"
      })
    ).resolves.toStrictEqual({ token: "fakeToken" });
  });

  it("should call authService.signUp", async () => {
    (authService.signUp as jest.Mock).mockResolvedValueOnce({
      uuid: mockedUser.uuid,
      mail: mockedUser.mail,
      username: mockedUser.username
    });

    await expect(
      controller.register({
        mail: mockedUser.mail,
        password: "some_password",
        username: mockedUser.username
      })
    ).resolves.toStrictEqual({
      uuid: mockedUser.uuid,
      mail: mockedUser.mail,
      username: mockedUser.username
    });
  });
});
