import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloServerPluginCacheControl } from 'apollo-server-core';
import responseCachePlugin from 'apollo-server-plugin-response-cache';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.ENV}`],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
            type: 'postgres',
            autoLoadEntities: true,
            synchronize: true,
            entities: [process.cwd() + '/**/*.entity{.ts}'],
            host: configService.get('DB_HOST'),
            port: configService.get('DB_PORT'),
            username: configService.get('DB_USERNAME'),
            password: configService.get('DB_PASSWORD'),
            database: configService.get('DB_DATABASE'),
        })
      }),
      GraphQLModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          autoSchemaFile: join(process.cwd(), 'src/graphql-schema.gql'),
          plugins: [
            ApolloServerPluginCacheControl({ defaultMaxAge: configService.get('DEFAULT_CACHE_TTL') }),
            responseCachePlugin()
          ],
        })
      }),
  ],
})
export class TestModule {}