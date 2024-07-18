import { Controller, Get, Body, Post, Param, Patch, Delete, ValidationPipe, ParseUUIDPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Comment } from 'src/comment/entity/comment.entity';
import { CommentCreateDTO } from 'src/comment/dto/create-comment.input';
import { CommentService } from 'src/comment/comment.service';
import { CommentUpdateDTO } from './dto/udpate-comment.input';
import { AuthorValidationPipe } from 'src/utils/pipes/author-validation-pipe';
import { NotificationGateway } from 'src/gateway/gateway';


@ApiTags('Comment')
@ApiBearerAuth()
@Controller('comments')
export class CommentController {
    constructor(
        private readonly commentService: CommentService,
        private readonly notificationGateway: NotificationGateway
    ) { }

    @ApiCreatedResponse({ type: Comment })
    @Post()
    async create(@Body(ValidationPipe, AuthorValidationPipe) comment: CommentCreateDTO ): Promise<Comment> {
        const result = await this.commentService.create(comment);
        // emit notification about new blog post
        this.notificationGateway.onNewComment(comment)
        return result;
    }

    @ApiOkResponse({ type: Post, isArray: true })
    @Get()
    async findAll(
    ): Promise<Comment[]> {
        // query data
        return await this.commentService.findAll();
    }

    @ApiOkResponse({ type: Post })
    @Get(':id')
    async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Comment> {
        return await this.commentService.findOne(id);
    }

    @ApiOkResponse({ type: Comment })
    @Patch(':id')
    async updateOne(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() updateComment: CommentUpdateDTO
    ) {
        const updatedComment = await this.commentService.updateOne(id, updateComment);
        return updatedComment;
    }

    @ApiOkResponse({ type: String })
    @Delete(':id')
    deleteLabel(@Param('id', new ParseUUIDPipe()) id: string): Promise<string> {
        return this.commentService.deleteOne(id);
    }
}
