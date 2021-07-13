export const createBlogsTable = `
DROP TABLE IF EXISTS blogs;
CREATE TABLE IF NOT EXISTS blogs (
    id SERIAL PRIMARY KEY ,
    blog_title VARCHAR DEFAULT '',
    blog_content VARCHAR DEFAULT '',
    created_by VARCHAR DEFAULT '',
    created_at TIMESTAMP DEFAULT now()
)`;

export const dropBlogsTable = `DROP TABLE blogs`;

export const createUsersTable = `
DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users
(
    id SERIAL PRIMARY KEY ,
    email    VARCHAR DEFAULT '',
    password VARCHAR DEFAULT ''
)`;

export const dropUsersTable = `DROP TABLE users`;
