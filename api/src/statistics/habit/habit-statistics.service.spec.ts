/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Test } from "@nestjs/testing";
import { HabitStatisticsService } from "./habit-statistics.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { HabitStatistics } from "./habit-statistics.entity";
import { Repository } from "typeorm";
import { HabitStatisticDto } from "./habit-statistics.dto";

describe("HabitStatisticsService", () => {
  let service: HabitStatisticsService;
  let mockedHabitStatisticsRepository: Repository<HabitStatistics>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        HabitStatisticsService,
        {
          provide: getRepositoryToken(HabitStatistics),
          useValue: {
            find: jest.fn()
          }
        }
      ]
    }).compile();

    service = module.get<HabitStatisticsService>(HabitStatisticsService);
    mockedHabitStatisticsRepository = module.get<Repository<HabitStatistics>>(
      getRepositoryToken(HabitStatistics)
    );
  });

  it("should return all habit statistics by user id", async () => {
    const fakeUserId = "fakeUuid";
    const fakeStatistics = [new HabitStatistics()];
    const toDtoSpy = jest.spyOn(fakeStatistics[0], "toDto");

    const findSpy = jest.spyOn(mockedHabitStatisticsRepository, "find");
    findSpy.mockResolvedValueOnce(fakeStatistics);

    toDtoSpy.mockReturnValueOnce(new HabitStatisticDto());

    const result = await service.findAllByUserId(fakeUserId);

    expect(findSpy).toHaveBeenCalled();
    expect(toDtoSpy).toHaveBeenCalled();
    expect(result).toEqual([expect.any(HabitStatisticDto)]);
  });
});
