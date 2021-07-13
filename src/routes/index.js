import express from 'express';
import { blogsPage } from '../controllers/blogs';
import { insertBlog } from '../controllers/blogs';

const indexRouter = express.Router();

indexRouter.get('/', (req, res) => res.sendFile(`${process.cwd()}/src/views/home.html`));
indexRouter.get('/login', (req, res) => res.sendFile(`${process.cwd()}/src/views/login.html`));
indexRouter.get('/signUp', (req, res) => res.sendFile(`${process.cwd()}/src/views/signUp.html`));
indexRouter.post('/login', blogsPage);
indexRouter.get('/addNewBlog', (req, res) => res.sendFile(`${process.cwd()}/src/views/addNewBlog.html`));
indexRouter.post('/saveBlog', insertBlog)

export default indexRouter;
