import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { BlogPostService } from "src/blog-post/blog-post.service";
import { BlogPostCreateDTO } from "src/blog-post/dto/create-blog-post.input";
import { CommentCreateDTO } from "src/comment/dto/create-comment.input";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthorValidationPipe implements PipeTransform {
  constructor(
    private readonly userService: UserService
) {}

    async transform(blogPostOrComment: BlogPostCreateDTO | CommentCreateDTO) {

        const { authorId } = blogPostOrComment

    // exception within userService will be called if user not found
    const user = await this.userService.findOne(authorId)

    return blogPostOrComment
  }
}