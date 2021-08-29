import Model from '../models/model';
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');

const blogsModel = new Model('blogs');
let id = '';

export const blogsPage = async(req, res) => {
    try {
      const clause = ` order by created_at desc`;
      const data = await blogsModel.select('*', clause);
      res.render(`${process.cwd()}/src/views/home.html`, {blogs: data})
    } catch(err) {
      throw new Error(err.stack);
    }
}

export const blogsPagePerUser = async(email, res) => {
  try {
    const clause = ` where created_by='${email}' order by created_at desc`;
    const data = await blogsModel.select('*', clause);
    res.render(`${process.cwd()}/src/views/myBlogs.html`, {blogs: data});
  } catch(err) {
    throw new Error(err.stack);
  }
};

export const insertBlog = async(req, res) => {
  const {blog_title, blog_content} = req.body;
  const created_by = req.signedCookies.email;
  const columns = 'blog_title, blog_content, created_by';
  const values = `'${blog_title}', '${blog_content}', '${created_by}'`;
  try {
    await blogsModel.insert(columns, values);
    res.redirect('/');
  } catch(err) {
    res.status(400).json({messages: err.stack});
  }
}

export const editBlog = async(req, res) => {
  const {blog_title, blog_content} = req.body;
  const updateQueryValues = `blog_title='${blog_title}',blog_content='${blog_content}'`;
  const clause = ` where id='${blogId}'`;
  try {
    await blogsModel.update(updateQueryValues, clause);
    res.redirect('/myBlogs');
  } catch(err) {
    res.status(400).json({messages: err.stack});
  }
}

export const viewBlogToEdit = async(req, res) => {
  try {
    const clause = ` where id='${req.params.id}'`;
    const data = await blogsModel.select('*', clause);
    res.render(`${process.cwd()}/src/views/editBlog.html`, {blogs: data})
  } catch(err) {
    throw new Error(err.stack);
  }
}

export const deleteBlog = async(req, res) => {
  try {
    const clause = ` where id='${req.params.id}'`;
    await blogsModel.delete(clause);
    res.redirect('/myBlogs');
  } catch(err) {
    throw new Error(err.stack);
  }
}
