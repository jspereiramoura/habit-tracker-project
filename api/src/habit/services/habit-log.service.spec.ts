import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { HabitLog } from "../entities/habit-log.entity";
import { HabitStatus } from "../entities/habit-status.enum";
import { Habit } from "../entities/habit.entity";
import { HabitLogService } from "./habit-log.service";

describe("HabitLogService", () => {
  let service: HabitLogService;
  let habitRepository: Repository<Habit>;
  let habitLogRepository: Repository<HabitLog>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HabitLogService,
        {
          provide: getRepositoryToken(Habit),
          useValue: {
            find: jest.fn()
          }
        },
        {
          provide: getRepositoryToken(HabitLog),
          useValue: {
            find: jest.fn(),
            create: jest.fn(),
            save: jest.fn()
          }
        }
      ]
    }).compile();

    service = module.get<HabitLogService>(HabitLogService);
    habitRepository = module.get<Repository<Habit>>(getRepositoryToken(Habit));
    habitLogRepository = module.get<Repository<HabitLog>>(
      getRepositoryToken(HabitLog)
    );
  });

  it("should generate new log for specified date", async () => {
    const mockedUserId = "user1";
    const mockedDate = new Date(2025, 2, 1);
    const habits = [
      { id: "1", name: "Habit 1", user: { uuid: mockedUserId } },
      { id: "2", name: "Habit 2", user: { uuid: mockedUserId } }
    ];

    const currentLog = {
      id: "1",
      habit: habits[0],
      date: mockedDate,
      status: HabitStatus.COMPLETED
    };

    const missingLog = {
      habit: habits[1],
      date: mockedDate,
      status: HabitStatus.MISSED
    };

    const saveSpy = jest.fn().mockResolvedValue([missingLog]);
    (habitRepository.find as jest.Mock).mockResolvedValueOnce(habits);
    (habitLogRepository.find as jest.Mock).mockResolvedValueOnce([currentLog]);
    (habitLogRepository.create as jest.Mock).mockReturnValueOnce(missingLog);
    (habitLogRepository.save as jest.Mock).mockImplementationOnce(saveSpy);

    const result = await service.generateOrGetLogsForDay(
      mockedUserId,
      mockedDate
    );

    expect(result).toEqual([currentLog, missingLog]);
    expect(saveSpy).toHaveBeenCalledWith([missingLog]);
  });

  it("should return existing logs for specified date", async () => {
    const mockedUserId = "user1";
    const mockedDate = new Date(2025, 2, 1);
    const habits = [
      { id: "1", name: "Habit 1", user: { uuid: mockedUserId } },
      { id: "2", name: "Habit 2", user: { uuid: mockedUserId } }
    ];

    const currentLogs = [
      {
        id: "1",
        habit: habits[0],
        date: mockedDate,
        status: HabitStatus.COMPLETED
      },
      {
        id: "2",
        habit: habits[1],
        date: mockedDate,
        status: HabitStatus.MISSED
      }
    ];

    const saveSpy = jest.fn();
    (habitRepository.find as jest.Mock).mockResolvedValue(habits);
    (habitLogRepository.find as jest.Mock).mockResolvedValue(currentLogs);
    (habitLogRepository.save as jest.Mock).mockImplementationOnce(saveSpy);

    const result = await service.generateOrGetLogsForDay(
      mockedUserId,
      mockedDate
    );

    expect(result).toEqual(currentLogs);
    expect(saveSpy).not.toHaveBeenCalled();
  });
});
