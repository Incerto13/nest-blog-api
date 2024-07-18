import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { UserService } from 'src/user/user.service';
import { UserResolver } from 'src/user/user.resolver';
import { User } from 'src/user/entity/user.entity';
import { BlogPostModule } from 'src/blog-post/blog-post.module';
import { CommentModule } from 'src/comment/comment.module';
import { UserController } from 'src/user/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => BlogPostModule), forwardRef(() => CommentModule), CacheModule.register()],
  providers: [UserResolver, UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule { }