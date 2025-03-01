import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  Req,
  UnauthorizedException,
  UseGuards
} from "@nestjs/common";
import { HabitLogService } from "../services/habit-log.service";
import { Request } from "express";
import { JwtPayload } from "../../auth/auth.dto";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { ZodPipe } from "../../config/zod/zod.pipe";
import {
  LogsQueryDto,
  logsQuerySchema,
  UpdateLogDto,
  updateLogSchema
} from "../dto/habit-log.dto";

@UseGuards(JwtAuthGuard)
@Controller("habits/logs")
export class HabitLogController {
  constructor(private readonly habitLogService: HabitLogService) {}

  @Get()
  async getLogsForDay(
    @Query("", new ZodPipe(logsQuerySchema)) queries: LogsQueryDto,
    @Req() req: Request
  ) {
    const user = req.user as JwtPayload;

    const logs = await this.habitLogService.generateOrGetLogsForDay(
      user.sub,
      queries.date
    );
    return logs;
  }

  @Patch(":habitLogId")
  async updateLog(
    @Param("habitLogId") habitLogId: string,
    @Req() req: Request,
    @Body(new ZodPipe(updateLogSchema)) body: UpdateLogDto
  ) {
    const user = req.user as JwtPayload;
    return this.habitLogService.updateHabitLog(habitLogId, user.sub, body);
  }
}
