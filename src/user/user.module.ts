import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { User } from './entity/user.entity';
import { BlogPostModule } from '../blog-post/blog-post.module';
import { CommentModule } from '../comment/comment.module';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => BlogPostModule), forwardRef(() => CommentModule), CacheModule.register()],
  providers: [UserResolver, UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule { }