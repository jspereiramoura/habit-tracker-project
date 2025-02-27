import { Users } from "../../src/users/users.entity";

export const mockedUser: Users = {
  uuid: "55ed4505-109d-45b8-bf91-e50e2259643d",
  hash: "hashedPass",
  mail: "test@test.com",
  username: "test"
};

export const mockedUserRepository = {
  save: jest.fn(),
  create: jest.fn(),
  findOne: jest.fn()
};

export const mockUsersService = {
  findByMail: jest.fn(),
  findByUsername: jest.fn(),
  createUser: jest.fn()
};
