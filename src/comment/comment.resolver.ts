import { Inject } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { CommentService } from 'src/comment/comment.service'
import { Comment } from 'src/comment/entity/comment.entity';
import { User } from 'src/user/entity/user.entity';
import { CommentCreateDTO } from './dto/create-comment.input';
import { CacheControl } from 'src/utils/decorators/cache-control.decorator'
import { NotificationGateway } from 'src/gateway/gateway';


@Resolver(() => Comment)
export class CommentResolver {
  constructor(
    private readonly commentService: CommentService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly notificationGateway: NotificationGateway
  ) { }

  @Mutation(() => Comment, { name: "createComment" })
  create(@Args('commentInput') comment: CommentCreateDTO) {
      const result = this.commentService.create(comment)
      // emit notification about new blog post
      this.notificationGateway.onNewComment(comment)
      return result;
  }

  @Query(() => [Comment], { name: 'getAllComments' })
  async findAll() {
      // use cache if present
      const cacheKey = 'getAllComments';
      const cachedResponse = await this.cacheManager.get<string>(cacheKey);
      if (cachedResponse) {
          return cachedResponse as unknown as Comment;
      }

      // query data
      const response = await this.commentService.findAll();

      // cache acquired data
      await this.cacheManager.set(cacheKey, response)

      return response
  }

  @Query(() => Comment, { name: 'getComment' })
  async findOne(@Args('id') id: string) {
      // use cache if present
      const cacheKey = `getComment - ${id}`;
      const cachedResponse = await this.cacheManager.get<string>(cacheKey);
      if (cachedResponse) {
          return cachedResponse as unknown as Comment;
      }

      // query data
      const response = await this.commentService.findOne(id);

      // cache acquired data
      await this.cacheManager.set(cacheKey, response)

      return response
  }

  @Query(() => [Comment], { name: 'getCommentsForPost' })
  async find(@Args('id') id: string) {
      // use cache if present
      const cacheKey = `getCommentsForPost - ${id}`;
      const cachedResponse = await this.cacheManager.get<string>(cacheKey);
      if (cachedResponse) {
          return cachedResponse as unknown as Comment;
      }

      // query data
      const response = this.commentService.findCommentsForBlogPost(id);

      // cache acquired data
      await this.cacheManager.set(cacheKey, response)

      return response
  }

  @CacheControl({ inheritMaxAge: true })
  @ResolveField(() => User)
  author(@Parent() comment: Comment) {
      return this.commentService.getAuthor(comment.authorId)
  }
}