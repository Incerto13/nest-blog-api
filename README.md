<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) Api with GraphQL + Rest with caching, push notifications and integration tests

## Installation

```bash
$ npm install
```

## Running the app
#### prerequisites 
- turn off your local postgres service i.e. `brew services stop postgresql@14`
- turn off your local redis service i.e. `brew services stop redis`
- tear down the `test` containers (if they are running) `make down-test-db`
- create a `.env.dev` file in the root directory based upon the `.env.example` file
 
```bash
# development
$ make up-dev-db
$ npm run start:dev
```
- api will be running on `localhost:3000`

## Testing
#### prerequisites
- turn off your local postgres service i.e. `brew services stop postgresql@14`
- turn off your local redis service i.e. `brew services stop redis`
- tear down the `dev` containers (if they are running) `make down-dev-db`
- create a `.env.test` file in the root directory based upon the `.env.example` file

```bash
# stand-up test environment
$ make up-test-db
$ npm run start:test
# open new terminal
$ npm run test:int  # run integration tests
```

## Documentation
### GraphQL
graphql playground: `localhost:3000/graphql`
### REST
swagger: `localhost:3000/rest`


## License

Nest is [MIT licensed](LICENSE).


## Requirements

**Core Requirements:**

1.  **Database Setup and TypeORM Migration:**
 
-   Set up a PostgreSQL database for storing application data. ✅
-   Create an initial TypeORM migration to define the database schema based on entities (User, Post, Comment) with appropriate relationships. ✅

1.  **Controllers and Services:**

-   Create controllers to handle HTTP requests and route them to appropriate service methods. ✅
-   Implement services to encapsulate business logic and interact with users, posts, and comments for CRUD operations. ✅

1.  **Swagger Integration:**

-   Use Swagger to automatically generate API documentation for your NestJS application. ✅
-   Document API endpoints including input/output parameters, responses, and error codes. ✅

1.  **Query Caching (choose one):**

-   Implement one of the following to improve performance

1.  Implement server-side caching mechanisms to cache frequently requested GraphQL queries or TypeORM database queries for improved performance. ✅
2.  Utilize caching strategies (e.g., dataloader for resolver-level caching) to minimize redundant data fetching operations.

2.  **Custom Middleware (choose 2):**

-   Implement two of the following to handle specific metadata, access control, data validation, and cross-cutting concerns like logging or caching

1.  Custom interceptor
2.  Custom guards 
3.  Custom decorators ✅
4.  Custom pipes ✅

4.  **GraphQL Integration:**

-   Define GraphQL schema types representing users, posts, and comments. ✅
-   Implement GraphQL queries (**getUser, getAllUsers, getPost, getAllPosts, getCommentsForPost**) and mutations (**createUser, createPost, createComment**) to manage data. ✅

1.  **Real-Time Updates with WebSockets:**

-   Implement WebSocket integration (@WebSocketGateway) for real-time communication. ✅
-   Use WebSocket events (newPost, newComment) to notify clients immediately when new posts or comments are created. ✅

**Additional Requirements:**

-   **User Authentication:** Implement basic authentication mechanisms using JWT for user login and access control to protected API endpoints.
-   **Error Handling:** Ensure robust error handling and validation for GraphQL mutations and TypeORM operations. ✅
-   **Unit Testing:** Write comprehensive unit tests (using Jest) to cover critical components, services, resolvers, and middleware functions. ✅
-   **Documentation:** Provide clear documentation for setup, API endpoints (GraphQL, REST), WebSocket events, caching strategies, and Swagger integration. ✅

**Bonuses (Optional):**

-   **Custom Queries with TypeORM:** Implement optimized custom queries using TypeORM's Query Builder to fetch data based on specific criteria (e.g., filtering, pagination).
-   **Integration Tests:** Write integration tests to validate interactions between GraphQL, WebSocket subscriptions, and TypeORM operations. ✅
-   **GraphQL Subscriptions:** Implement GraphQL subscriptions for real-time updates via WebSocket. ✅

