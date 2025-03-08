/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Test, TestingModule } from "@nestjs/testing";

import { HabitStatisticDto } from "./habit/habit-statistics.dto";
import { HabitStatisticsService } from "./habit/habit-statistics.service";
import { StatisticsController } from "./statistics.controller";

describe("HabitController", () => {
  let controller: StatisticsController;
  let mockedHabitStatisticsService: HabitStatisticsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatisticsController],
      providers: [
        {
          provide: HabitStatisticsService,
          useValue: {
            findAllByUserId: jest.fn()
          }
        }
      ]
    }).compile();

    controller = module.get<StatisticsController>(StatisticsController);
    mockedHabitStatisticsService = module.get<HabitStatisticsService>(
      HabitStatisticsService
    );
  });

  it("should throws unauthorized exception", async () => {
    const user = undefined;

    await expect(controller.getUserStatistics({ user } as any)).rejects.toThrow(
      "User not found"
    );
  });

  it("should throws not found exception", async () => {
    const user = { sub: "123" };

    await expect(controller.getUserStatistics({ user } as any)).rejects.toThrow(
      "Habit statistics not found for user"
    );
  });

  it("should get all statistics", async () => {
    const user = { sub: "123" };
    const findAllByUserIdSpy = jest.spyOn(
      mockedHabitStatisticsService,
      "findAllByUserId"
    );

    findAllByUserIdSpy.mockResolvedValueOnce([new HabitStatisticDto()]);

    await expect(
      controller.getUserStatistics({ user } as any)
    ).resolves.toStrictEqual({
      habitStatistics: [expect.any(HabitStatisticDto)]
    });

    expect(findAllByUserIdSpy).toHaveBeenCalledWith(user.sub);
  });
});
