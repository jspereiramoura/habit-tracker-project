import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service";
import { mockedUser, mockUsersService } from "../../test/mocks/user.mocks";
import { PasswordEncoderService } from "./password-encoder/password-encoder.service";
import { JwtService } from "@nestjs/jwt";

describe("AuthService", () => {
  let service: AuthService;
  const mockPasswordEncoderService = {
    hashPassword: jest.fn(),
    comparePassword: jest.fn()
  };
  const mockJwtService = {
    sign: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService
        },
        {
          provide: PasswordEncoderService,
          useValue: mockPasswordEncoderService
        },
        {
          provide: JwtService,
          useValue: mockJwtService
        }
      ]
    }).compile();

    service = module.get<AuthService>(AuthService);

    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("signIn", () => {
    it("should throw an error if not found user during sign in process", async () => {
      await expect(
        service.signIn({ username: "test", password: "test" })
      ).rejects.toThrow("Invalid Credentials");
    });

    it("should throw an error if password is invalid during sign in process", async () => {
      mockUsersService.findByUsername.mockResolvedValueOnce({
        id: 1,
        mail: "",
        username: "test",
        hash: "test"
      });

      await expect(
        service.signIn({ username: "test", password: "test" })
      ).rejects.toThrow("Invalid Credentials");
    });

    it("should return user if sign in process is successful", async () => {
      mockJwtService.sign.mockReturnValueOnce("test");
      mockUsersService.findByUsername.mockResolvedValueOnce(mockedUser);
      mockPasswordEncoderService.comparePassword.mockResolvedValueOnce(true);

      const user = await service.signIn({
        username: mockedUser.username,
        password: "some_password"
      });
      expect(user).toStrictEqual({
        access_token: "test",
        user: {
          uuid: mockedUser.uuid,
          mail: mockedUser.mail,
          username: mockedUser.username
        }
      });
    });
  });

  describe("signUp", () => {
    it("should throw an error if email is already in use", async () => {
      mockUsersService.findByMail.mockResolvedValueOnce(mockedUser);

      await expect(
        service.signUp({
          mail: mockedUser.mail,
          username: "test",
          password: "test"
        })
      ).rejects.toThrow("This email is already in use");
    });
    it("should throw an error if username is already in use", async () => {
      mockUsersService.findByMail.mockResolvedValueOnce(null);
      mockUsersService.findByUsername.mockResolvedValueOnce(mockedUser);

      await expect(
        service.signUp({
          mail: "test",
          username: mockedUser.username,
          password: "test"
        })
      ).rejects.toThrow("This username is already in use");
    });
    it("should return created user", async () => {
      mockUsersService.findByMail.mockResolvedValueOnce(null);
      mockUsersService.findByUsername.mockResolvedValueOnce(null);

      mockUsersService.createUser.mockResolvedValueOnce(mockedUser);

      mockPasswordEncoderService.hashPassword.mockResolvedValueOnce("test");

      const user = await service.signUp({
        mail: "test",
        username: "test",
        password: "test"
      });

      expect(user).toStrictEqual({
        uuid: mockedUser.uuid,
        mail: mockedUser.mail,
        username: mockedUser.username
      });
    });
  });
});
