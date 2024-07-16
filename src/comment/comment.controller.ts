import { Controller, Get, Body, Post, Param, Patch, Delete, ValidationPipe, ParseUUIDPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Comment } from 'src/comment/entity/comment.entity';
import { CommentCreateDTO } from 'src/comment/dto/create-comment.input';
import { CommentService } from 'src/comment/comment.service';
import { CommentUpdateDTO } from './dto/udpate-comment.input';
import { AddressValidationPipe } from 'src/pipes/author-validation-pipe';


@ApiTags('Comment')
@ApiBearerAuth()
@Controller('comments')
export class CommentController {
    constructor(private readonly commentService: CommentService) { }

    @ApiCreatedResponse({ type: Comment })
    @Post()
    async create(@Body(ValidationPipe, AddressValidationPipe) post: CommentCreateDTO ): Promise<Comment> {
        const result = await this.commentService.create(post);
        return result;
    }

    @ApiOkResponse({ type: Post, isArray: true })
    @Get()
    async findAll(
    ): Promise<Comment[]> {
        const comments = await this.commentService.findAll();
        return comments;
    }

    @ApiOkResponse({ type: Post })
    @Get(':id')
    async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<Comment> {
        const comment = await this.commentService.findOne(id);
        return comment;
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
