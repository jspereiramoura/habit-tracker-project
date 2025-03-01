/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Test, TestingModule } from "@nestjs/testing";
import { HabitService } from "../services/habit.service";
import { HabitController } from "./habit.controller";

describe("HabitController", () => {
  let controller: HabitController;
  const habitServiceMock = {
    getHabitsByUser: jest.fn(),
    createHabit: jest.fn(),
    updateHabit: jest.fn(),
    deleteHabit: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HabitController],
      providers: [
        {
          provide: HabitService,
          useValue: habitServiceMock
        }
      ]
    }).compile();

    controller = module.get<HabitController>(HabitController);
  });

  it("should get all habits", async () => {
    const user = { sub: "123" };
    habitServiceMock.getHabitsByUser.mockResolvedValueOnce([]);
    await expect(
      controller.getAllHabits({ user } as any)
    ).resolves.toStrictEqual([]);
    expect(habitServiceMock.getHabitsByUser).toHaveBeenCalledWith(user.sub);
  });

  it("should create a habit", async () => {
    const user = { sub: "123" };
    const habit: any = { name: "habit" };
    habitServiceMock.createHabit.mockResolvedValueOnce(habit);
    await expect(
      controller.createHabit({ user } as any, habit)
    ).resolves.toStrictEqual(habit);
    expect(habitServiceMock.createHabit).toHaveBeenCalledWith(user.sub, habit);
  });

  it("should update a habit", async () => {
    const user = { sub: "123" };
    const habitId = "456";
    const dto = { name: "habit" };
    habitServiceMock.updateHabit.mockResolvedValueOnce(dto);
    await expect(
      controller.updateHabit({ user } as any, habitId, dto)
    ).resolves.toStrictEqual(dto);
    expect(habitServiceMock.updateHabit).toHaveBeenCalledWith(
      habitId,
      user.sub,
      dto
    );
  });

  it("should delete a habit", async () => {
    const user = { sub: "123" };
    const habitId = "456";
    await controller.deleteHabit({ user } as any, habitId);
    expect(habitServiceMock.deleteHabit).toHaveBeenCalledWith(
      habitId,
      user.sub
    );
  });
});
