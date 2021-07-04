import express from 'express';
import { blogsPage } from '../controllers/blogs';
import { insertBlog } from '../controllers/blogs';

const indexRouter = express.Router();

indexRouter.get('/', (req, res) => res.sendFile(`${process.cwd()}/src/views/addNewBlog.html`));
indexRouter.get('/home',blogsPage);
indexRouter.post('/saveBlog', insertBlog)

export default indexRouter;
