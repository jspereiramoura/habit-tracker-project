import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UseGuards
} from "@nestjs/common";
import { Request } from "express";
import { JwtPayload } from "../../auth/auth.dto";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { Habit } from "../entities/habit.entity";
import { HabitService } from "../services/habit.service";
import { UpdateHabitDto, habitSchema } from "../dto/habit.dto";
import { ZodPipe } from "../../config/zod/zod.pipe";
import { UUIDTypes } from "uuid";

@Controller("habits")
@UseGuards(JwtAuthGuard)
export class HabitController {
  constructor(private readonly habitService: HabitService) {}

  @Get()
  getAllHabits(@Req() req: Request) {
    return this.habitService.getHabitsByUser((req.user as JwtPayload).sub);
  }

  @Post()
  async createHabit(@Req() req: Request, @Body() body: Habit) {
    const user = req.user as JwtPayload;
    return this.habitService.createHabit(user.sub, body);
  }

  @Patch(":id")
  updateHabit(
    @Req() req: Request,
    @Param("id") id: UUIDTypes,
    @Body(new ZodPipe(habitSchema)) body: UpdateHabitDto
  ) {
    return this.habitService.updateHabit(
      id,
      (req.user as JwtPayload).sub,
      body
    );
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteHabit(@Req() req: Request, @Param("id") id: UUIDTypes) {
    await this.habitService.deleteHabit(id, (req.user as JwtPayload).sub);
  }
}
