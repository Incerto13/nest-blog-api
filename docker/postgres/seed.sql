-- Enable UUID generation extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -- Connect to the newly created database
\c "nest-blog";

-- -- Create the users table
CREATE TABLE users (
	id UUID DEFAULT uuid_generate_v4(),
	"name" varchar NOT NULL,
	CONSTRAINT "PK_user_id" PRIMARY KEY (id)
);

-- -- Create the blogPosts table
CREATE TABLE "blogPosts" (
	id UUID DEFAULT uuid_generate_v4(),
	title varchar NOT NULL,
	body text NULL,
	"authorId" UUID NOT NULL,
	CONSTRAINT "PK_blogPost_id" PRIMARY KEY (id)
);

-- add author foreign key to blogPosts
ALTER TABLE "blogPosts" ADD CONSTRAINT "FK_blogPost_author_id" FOREIGN KEY ("authorId") REFERENCES users(id) ON DELETE CASCADE;

-- -- Cretae comments table
CREATE TABLE comments (
	id UUID DEFAULT uuid_generate_v4(),
	body text NULL,
	"authorId" UUID NOT NULL,
	"blogPostId" UUID NOT NULL,
	CONSTRAINT "PK_commentt_id" PRIMARY KEY (id)
);

-- add author foreign key to comments
ALTER TABLE comments ADD CONSTRAINT "FK_comment_author_id" FOREIGN KEY ("authorId") REFERENCES users(id) ON DELETE CASCADE;
-- add blogPost foreign key to comments
ALTER TABLE comments ADD CONSTRAINT "FK_comment_blogPost_id" FOREIGN KEY ("blogPostId") REFERENCES "blogPosts"(id) ON DELETE CASCADE;


--- Seed initial data
INSERT INTO users (name) VALUES
('Jack'),
('Jill'),
('John');


-- Retrieve the first three user IDs
WITH user_ids AS (
    SELECT id
    FROM users
    ORDER BY id
    LIMIT 3
)
INSERT INTO "blogPosts" (title, body, "authorId")
VALUES 
    ('Initial Post', 'Welcome to the Nest.js Grapqh Blog!', (SELECT id FROM user_ids LIMIT 1 OFFSET 0)),
    ('Nest is the Best!', 'I love nest.js especially when bulding a graphql api', (SELECT id FROM user_ids LIMIT 1 OFFSET 1)),
    ('With TypeORM', 'Nest is perfect with TypeORM', (SELECT id FROM user_ids LIMIT 1 OFFSET 2));


-- Retrieve the first three user IDs and blogPost IDs
WITH user_ids AS (
    SELECT id
    FROM users
    ORDER BY id
    LIMIT 3
),
blog_post_ids AS (
    SELECT id
    FROM "blogPosts"
    ORDER BY id
    LIMIT 3
)
INSERT INTO comments (body, "authorId", "blogPostId")
VALUES 
    ('This post rocks!', (SELECT id FROM user_ids LIMIT 1 OFFSET 1), (SELECT id FROM blog_post_ids LIMIT 1 OFFSET 0)),
    ('Great post man!', (SELECT id FROM user_ids LIMIT 1 OFFSET 0), (SELECT id FROM blog_post_ids LIMIT 1 OFFSET 1)),
    ('I think this is awesome!', (SELECT id FROM user_ids LIMIT 1 OFFSET 1), (SELECT id FROM blog_post_ids LIMIT 1 OFFSET 1));

