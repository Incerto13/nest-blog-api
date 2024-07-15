import { Field, ObjectType } from "@nestjs/graphql"
import { User } from "src/user/entity/user.entity"
import { BlogPost } from "src/blog-post/entity/blog-post.entity"
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"
import { ApiProperty } from "@nestjs/swagger"


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