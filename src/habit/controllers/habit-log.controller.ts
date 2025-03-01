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
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiUnauthorizedResponse
} from "@nestjs/swagger";
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
import { HabitLogService } from "../services/habit-log.service";

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("habits/logs")
export class HabitLogController {
  constructor(private readonly habitLogService: HabitLogService) {}

  @Get()
  @ApiQuery({
    name: "date",
    required: true,
    type: String,
    example: "2021-01-01",
    format: "YYYY-MM-DD"
  })
  @ApiOkResponse()
  @ApiUnauthorizedResponse({
    description: "The user is needed to get your own habit resources"
  })
  async getLogsForDay(
    @Query("", new ZodPipe(logsQuerySchema)) queries: LogsQueryDto,
    @Req() req: Request
  ) {
    const user = req.user as JwtPayload | undefined;
    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    const logs = await this.habitLogService.generateOrGetLogsForDay(
      user.sub,
      queries.date
    );
    return logs;
  }

  @Patch(":habitLogId")
  @ApiOkResponse()
  @ApiUnauthorizedResponse({
    description:
      "The habit logs that user is trying to update does not belong to the user"
  })
  @ApiNotFoundResponse({
    description: "Habit log does not exist"
  })
  async updateLog(
    @Param("habitLogId") habitLogId: string,
    @Req() req: Request,
    @Body(new ZodPipe(updateLogSchema)) body: UpdateLogDto
  ) {
    const user = req.user as JwtPayload;
    return this.habitLogService.updateHabitLog(habitLogId, user.sub, body);
  }
}
