import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { BlogPost } from 'src/blog-post/entity/blog-post.entity';
import { BlogPostCreateDTO } from 'src/blog-post/dto/create-blog-post.input';
import { User } from 'src/user/entity/user.entity';
import { CommentService } from 'src/comment/comment.service';
import { Comment } from 'src/comment/entity/comment.entity'
import { BlogPostUpdateDTO } from './dto/update-blog-post.input';


@Injectable()
export class BlogPostService {

    constructor(@InjectRepository(BlogPost) private blogPostRepository: Repository<BlogPost>,
        private userService: UserService,
        private commentService: CommentService,
    ) { }

    async create(post: BlogPostCreateDTO): Promise<BlogPost> {
        const { title, body, authorId } = post        
        let newPost = this.blogPostRepository.create(post);
        return this.blogPostRepository.save(newPost)
    }

    async findAll(): Promise<BlogPost[]> {
        return this.blogPostRepository.find({ relations: ['author', 'comments'] });
    }

    async findOne(id: string): Promise<BlogPost> {
        const blogPost = this.blogPostRepository.findOne(id, { relations: ['author', 'comments'] });
        if (!blogPost) {
            throw new NotFoundException(`BlogPost with ID: ${id} does not exist`);
          }
        return blogPost
    }

    async updateOne(id: string, updateBlogPost: BlogPostUpdateDTO): Promise<BlogPost> {
        const blogPost = await this.findOne(id);
        if (!blogPost) {
          throw new NotFoundException(`BlogPost with ID: ${id} does not exist`);
        }
        const { title, body } = updateBlogPost
        blogPost.title = title;
        blogPost.body = body;

        await this.blogPostRepository.save(blogPost);
        return blogPost;
    }
    
    async deleteOne(id: string): Promise<string> {
        const result = await this.blogPostRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`BlogPost with ID: ${id} does not exist`);
        }
        return 'Ok'
    }

    async getAuthor(id: string): Promise<User> {
        return this.userService.findOne(id)
    }

    async getComments(id: string): Promise<Comment[]> {
        return this.commentService.findCommentsForBlogPost(id)
    }
}
