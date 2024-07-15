import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { CommentService } from 'src/comment/comment.service'
import { Comment } from 'src/comment/entity/comment.entity';
import { BlogPost } from 'src/blog-post/entity/blog-post.entity';
import { User } from 'src/user/entity/user.entity';
import { CommentCreateDTO } from './dto/create-comment.input';

@Resolver(() => Comment)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) { }

  @Mutation(() => Comment, { name: "createComment" })
  create(@Args('commentInput') comment: CommentCreateDTO) {
      return this.commentService.create(comment)
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

  @ResolveField(() => User)
  author(@Parent() comment: Comment) {
      return this.commentService.getAuthor(comment.authorId)
  }
}