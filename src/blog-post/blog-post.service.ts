import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { UserService } from 'src/user/user.service';
import { BlogPost } from 'src/blog-post/entity/blog-post.entity';
import { BlogPostCreateDTO } from 'src/blog-post/dto/create-blog-post.input';
import { User } from 'src/user/entity/user.entity';
import { CommentService } from 'src/comment/comment.service';
import { Comment } from 'src/comment/entity/comment.entity'
import { BlogPostUpdateDTO } from 'src/blog-post/dto/update-blog-post.input';
import { CacheControl } from 'src/utils/decorators/cache-control.decorator'



@Injectable()
@CacheControl({})
export class BlogPostService {

    constructor(
        @InjectRepository(BlogPost) private blogPostRepository: Repository<BlogPost>,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private userService: UserService,
        private commentService: CommentService,
    ) { }

    async create(post: BlogPostCreateDTO): Promise<BlogPost> {
        const { title, body, authorId } = post        
        let newPost = this.blogPostRepository.create(post);
        return this.blogPostRepository.save(newPost)
    }

    async findAll(): Promise<BlogPost[]> {
        // use cache if present
        const cacheKey = 'getAllBlogPosts';
        const cachedResponse = await this.cacheManager.get<string>(cacheKey);
        if (cachedResponse) {
            return cachedResponse as unknown as BlogPost[];
        }

        // query data
        const response = await this.blogPostRepository.find({ relations: ['author', 'comments'] });

        // cache acquired data
        await this.cacheManager.set(cacheKey, response);

        return response;
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
