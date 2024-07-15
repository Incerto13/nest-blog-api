import {  } from '@nestjs/graphql';
import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { BlogPostCreateDTO } from 'src/blog-post/dto/create-blog-post.input';
import { BlogPostService } from 'src/blog-post/blog-post.service';
import { BlogPost } from 'src/blog-post/entity/blog-post.entity'
import { User } from 'src/user/entity/user.entity';

@Resolver(() => BlogPost)
export class BlogPostResolver {
    constructor(private blogPostService: BlogPostService) { }

    @Mutation(() => BlogPost, { name: "createBlogPost" })
    create(@Args('blogPostInput') blogPost: BlogPostCreateDTO) {
        return this.blogPostService.create(blogPost)
    }

    @Query(() => [BlogPost], { name: 'getAllBlogPosts' })
    findAll() {
      return this.blogPostService.findAll();
    }

    @Query(() => BlogPost, { name: 'getBlogPost'})
    findOne(@Args("id") id: string) {
        return this.blogPostService.findOne(id)
    }

    @ResolveField(() => Comment)
    comments(@Parent() blogPost: BlogPost) {
        return this.blogPostService.getComments(blogPost.id)
    }

    @ResolveField(() => User)
    author(@Parent() blogPost: BlogPost) {
        return this.blogPostService.getAuthor(blogPost.authorId)
    }
}
