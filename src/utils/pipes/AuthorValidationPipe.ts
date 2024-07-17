import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { BlogPostService } from "src/blog-post/blog-post.service";
import { BlogPostCreateDTO } from "src/blog-post/dto/create-blog-post.input";

@Injectable()
export class AddressValidationPipe implements PipeTransform {
  constructor(
    private readonly blogPostService: BlogPostService
) {}

    async transform(blogPost: BlogPostCreateDTO) {

        const { authorId } = blogPost

    // exception within userService will be called if user not found
    const user = await this.blogPostService.getAuthor(authorId)

    return blogPost
  }
}