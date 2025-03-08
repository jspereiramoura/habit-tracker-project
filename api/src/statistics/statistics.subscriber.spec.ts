/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test } from "@nestjs/testing";
import { DataSource } from "typeorm";
import { HabitLog } from "../habit/entities/habit-log.entity";
import { HabitStatistics } from "./habit/habit-statistics.entity";
import { HabitLogSubscriber } from "./statistics.subscriber";
import { HabitStatus } from "../habit/entities/habit-status.enum";

describe("HabitLogSubscriber", () => {
  let subscriber: HabitLogSubscriber;

  const mockedHabitLogRepository = {
    save: jest.fn(),
    countBy: jest.fn(),
    findOne: jest.fn()
  };
  const mockedHabitStatisticsRepository = {
    save: jest.fn(),
    create: jest.fn(),
    findOne: jest.fn()
  };

  const mockDataSource: DataSource = {
    subscribers: [],
    manager: {
      getRepository: jest.fn().mockImplementation(entity => {
        switch (entity) {
          case HabitLog:
            return mockedHabitLogRepository;
          case HabitStatistics:
            return mockedHabitStatisticsRepository;
        }
      })
    }
  } as any;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        HabitLogSubscriber,
        {
          provide: DataSource,
          useValue: mockDataSource
        }
      ]
    }).compile();

    subscriber = module.get<HabitLogSubscriber>(HabitLogSubscriber);
  });

  it("should listen to HabitLog entity", () => {
    expect(subscriber.listenTo()).toBe(HabitLog);
  });

  it.each(["afterInsert", "afterUpdate", "afterRemove"])(
    "should update habit statistics on %s a new habit log",
    async (eventType: "afterInsert" | "afterUpdate" | "afterRemove") => {
      const event = {
        ...mockDataSource,
        entity: { id: 1, habitId: 1, status: "MISSED" }
      };

      const mockedHabitStatistics = new HabitStatistics();
      mockedHabitLogRepository.countBy.mockResolvedValueOnce(5);
      mockedHabitLogRepository.countBy.mockResolvedValueOnce(3);
      mockedHabitLogRepository.findOne.mockResolvedValueOnce({
        status: HabitStatus.COMPLETED
      });

      mockedHabitStatisticsRepository.findOne.mockResolvedValueOnce(
        mockedHabitStatistics
      );

      const saveStatisticsSpy = jest.spyOn(
        mockedHabitStatisticsRepository,
        "save"
      );

      await expect(subscriber[eventType](event as any)).resolves.not.toThrow();

      expect(saveStatisticsSpy).toHaveBeenCalledWith(mockedHabitStatistics);
      expect(mockedHabitStatisticsRepository.create).not.toHaveBeenCalled();
    }
  );

  it("should create a new habit statistics if it does not exist", async () => {
    const event = {
      ...mockDataSource,
      entity: { id: 1, habitId: 100, status: "MISSED" }
    };

    const mockedHabitStatistics = new HabitStatistics();
    mockedHabitLogRepository.countBy.mockResolvedValueOnce(5);
    mockedHabitLogRepository.countBy.mockResolvedValueOnce(3);
    mockedHabitLogRepository.findOne.mockResolvedValueOnce({
      status: HabitStatus.COMPLETED
    });

    mockedHabitStatisticsRepository.findOne.mockResolvedValueOnce(undefined);
    mockedHabitStatisticsRepository.create.mockReturnValueOnce(
      mockedHabitStatistics
    );

    await expect(subscriber.afterInsert(event as any)).resolves.not.toThrow();
    expect(mockedHabitStatisticsRepository.create).toHaveBeenCalledWith({
      habit: { id: event.entity.habitId }
    });
  });

  it("should calculate the completion rate", () => {
    expect(subscriber["calculateRate"](5, 3)).toBe(60);
    expect(subscriber["calculateRate"](0, 0)).toBe(0);
  });

  it("should calculate the streak correctly", async () => {
    const event = {
      ...mockDataSource,
      entity: { id: 1, habitId: 1, status: HabitStatus.COMPLETED }
    };
    const mockedHabitStatistics = {
      status: HabitStatus.COMPLETED,
      streakCurrent: 3,
      streakLongest: 5
    };
    mockedHabitLogRepository.countBy.mockResolvedValueOnce(5);
    mockedHabitLogRepository.countBy.mockResolvedValueOnce(3);
    mockedHabitLogRepository.findOne.mockResolvedValueOnce({
      status: HabitStatus.COMPLETED
    });
    mockedHabitStatisticsRepository.findOne.mockResolvedValueOnce(
      mockedHabitStatistics
    );

    await expect(subscriber.afterInsert(event as any)).resolves.not.toThrow();

    expect(mockedHabitStatistics.streakCurrent).toBe(4);
    expect(mockedHabitStatistics.streakLongest).toBe(5);
  });

  it("should reset the streak if the latest log is missed", async () => {
    const event = {
      ...mockDataSource,
      entity: { id: 1, habitId: 1, status: HabitStatus.COMPLETED }
    };
    const mockedHabitStatistics = {
      status: HabitStatus.COMPLETED,
      streakCurrent: 3,
      streakLongest: 5
    };
    mockedHabitLogRepository.countBy.mockResolvedValueOnce(5);
    mockedHabitLogRepository.countBy.mockResolvedValueOnce(3);
    mockedHabitLogRepository.findOne.mockResolvedValueOnce({
      status: HabitStatus.MISSED
    });
    mockedHabitStatisticsRepository.findOne.mockResolvedValueOnce(
      mockedHabitStatistics
    );

    await expect(subscriber.afterInsert(event as any)).resolves.not.toThrow();

    expect(mockedHabitStatistics.streakCurrent).toBe(1);
    expect(mockedHabitStatistics.streakLongest).toBe(5);
  });

  it("should not update the streak if the habit is missed", async () => {
    const event = {
      ...mockDataSource,
      entity: { id: 1, habitId: 1, status: HabitStatus.MISSED }
    };
    const mockedHabitStatistics = {
      status: HabitStatus.COMPLETED,
      streakCurrent: 3,
      streakLongest: 5
    };
    mockedHabitLogRepository.countBy.mockResolvedValueOnce(5);
    mockedHabitLogRepository.countBy.mockResolvedValueOnce(3);
    mockedHabitLogRepository.findOne.mockResolvedValueOnce({
      status: HabitStatus.COMPLETED
    });
    mockedHabitStatisticsRepository.findOne.mockResolvedValueOnce(
      mockedHabitStatistics
    );

    await expect(subscriber.afterInsert(event as any)).resolves.not.toThrow();

    expect(mockedHabitStatistics.streakCurrent).toBe(3);
    expect(mockedHabitStatistics.streakLongest).toBe(5);
  });

  it("should update longest streak if the current streak is longer", async () => {
    const event = {
      ...mockDataSource,
      entity: { id: 1, habitId: 1, status: HabitStatus.COMPLETED }
    };
    const mockedHabitStatistics = {
      status: HabitStatus.COMPLETED,
      streakCurrent: 5,
      streakLongest: 3
    };
    mockedHabitLogRepository.countBy.mockResolvedValueOnce(5);
    mockedHabitLogRepository.countBy.mockResolvedValueOnce(3);
    mockedHabitLogRepository.findOne.mockResolvedValueOnce({
      status: HabitStatus.COMPLETED
    });
    mockedHabitStatisticsRepository.findOne.mockResolvedValueOnce(
      mockedHabitStatistics
    );

    await expect(subscriber.afterInsert(event as any)).resolves.not.toThrow();

    expect(mockedHabitStatistics.streakCurrent).toBe(6);
    expect(mockedHabitStatistics.streakLongest).toBe(6);
  });
});
