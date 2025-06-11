import {
  Injectable,
  NotFoundException,
  UnauthorizedException
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UUIDTypes } from "uuid";
import { Users } from "../../users/users.entity";
import { UpdateHabitDto } from "../dto/habit.dto";
import { Habit } from "../entities/habit.entity";

@Injectable()
export class HabitService {
  constructor(
    @InjectRepository(Habit)
    private readonly habitRepository: Repository<Habit>,
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>
  ) {}

  async createHabit(userId: UUIDTypes, habit: Habit): Promise<Habit> {
    const user = await this.userRepository.findOne({
      where: { uuid: userId.toString() }
    });

    if (!user) throw new UnauthorizedException("User not found");

    habit.user = user;
    return await this.habitRepository.save(habit);
  }

  async getHabitsByUser(userId: UUIDTypes): Promise<Habit[]> {
    return await this.habitRepository.find({
      where: { user: { uuid: userId.toString() } }
    });
  }

  async updateHabit(
    userId: UUIDTypes,
    habitId: UUIDTypes,
    dto: UpdateHabitDto
  ): Promise<Habit> {
    let habit = await this.habitRepository.findOne({
      where: { id: habitId.toString() },
      relations: ["user"]
    });

    if (!habit) throw new NotFoundException("Habit not found");
    if (habit.user.uuid !== userId) {
      throw new UnauthorizedException(
        "You are not allowed to update this habit"
      );
    }

    habit = {
      ...habit,
      ...dto
    };

    await this.habitRepository.save(habit);

    return habit;
  }

  async deleteHabit(id: UUIDTypes, userId: UUIDTypes) {
    await this.habitRepository.delete({
      id: id.toString(),
      user: { uuid: userId.toString() }
    });
  }
}
