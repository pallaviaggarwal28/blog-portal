export const createBlogsTable = `
DROP TABLE IF EXISTS blogs;
CREATE TABLE IF NOT EXISTS blogs (
    id SERIAL PRIMARY KEY ,
    blog_title VARCHAR DEFAULT '',
    blog_content VARCHAR DEFAULT ''
)`;

export const dropBlogsTable = `DROP TABLE blogs`;
