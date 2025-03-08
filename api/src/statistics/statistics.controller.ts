import {
  Controller,
  Get,
  NotFoundException,
  Req,
  UnauthorizedException,
  UseGuards
} from "@nestjs/common";
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse
} from "@nestjs/swagger";
import { Request } from "express";
import { JwtPayload } from "../auth/auth.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { HabitStatisticsService } from "./habit/habit-statistics.service";
import { StatisticsOutputDto } from "./statistics-output.dto";

@UseGuards(JwtAuthGuard)
@Controller("statistics")
export class StatisticsController {
  constructor(
    private readonly habitsStatisticsService: HabitStatisticsService
  ) {}

  @Get()
  @ApiOkResponse({
    type: StatisticsOutputDto
  })
  @ApiUnauthorizedResponse({
    description: "User not found in request"
  })
  @ApiNotFoundResponse({
    description: "User statistics not found"
  })
  async getUserStatistics(@Req() req: Request): Promise<StatisticsOutputDto> {
    const user = req.user as JwtPayload | undefined;

    if (!user || !user.sub) {
      throw new UnauthorizedException("User not found");
    }

    const habitStatistics = await this.habitsStatisticsService.findAllByUserId(
      user.sub
    );

    if (!habitStatistics) {
      throw new NotFoundException("Habit statistics not found for user");
    }

    return {
      habitStatistics
    };
  }
}
