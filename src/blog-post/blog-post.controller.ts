import { Controller, Inject, Get, Body, Post, Param, Patch, Delete, ParseUUIDPipe, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { BlogPost } from 'src/blog-post/entity/blog-post.entity';
import { BlogPostCreateDTO } from 'src/blog-post/dto/create-blog-post.input';
import { BlogPostService } from 'src/blog-post/blog-post.service';
import { BlogPostUpdateDTO } from './dto/update-blog-post.input';
import { AddressValidationPipe } from 'src/utils/pipes/author-validation-pipe';
import { NotificationGateway } from 'src/gateway/gateway';


@ApiTags('BlogPost')
@ApiBearerAuth()
@Controller('blog-posts')
export class BlogPostController {
    constructor(
        private readonly blogPostService: BlogPostService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private readonly notificationGateway: NotificationGateway,
    ) { }

    @ApiCreatedResponse({ type: BlogPost })
    @Post()
    async create(
        @Body(ValidationPipe, AddressValidationPipe) blogPost: BlogPostCreateDTO
    ): Promise<BlogPost> {
        const result = await this.blogPostService.create(blogPost);
        // emit notification about new blog post
        this.notificationGateway.onNewBlogPost(blogPost)
        return result;
    }

    @ApiOkResponse({ type: BlogPost, isArray: true })
    @Get()
    async findAll(
    ): Promise<BlogPost[]> {
        // use cache if present
        const cacheKey = 'getAllBlogPosts';
        const cachedResponse = await this.cacheManager.get<string>(cacheKey);
        if (cachedResponse) {
            return cachedResponse as unknown as BlogPost[];
        }

        // query data
        const response = await this.blogPostService.findAll();

        // cache acquired data
        await this.cacheManager.set(cacheKey, response);

        return response;
    }

    @ApiOkResponse({ type: BlogPost })
    @Get(':id')
    async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<BlogPost> {
        // use cache if present
        const cacheKey = `getBlogPost - ${id}`;
        const cachedResponse = await this.cacheManager.get<string>(cacheKey);
        if (cachedResponse) {
            return cachedResponse as unknown as BlogPost;
        }

        // query data
        const response = await this.blogPostService.findOne(id);

        // cache acquired data
        await this.cacheManager.set(cacheKey, response)

        return response;
    }

    @ApiOkResponse({ type: BlogPost })
    @Patch(':id')
    async updateOne(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() updateBlogPost: BlogPostUpdateDTO
    ) {
        const updatedBlogPost = await this.blogPostService.updateOne(id, updateBlogPost);
        return updatedBlogPost;
    }

    @ApiOkResponse({ type: String })
    @Delete(':id')
    deleteLabel(@Param('id', new ParseUUIDPipe()) id: string): Promise<string> {
        return this.blogPostService.deleteOne(id);
    }
    
}
