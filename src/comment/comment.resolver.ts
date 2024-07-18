import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
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
  findAll() {
      return this.commentService.findAll();
  }

  @Query(() => Comment, { name: 'getComment' })
  findOne(@Args('id') id: string) {
      return this.commentService.findOne(id);
  }

  @Query(() => [Comment], { name: 'getCommentsForPost' })
  find(@Args('id') id: string) {
      return this.commentService.findCommentsForBlogPost(id);
  }

  @CacheControl({})
  @ResolveField(() => User)
  author(@Parent() comment: Comment) {
      return this.commentService.getAuthor(comment.authorId)
  }
}