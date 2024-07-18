// Note: for tests to work all imports need to be relative (app-wide)
import { HttpStatus } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Connection } from 'typeorm';
import { clearAllTables } from '../../tests/utils/clear-all-tables';
import { createTestApp } from '../../tests/utils/create-test-app.util';
import { UserModule } from '../../user/user.module';
import { User } from '../../user/entity/user.entity'
import { makeRequest } from '../utils/make-request';

describe('Users Integration', () => {
  let app: NestExpressApplication;
  let connection: Connection;

  beforeAll(async () => {
    const testApp = await createTestApp([UserModule]);

    connection = testApp.connection;
    app = testApp.app;
  });

  afterEach(async () => {
    await clearAllTables(connection);
  });

  afterAll(async () => {
    await connection.close();
    await app.close();
  });


  describe('getAllUsers', () => {
    describe('200', () => {
        it('should save and return all users in query', async () => {
            await connection.getRepository(User).save({ name: 'Jack' }) 
            await connection.getRepository(User).save({ name: 'Jill' })
            await connection.getRepository(User).save({ name: 'John' });

            const response = await makeRequest(app).post('/graphql')
            .send({
              "query": `{ getAllUsers { id name blogPosts { id title body } comments { id blogPostId body } }}`
            })

            const data = response.body.data.getAllUsers

            expect(response.status).toBe(HttpStatus.OK);
            expect(data.map((user: User) => user.name)).toContain("Jack")
            expect(data.map((user: User) => user.name)).toContain("Jill")
            expect(data.map((user: User) => user.name)).toContain("John")
        });
    });
  });
});
