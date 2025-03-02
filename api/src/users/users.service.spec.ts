import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { mockedUser, mockedUserRepository } from "../../test/mocks/user.mocks";
import { Users } from "./users.entity";
import { UsersService } from "./users.service";

describe("UsersService", () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(Users), useValue: mockedUserRepository }
      ]
    }).compile();

    service = module.get<UsersService>(UsersService);

    mockedUserRepository.save.mockClear();
    mockedUserRepository.create.mockClear();
    mockedUserRepository.findOne.mockClear();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should return user by mail", async () => {
    mockedUserRepository.findOne.mockResolvedValue(mockedUser);

    const user = await service.findByMail(mockedUser.mail);

    expect(user).not.toBeNull();
    expect(user).toStrictEqual(mockedUser);
  });

  it("should return user by username", async () => {
    mockedUserRepository.findOne.mockResolvedValue(mockedUser);

    const user = await service.findByUsername(mockedUser.username);

    expect(user).not.toBeNull();
    expect(user).toStrictEqual(mockedUser);
  });

  it("should create user", async () => {
    mockedUserRepository.save.mockResolvedValue(mockedUser);
    mockedUserRepository.create.mockReturnValue(mockedUser);

    const user = await service.createUser(mockedUser);

    expect(user).not.toBeNull();
    expect(user).toStrictEqual(mockedUser);
  });
});
