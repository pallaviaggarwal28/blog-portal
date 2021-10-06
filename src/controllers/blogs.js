import Model from '../models/model';

const asyncHandler = require('express-async-handler')
const blogsModel = new Model('blogs');

export const blogsPage = async (req, res) => {
  const clause = ` order by created_at desc`;
  const data = await blogsModel.select("*", clause);
  res.render(`${process.cwd()}/src/views/home.html`, { blogs: data, alreadyLoggedIn: false });
};

export const blogsPagePerUser = asyncHandler(async(email, res) => {
  const clause = ` where created_by='${email}' order by created_at desc`;
  const data = await blogsModel.select("*", clause);
  res.render(`${process.cwd()}/src/views/myBlogs.html`, { blogs: data, alreadyLoggedIn: true });
});

export const insertBlog = async(req, res) => {
  const {blog_title, blog_content} = req.body;
  const created_by = req.signedCookies.email;
  const columns = 'blog_title, blog_content, created_by';
  const values = `'${blog_title}', '${blog_content}', '${created_by}'`;
  await blogsModel.insert(columns, values);
  res.redirect("/");
}

export const editBlog = async(req, res) => {
  const {blog_title, blog_content} = req.body;
  const updateQueryValues = `blog_title='${blog_title}',blog_content='${blog_content}'`;
  const clause = ` where id='${req.params.id}'`;
  await blogsModel.update(updateQueryValues, clause);
  res.redirect("/myBlogs");
}

export const viewBlogToEdit = async(req, res) => {
  const clause = ` where id='${req.params.id}'`;
  const data = await blogsModel.select("*", clause);
  res.render(`${process.cwd()}/src/views/editBlog.html`, { blogs: data });
}

export const deleteBlog = async(req, res) => {
  const clause = ` where id='${req.params.id}'`;
  await blogsModel.delete(clause);
  res.redirect("/myBlogs");
}
