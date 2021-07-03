import express from 'express';
import { indexPage } from '../controllers/index';
import { blogsPage } from '../controllers/blogs';
import { insertBlog } from '../controllers/blogs';

const indexRouter = express.Router();

indexRouter.get('/', indexPage);
indexRouter.get('/blogs', blogsPage);
indexRouter.post('/saveBlog', insertBlog)

export default indexRouter;
