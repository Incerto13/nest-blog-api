import { Inject } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entity/user.entity';
import { UserCreateDTO } from './dto/create-user.input';



@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) { }

  @Mutation(() => User)
  createUser(@Args('userInput') user: UserCreateDTO) {
    return this.userService.create(user);
  }

  @Query(() => [User], { name: 'getAllUsers' })
  async findAll() {
      // use cache if present
      const cacheKey = 'getAllUsers';
      const cachedResponse = await this.cacheManager.get<string>(cacheKey);
      if (cachedResponse) {
        return cachedResponse;
      }

      // query data
      const response = await this.userService.findAll();

      // cache acquired data
      await this.cacheManager.set(cacheKey, response);

      return response
  }

  @Query(() => User, { name: 'getUser' })
  async findOne(@Args('id') id: string) {
      // use cache if present
      const cacheKey = `getUser - ${id}`;
      const cachedResponse = await this.cacheManager.get<string>(cacheKey);
      if (cachedResponse) {
        return cachedResponse;
      }

      // query data 
      const response = await this.userService.findOne(id);

      // cache acquired data
      await this.cacheManager.set(cacheKey, response);

      return response
  }
}
