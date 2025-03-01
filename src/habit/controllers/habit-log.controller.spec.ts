/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Test, TestingModule } from "@nestjs/testing";
import { HabitLogController } from "./habit-log.controller";
import { HabitLogService } from "../services/habit-log.service";
import { HabitStatus } from "../entities/habit-status.enum";

describe("HabitLogController", () => {
  let controller: HabitLogController;
  const mockHabitLogService = {
    updateHabitLog: jest.fn(),
    generateOrGetLogsForDay: jest.fn()
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HabitLogController],
      providers: [{ provide: HabitLogService, useValue: mockHabitLogService }]
    }).compile();

    controller = module.get<HabitLogController>(HabitLogController);
  });

  it("should return logs for specified date and user", async () => {
    const logs = [];
    const user = { sub: "123" };
    const date = new Date();
    mockHabitLogService.generateOrGetLogsForDay.mockResolvedValue(logs);

    await expect(
      controller.getLogsForDay({ date }, { user } as any)
    ).resolves.toBe(logs);
    expect(mockHabitLogService.generateOrGetLogsForDay).toHaveBeenCalledWith(
      user.sub,
      date
    );
  });

  it("should update habit log", async () => {
    const habitLogId = "123";
    const user = { sub: "123" };
    const body = { status: HabitStatus.COMPLETED };

    mockHabitLogService.updateHabitLog.mockResolvedValue(body);

    await expect(
      controller.updateLog(habitLogId, { user } as any, body)
    ).resolves.toBe(body);
    expect(mockHabitLogService.updateHabitLog).toHaveBeenCalledWith(
      habitLogId,
      user.sub,
      body
    );
  });
});
