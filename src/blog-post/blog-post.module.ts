import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { BlogPostService } from 'src/blog-post/blog-post.service';
import { BlogPostResolver } from 'src/blog-post/blog-post.resolver';
import { BlogPost } from 'src/blog-post/entity/blog-post.entity';
import { UserModule} from 'src/user/user.module';
import { CommentModule } from 'src/comment/comment.module';
import { BlogPostController } from 'src/blog-post/blog-post.controller';
import { NotificationGateway } from 'src/gateway/gateway';



@Module({
  imports: [TypeOrmModule.forFeature([BlogPost]), forwardRef(() => UserModule), forwardRef(() => CommentModule), CacheModule.register()],
  providers: [BlogPostResolver, BlogPostService, NotificationGateway],
  controllers: [BlogPostController],
  exports: [BlogPostService]
})
export class BlogPostModule {}
