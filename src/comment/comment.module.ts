import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { CommentService } from '../comment/comment.service';
import { CommentResolver } from '../comment/comment.resolver';
import { Comment } from '../comment/entity/comment.entity';
import { BlogPostModule } from '../blog-post/blog-post.module';
import { UserModule } from '../user/user.module';
import { CommentController } from '../comment/comment.controller'
import { NotificationGateway } from '../gateway/gateway';



@Module({
  imports: [TypeOrmModule.forFeature([Comment]), forwardRef(() => UserModule), forwardRef(() => BlogPostModule), CacheModule.register()],
  providers: [CommentResolver, CommentService, NotificationGateway],
  controllers: [CommentController], 
  exports: [CommentService]
})
export class CommentModule { }