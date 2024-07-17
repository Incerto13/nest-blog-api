import { Inject } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { BlogPostCreateDTO } from 'src/blog-post/dto/create-blog-post.input';
import { BlogPostService } from 'src/blog-post/blog-post.service';
import { BlogPost } from 'src/blog-post/entity/blog-post.entity'
import { User } from 'src/user/entity/user.entity';
import { CacheControl } from 'src/utils/decorators/cache-control.decorator'
import { NotificationGateway } from 'src/gateway/gateway';


@Resolver(() => BlogPost)
export class BlogPostResolver {
    constructor(
        private blogPostService: BlogPostService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private readonly notificationGateway: NotificationGateway
    ) { }

    @Mutation(() => BlogPost, { name: "createBlogPost" })
    async create(@Args('blogPostInput') blogPost: BlogPostCreateDTO) {
        const response = await this.blogPostService.create(blogPost)
        // emit notification about new blog post
        this.notificationGateway.onNewBlogPost(blogPost)
        return response
    }

    @Query(() => [BlogPost], { name: 'getAllBlogPosts' })
    async findAll() {
        // use cache if present
        const cacheKey = 'getAllBlogPosts';
        const cachedResponse = await this.cacheManager.get<string>(cacheKey);
        if (cachedResponse) {
            return cachedResponse as unknown as BlogPost[];
        }

        // query data
        const response = await this.blogPostService.findAll();

        // cache acquired data
        await this.cacheManager.set(cacheKey, response)

        return response
    }

    @Query(() => BlogPost, { name: 'getBlogPost'})
    async findOne(@Args("id") id: string) {
        // use cache if present
        const cacheKey = `getBlogPost - ${id}`;
        const cachedResponse = await this.cacheManager.get<string>(cacheKey);
        if (cachedResponse) {
            return cachedResponse as unknown as BlogPost;
        }

        // query data
        const response = await this.blogPostService.findOne(id)

        // cache acquired data
        await this.cacheManager.set(cacheKey, response)

        return response;
    }

    @CacheControl({ inheritMaxAge: true })
    @ResolveField(() => Comment)
    comments(@Parent() blogPost: BlogPost) {
        return this.blogPostService.getComments(blogPost.id)
    }

    @CacheControl({ inheritMaxAge: true })
    @ResolveField(() => User)
    author(@Parent() blogPost: BlogPost) {
        return this.blogPostService.getAuthor(blogPost.authorId)
    }
}
