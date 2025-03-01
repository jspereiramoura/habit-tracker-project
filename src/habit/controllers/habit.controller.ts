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
  Res,
  UnauthorizedException,
  UseGuards
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiUnauthorizedResponse
} from "@nestjs/swagger";
import { Request, Response } from "express";
import { UUIDTypes } from "uuid";
import { JwtPayload } from "../../auth/auth.dto";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { ZodPipe } from "../../config/zod/zod.pipe";
import { UpdateHabitDto, habitSchema } from "../dto/habit.dto";
import { Habit } from "../entities/habit.entity";
import { HabitService } from "../services/habit.service";

@Controller("habits")
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class HabitController {
  constructor(private readonly habitService: HabitService) {}

  @Get()
  @ApiOkResponse({
    type: Habit,
    isArray: true
  })
  @ApiUnauthorizedResponse()
  getAllHabits(@Req() req: Request) {
    const user = req.user;

    if (!user) {
      throw new UnauthorizedException("Unauthorized");
    }

    return this.habitService.getHabitsByUser((user as JwtPayload).sub);
  }

  @Post()
  @ApiCreatedResponse({
    description: "The record has been successfully created.",
    type: Habit,
    headers: {
      Location: {
        description: "The URL of the new resource.",
        schema: {
          type: "string",
          format: "uri"
        }
      }
    }
  })
  @ApiUnauthorizedResponse()
  async createHabit(
    @Req() req: Request,
    @Body() body: Habit,
    @Res() res: Response
  ) {
    const user = req.user as JwtPayload;
    const createdHabit = await this.habitService.createHabit(user.sub, body);
    res.setHeader("Location", `/habits/${createdHabit.id.toString()}`);
    return createdHabit;
  }

  @Patch(":id")
  @ApiBody({
    schema: { $ref: "#/components/schemas/Habit" }
  })
  @ApiOkResponse({
    type: Habit
  })
  @ApiUnauthorizedResponse({
    description: "This habit does not belong to the user"
  })
  @ApiNotFoundResponse({
    description: "Habit not found"
  })
  @ApiParam({ name: "id", type: "string", format: "uuid" })
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
  @ApiNoContentResponse()
  @ApiParam({ name: "id", type: "string", format: "uuid" })
  async deleteHabit(@Req() req: Request, @Param("id") id: UUIDTypes) {
    await this.habitService.deleteHabit(id, (req.user as JwtPayload).sub);
  }
}
