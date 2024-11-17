import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Field, ObjectType } from "@nestjs/graphql"
import { ApiProperty } from "@nestjs/swagger"
import { User } from "../../user/entity/user.entity"
import { Comment } from "../../comment/entity/comment.entity"
// import { CacheControl } from '../../utils/decorators/cache-control.decorator'


// @CacheControl({ maxAge: 600 })
@ObjectType()
@Entity('blogPosts')
export class BlogPost {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty({ type: String })
    id: string

    @Field()
    @Column()
    @ApiProperty({ type: String })
    title: string

    @Field()
    @Column()
    @ApiProperty({ type: String })
    body: string

    @ManyToOne(() => User, user => user.blogPosts)
    @Field(() => User)
    author: User

    @Column()
    @Field()
    @ApiProperty({ type: String })
    authorId: string

    @OneToMany(() => Comment, comment => comment.blogPost)
    @Field(() => [Comment], { nullable: true })
    comments?: Comment[]
}