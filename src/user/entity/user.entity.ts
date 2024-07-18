import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BlogPost } from "../../blog-post/entity/blog-post.entity"
import { Comment } from "../../comment/entity/comment.entity"
import { CacheControl } from '../../utils/decorators/cache-control.decorator'


@CacheControl({ maxAge: 600 })
@ObjectType()
@Entity()
export class User {

  @Field()
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ type: String })
  id: string

  @Field()
  @Column()
  @ApiProperty({ type: String })
  name: string

  @OneToMany(() => BlogPost, (blogPost) => blogPost.author)
  @Field(() => [BlogPost], { nullable: true })
  blogPosts?: BlogPost[]

  @OneToMany(() => Comment, (comment) => comment.author)
  @Field(() => [Comment], { nullable: true })
  comments?: Comment[]
}