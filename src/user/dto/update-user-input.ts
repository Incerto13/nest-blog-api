import { InputType, Int, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class UserUpdateDTO {

  @ApiProperty()
  @Field()
  name: string
}