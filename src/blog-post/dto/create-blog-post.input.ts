import { Field, InputType } from "@nestjs/graphql"
import { ApiProperty } from "@nestjs/swagger"
import { IsUUID } from 'class-validator';

@InputType()
export class BlogPostCreateDTO {
    
    @ApiProperty()
    @Field()
    title: string

    @ApiProperty()
    @Field()
    body: string

    @ApiProperty()
    @Field()
    @IsUUID('all',{each:true})
    authorId: string
}
