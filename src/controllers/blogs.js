import Model from '../models/model';

const blogsModel = new Model('blogs');

export const blogsPage = async(req, res) => {
  try {
    const data = await blogsModel.select('*');
    res.render(`${process.cwd()}/src/views/viewAllBlogs.html`, {blogs: data})
  } catch(err) {
    res.status(200).json({messages: err.stack});
  }
};

export const insertBlog = async(req, res) => {
  const {blog_title, blog_content} = req.body;
  const columns = 'blog_title, blog_content';
  const values = `'${blog_title}', '${blog_content}'`;
  try {
    const data = await blogsModel.insert(columns, values);
    res.send("Blog created successfully with id: " +data.rows[0].id);
  } catch(err) {
    res.status(200).json({messages: err.stack});
  }
}