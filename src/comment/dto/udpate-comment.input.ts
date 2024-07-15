import { Field, InputType } from "@nestjs/graphql"
import { ApiProperty } from "@nestjs/swagger"

@InputType()
export class CommentUpdateDTO {

    @Field()
    @ApiProperty()
    body: string
}