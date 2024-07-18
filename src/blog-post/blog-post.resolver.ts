import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { BlogPostCreateDTO } from '../blog-post/dto/create-blog-post.input';
import { BlogPostService } from '../blog-post/blog-post.service';
import { BlogPost } from '../blog-post/entity/blog-post.entity'
import { User } from '../user/entity/user.entity';
import { NotificationGateway } from '../gateway/gateway';
import { CacheControl } from '../utils/decorators/cache-control.decorator'


@Resolver(() => BlogPost)
export class BlogPostResolver {
    constructor(
        private blogPostService: BlogPostService,
        // @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private readonly notificationGateway: NotificationGateway
    ) { }

    @Mutation(() => BlogPost, { name: "createBlogPost" })
    create(@Args('blogPostInput') blogPost: BlogPostCreateDTO) {
        const response = this.blogPostService.create(blogPost)
        // emit notification about new blog post
        this.notificationGateway.onNewBlogPost(blogPost)
        return response
    }

    @Query(() => [BlogPost], { name: 'getAllBlogPosts' })
    findAll() {
        return this.blogPostService.findAll();
    }

    @Query(() => BlogPost, { name: 'getBlogPost'})
    findOne(@Args("id") id: string) {
        return this.blogPostService.findOne(id)
    }

    @CacheControl({})
    @ResolveField(() => Comment)
    comments(@Parent() blogPost: BlogPost) {
        return this.blogPostService.getComments(blogPost.id)
    }

    @CacheControl({})
    @ResolveField(() => User)
    author(@Parent() blogPost: BlogPost) {
        return this.blogPostService.getAuthor(blogPost.authorId)
    }
}
