import express from 'express';
import { blogsPage, blogsPagePerUser, deleteBlog, editBlog, insertBlog, viewBlogToEdit } from "../controllers/blogs";
import { logOut, registerUser } from "../controllers/users";
import { performLogin } from '../controllers/users';
import { ensureUserLoggedIn } from '../controllers/middleware';

const indexRouter = express.Router();

indexRouter.get('/', blogsPage);
indexRouter.get('/signUp', (req, res) => res.sendFile(`${process.cwd()}/src/views/signUp.html`));
indexRouter.post('/signUp', registerUser);
indexRouter.get('/login', (req, res) => res.sendFile(`${process.cwd()}/src/views/login.html`));
indexRouter.post('/login', performLogin);
indexRouter.get('/createBlog', ensureUserLoggedIn, (req, res) => res.sendFile(`${process.cwd()}/src/views/addNewBlog.html`));
indexRouter.post('/createBlog', insertBlog);
indexRouter.get('/logout', logOut);
indexRouter.get('/myBlogs', ensureUserLoggedIn, (req, res) => blogsPagePerUser);
indexRouter.get('/editBlog/:id', viewBlogToEdit);
indexRouter.post('/editBlog', editBlog);
indexRouter.get('/deleteBlog/:id', deleteBlog);

export default indexRouter;
