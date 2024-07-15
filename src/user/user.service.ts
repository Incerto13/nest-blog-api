import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCreateDTO } from 'src/user/dto/create-user.input';
import { User } from './entity/user.entity';
import { UserUpdateDTO } from './dto/update-user-input';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

  async create(user: UserCreateDTO): Promise<User> {
    let newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser)
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: ['blogPosts', 'comments']
    });
  }

  async findOne(id: string): Promise<User> {
      const user = await this.userRepository.findOne(id, { relations: ['blogPosts', 'comments'] });
      if (!user) {
        throw new NotFoundException(`User with ID: ${id} does not exist`);
      }
      return user
  }

  async updateOne(id: string, updateUser: UserUpdateDTO): Promise<User> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID: ${id} does not exist`);
    }
    const { name } = updateUser
    user.name = name;
    await this.userRepository.save(user);
    return user;
  }

  async deleteOne(id: string): Promise<string> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID: ${id} does not exist`);
    }
    return 'Ok'
  }
}