import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { CommentService } from 'src/comment/comment.service';
import { CommentResolver } from 'src/comment/comment.resolver';
import { Comment } from 'src/comment/entity/comment.entity';
import { BlogPostModule } from 'src/blog-post/blog-post.module';
import { UserModule } from 'src/user/user.module';
import { CommentController } from 'src/comment/comment.controller'
import { NotificationGateway } from 'src/gateway/gateway';



@Module({
  imports: [TypeOrmModule.forFeature([Comment]), forwardRef(() => UserModule), forwardRef(() => BlogPostModule), CacheModule.register()],
  providers: [CommentResolver, CommentService, NotificationGateway],
  controllers: [CommentController], 
  exports: [CommentService]
})
export class CommentModule { }