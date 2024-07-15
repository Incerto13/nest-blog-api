import { InputType, Int, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class UserCreateDTO {

  @ApiProperty()
  @Field()
  name: string
}