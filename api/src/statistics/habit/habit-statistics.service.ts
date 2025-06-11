import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UUIDTypes } from "uuid";
import { HabitStatistics } from "./habit-statistics.entity";
import { HabitStatisticDto } from "./habit-statistics.dto";

@Injectable()
export class HabitStatisticsService {
  constructor(
    @InjectRepository(HabitStatistics)
    private readonly habitStatisticRepository: Repository<HabitStatistics>
  ) {}

  async findAllByUserId(userId: UUIDTypes): Promise<HabitStatisticDto[]> {
    const searchedEntities = await this.habitStatisticRepository.find({
      where: { habit: { user: { uuid: userId.toString() } } },
      relations: ["habit"]
    });

    return searchedEntities.map(statistic => statistic.toDto());
  }
}
