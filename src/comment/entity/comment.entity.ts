import { Field, ObjectType } from "@nestjs/graphql"
import { ApiProperty } from "@nestjs/swagger"
import { User } from "../../user/entity/user.entity"
import { BlogPost } from "../../blog-post/entity/blog-post.entity"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { CacheControl } from '../../utils/decorators/cache-control.decorator'


@CacheControl({ maxAge: 600 })
@ObjectType()
@Entity()
export class Comment {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({ type: String })
    id: string

    @Field()
    @Column()
    @ApiProperty({ type: String })
    body: string

    @ManyToOne(() => BlogPost, blogPost => blogPost.comments)
    @Field(() => BlogPost)
    blogPost: BlogPost

    @Column()
    @Field()
    @ApiProperty({ type: String })
    blogPostId: string

    @ManyToOne(() => User, user => user.comments)
    @Field(() => User)
    author: User

    @Column()
    @Field()
    @ApiProperty({ type: String })
    authorId: string
}