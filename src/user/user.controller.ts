import { Controller, Inject, Get, Post, Body, Param, Patch, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { User } from 'src/user/entity/user.entity';
import { UserCreateDTO } from 'src/user/dto/create-user.input';
import { UserService } from 'src/user/user.service';
import { UserUpdateDTO } from 'src/user/dto/update-user-input';

@ApiTags('User')
@ApiBearerAuth()
@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) { }

    @ApiCreatedResponse({ type: User })
    @Post()
    async create(@Body() user: UserCreateDTO ): Promise<User> {
        const result = await this.userService.create(user);
        return result;
    }

    @ApiOkResponse({ type: User, isArray: true })
    @Get()
    async findAll(
    ): Promise<User[]> {
        // use cache if present
        const cacheKey = 'getAllUsers';
        const cachedResponse = await this.cacheManager.get<string>(cacheKey);
        if (cachedResponse) {
            return cachedResponse as unknown as User[];
        }

        // query data
        const response = await this.userService.findAll();

        // cache acquired data
        await this.cacheManager.set(cacheKey, response);

        return response;
    }

    @ApiOkResponse({ type: User })
    @Get(':id')
    async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<User> {
        // use cache if present
        const cacheKey = `getUser - ${id}`;
        const cachedResponse = await this.cacheManager.get<string>(cacheKey);
        if (cachedResponse) {
            return cachedResponse as unknown as User;
        }

        // query data
        const response = await this.userService.findOne(id);

        // cache acquired data
        await this.cacheManager.set(cacheKey, response);

        return response
    }

    @ApiOkResponse({ type: User })
    @Patch(':id')
    async updateOne(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() updatUser: UserUpdateDTO
    ) {
        const updatedUser = await this.userService.updateOne(id, updatUser);
        return updatedUser;
    }

    @ApiOkResponse({ type: String })
    @Delete(':id')
    deleteLabel(@Param('id', new ParseUUIDPipe()) id: string): Promise<string> {
        return this.userService.deleteOne(id);
    }
}
