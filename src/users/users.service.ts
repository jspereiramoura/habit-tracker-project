import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./users.dto";
import { Users } from "./users.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>
  ) {}

  async findByMail(mail: string) {
    return await this.userRepository.findOne({ where: { mail } });
  }
  async findByUsername(username: string) {
    return await this.userRepository.findOne({ where: { username } });
  }

  async createUser(user: CreateUserDto) {
    const createdUser = this.userRepository.create({
      mail: user.mail,
      hash: user.hash,
      username: user.username
    });

    return this.userRepository.save(createdUser);
  }
}
