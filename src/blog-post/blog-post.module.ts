import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { BlogPostService } from '../blog-post/blog-post.service';
import { BlogPostResolver } from '../blog-post/blog-post.resolver';
import { BlogPost } from '../blog-post/entity/blog-post.entity';
import { UserModule} from '../user/user.module';
import { CommentModule } from '../comment/comment.module';
import { BlogPostController } from '../blog-post/blog-post.controller';
import { NotificationGateway } from '../gateway/gateway';



@Module({
  imports: [TypeOrmModule.forFeature([BlogPost]), forwardRef(() => UserModule), forwardRef(() => CommentModule), CacheModule.register()],
  providers: [BlogPostResolver, BlogPostService, NotificationGateway],
  controllers: [BlogPostController],
  exports: [BlogPostService]
})
export class BlogPostModule {}
