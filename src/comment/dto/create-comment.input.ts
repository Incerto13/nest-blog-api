import { Field, InputType } from "@nestjs/graphql"
import { ApiProperty } from "@nestjs/swagger"
import { IsUUID } from 'class-validator';

@InputType()
export class CommentCreateDTO {

    @Field()
    @ApiProperty()
    body: string

    @Field()
    @ApiProperty()
    @IsUUID('all',{each:true})
    blogPostId: string

    @Field()
    @ApiProperty()
    @IsUUID('all',{each:true})
    authorId: string
}