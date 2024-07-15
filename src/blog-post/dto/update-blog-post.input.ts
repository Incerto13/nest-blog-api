import { Field, InputType } from "@nestjs/graphql"
import { ApiProperty } from "@nestjs/swagger"

@InputType()
export class BlogPostUpdateDTO {
    
    @ApiProperty()
    @Field()
    title: string

    @ApiProperty()
    @Field()
    body: string
}