import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { User } from 'src/user/entity/user.entity';
import { BlogPostModule } from 'src/blog-post/blog-post.module';
import { CommentModule } from 'src/comment/comment.module';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => BlogPostModule), forwardRef(() => CommentModule)],
  providers: [UserResolver, UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule { }