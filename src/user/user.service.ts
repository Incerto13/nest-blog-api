import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { UserCreateDTO } from './dto/create-user.input';
import { User } from './entity/user.entity';
import { UserUpdateDTO } from './dto/update-user-input';
import { CacheControl } from '../utils/decorators/cache-control.decorator'



@Injectable()
@CacheControl({})
export class UserService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) { }

  async create(user: UserCreateDTO): Promise<User> {
    let newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser)
  }

  async findAll(): Promise<User[]> {
    // use cache if present
    const cacheKey = 'getAllUsers';
    const cachedResponse = await this.cacheManager.get<string>(cacheKey);
    if (cachedResponse) {
        return cachedResponse as unknown as User[];
    }

    // query data
    const response = this.userRepository.find({
      relations: ['blogPosts', 'comments']
    });

    // cache acquired data
    await this.cacheManager.set(cacheKey, response);

    return response;
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