import { Test, TestingModule } from "@nestjs/testing";
import { HabitService } from "./habit.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Habit } from "../entities/habit.entity";
import { Repository } from "typeorm";
import { Users } from "../../users/users.entity";
import { mockedUserRepository } from "../../../test/mocks/user.mocks";

describe("HabitService", () => {
  let service: HabitService;
  let repository: Repository<Habit>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HabitService,
        {
          provide: getRepositoryToken(Habit),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            delete: jest.fn()
          }
        },
        {
          provide: getRepositoryToken(Users),
          useValue: mockedUserRepository
        }
      ]
    }).compile();

    service = module.get<HabitService>(HabitService);
    repository = module.get<Repository<Habit>>(getRepositoryToken(Habit));
  });

  it("should create a habit", async () => {
    const user = { uuid: "fakeUuid" };
    const habit = new Habit();
    mockedUserRepository.findOne.mockResolvedValueOnce(user);
    const saveSpy = jest.spyOn(repository, "save").mockResolvedValueOnce(habit);
    await expect(service.createHabit(user.uuid, habit)).resolves.toStrictEqual(
      habit
    );
    expect(saveSpy).toHaveBeenCalledWith(habit);
  });

  it("should throw user not found when trying to create a habit without pass user in request", async () => {
    const user = { uuid: "fakeUuid" };
    const habit = new Habit();

    const saveSpy = jest.spyOn(repository, "save");
    await expect(service.createHabit(user.uuid, habit)).rejects.toThrow(
      "User not found"
    );
    expect(saveSpy).not.toHaveBeenCalled();
  });

  it("should get habits by user", async () => {
    const habits = [new Habit()];
    const findSpy = jest
      .spyOn(repository, "find")
      .mockResolvedValueOnce(habits);
    await expect(service.getHabitsByUser("fakeUuid")).resolves.toStrictEqual(
      habits
    );
    expect(findSpy).toHaveBeenCalledWith({
      where: { user: { uuid: "fakeUuid" } }
    });
  });

  it("should update a habit", async () => {
    const habit = { name: "old name", user: { uuid: "fakeUserID" } };
    const dto = { name: "new name" };
    const findOneSpy = jest
      .spyOn(repository, "findOne")
      .mockResolvedValueOnce(habit as Habit);

    await expect(
      service.updateHabit("fakeUserID", "fakeHabitId", dto)
    ).resolves.toEqual({ name: "new name", user: { uuid: "fakeUserID" } });

    expect(findOneSpy).toHaveBeenCalled();
  });

  it("should throw an error when habit is not found", async () => {
    const findOneSpy = jest
      .spyOn(repository, "findOne")
      .mockResolvedValueOnce(null);

    await expect(
      service.updateHabit("fakeUserID", "fakeHabitId", { name: "new name" })
    ).rejects.toThrow("Habit not found");

    expect(findOneSpy).toHaveBeenCalled();
  });

  it("should throw an error when user is not allowed to update habit", async () => {
    const habit = { name: "old name", user: { uuid: "anotherUserID" } };
    const findOneSpy = jest
      .spyOn(repository, "findOne")
      .mockResolvedValueOnce(habit as Habit);

    await expect(
      service.updateHabit("fakeUserID", "fakeHabitId", { name: "new name" })
    ).rejects.toThrow("You are not allowed to update this habit");

    expect(findOneSpy).toHaveBeenCalled();
  });

  it("should delete a habit", async () => {
    const deleteSpy = jest.spyOn(repository, "delete");
    await expect(
      service.deleteHabit("fakeHabitId", "fakeUserID")
    ).resolves.toBeUndefined();
    expect(deleteSpy).toHaveBeenCalledWith({
      id: "fakeHabitId",
      user: { uuid: "fakeUserID" }
    });
  });
});
