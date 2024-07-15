import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/comment/entity/comment.entity'
import { BlogPostService } from 'src/blog-post/blog-post.service';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entity/user.entity';
import { BlogPost } from 'src/blog-post/entity/blog-post.entity';
import { CommentCreateDTO } from './dto/create-comment.input';
import { CommentUpdateDTO } from './dto/udpate-comment.input';


@Injectable()
export class CommentService {

    constructor(@InjectRepository(Comment) 
    private commentRepository: Repository<Comment>,
    private userService: UserService,
    ) { }

    async create(comment: CommentCreateDTO): Promise<Comment> {
        const { body, blogPostId, authorId } = comment        
        let newComment = this.commentRepository.create(comment);
        return this.commentRepository.save(newComment)
    }

    async findAll(): Promise<Comment[]> {
        return this.commentRepository.find({ relations: ['author'] });
    }

    async findOne(id: string): Promise<Comment> {
        const comment = this.commentRepository.findOne(id, { relations: ['author'] });
        if (!comment) {
            throw new NotFoundException(`Comment with ID: ${id} does not exist`);
          }
        return comment
    }

    async updateOne(id: string, updateComment: CommentUpdateDTO): Promise<Comment> {
        const comment = await this.findOne(id);
        if (!comment) {
          throw new NotFoundException(`Comment with ID: ${id} does not exist`);
        }
        const { body } = updateComment
        comment.body = body;

        await this.commentRepository.save(comment);
        return comment;
    }

    async deleteOne(id: string): Promise<string> {
        const result = await this.commentRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Comment with ID: ${id} does not exist`);
        }
        return 'Ok'
    }

    async findCommentsForBlogPost(id: string): Promise<Comment[]> {
        return this.commentRepository.find({ blogPostId: id })
    }

    async getAuthor(id: string): Promise<User> {
        return this.userService.findOne(id)
    }
}
