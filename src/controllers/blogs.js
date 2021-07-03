import Model from '../models/model';

const blogsModel = new Model('blogs');

export const blogsPage = async(req, res) => {
  try {
    const data = await blogsModel.select('*');
    res.status(200).json({messages: data.rows});
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
    res.status(200).json({messages: data.rows});
  } catch(err) {
    res.status(200).json({messages: err.stack});
  }
}