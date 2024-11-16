import * as dotenv from 'dotenv';
dotenv.config();
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigValidationSchema } from './config.schema';
import { join } from 'path';
import { CacheModule } from '@nestjs/cache-manager'
import * as redisStore from 'cache-manager-redis-store';
import responseCachePlugin from 'apollo-server-plugin-response-cache';
// import { ApolloServerPluginCacheControl } from 'apollo-server-core/dist/plugin/cacheControl';
import { UserModule } from './user/user.module';
import { BlogPostModule } from 'src/blog-post/blog-post.module';
import { CommentModule } from 'src/comment/comment.module';
import { GatewayModule } from './gateway/gateway.module';


const NEST_BLOG_API_TYPEORM_HOST = process.env.NEST_BLOG_API_TYPEORM_HOST;
const NEST_BLOG_API_POSTGRES_PORT = Number(process.env.NEST_BLOG_API_POSTGRES_PORT);


@Module({
  imports: [
    // ConfigModule.forRoot({
    //   envFilePath: [`.env.${process.env.ENV}`],
    //   validationSchema: ConfigValidationSchema,
    // }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
          type: 'postgres',
          autoLoadEntities: true,
          synchronize: false,
          host: NEST_BLOG_API_TYPEORM_HOST,
          port: NEST_BLOG_API_POSTGRES_PORT,
          username: 'postgres',
          password: 'postgres',
          database: 'nest-blog'
      })
    }),
      GraphQLModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          autoSchemaFile: join(process.cwd(), 'src/graphql-schema.gql'),
          playground: true,    
          introspection: true,
          persistedqueries: false,
          // plugins: [
          //   ApolloServerPluginCacheControl({ defaultMaxAge: configService.get('DEFAULT_CACHE_TTL') }),
          //   responseCachePlugin()
          // ],
        })
      }),
      UserModule, 
      BlogPostModule, 
      CommentModule, 
      GatewayModule, 
    // CacheModule.registerAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) => ({
    //     store: redisStore,
    //     host: configService.get('REDIS_HOST'),
    //     port: configService.get('REDIS_PORT'),
    //     ttl: configService.get('DEFAULT_CACHE_TTL'),
    //     isGlobal: true,
    //   })
    // })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
