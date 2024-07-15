import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BlogPost } from "src/blog-post/entity/blog-post.entity"
import { Comment } from "src/comment/entity/comment.entity"
import { ApiProperty } from '@nestjs/swagger';

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