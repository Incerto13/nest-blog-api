import { Injectable, PipeTransform } from "@nestjs/common";
import { BlogPostCreateDTO } from "../../blog-post/dto/create-blog-post.input";
import { CommentCreateDTO } from "../../comment/dto/create-comment.input";
import { UserService } from "../../user/user.service";

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