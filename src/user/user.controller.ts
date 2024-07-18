import { Controller, Get, Post, Body, Param, Patch, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entity/user.entity';
import { UserCreateDTO } from './dto/create-user.input';
import { UserService } from './user.service';
import { UserUpdateDTO } from './dto/update-user-input';

@ApiTags('User')
@ApiBearerAuth()
@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService,
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
        return await this.userService.findAll();
    }

    @ApiOkResponse({ type: User })
    @Get(':id')
    async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<User> {
        return await this.userService.findOne(id);
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
