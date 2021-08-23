import express from 'express';
import { blogsPage, blogsPagePerUser, deleteBlog, viewBlogToEdit } from "../controllers/blogs";
import { logOut } from "../controllers/users";
import { ensureUserLoggedIn } from '../controllers/middleware';

const uiRouter = express.Router();



uiRouter.get('/', blogsPage);
uiRouter.get('/myBlogs', ensureUserLoggedIn, (req, res) => blogsPagePerUser(req.signedCookies.email, res));
uiRouter.get('/signUp', (req, res) => res.render(`signUp`));
uiRouter.get('/login', (req, res) => res.render(`login`));
uiRouter.get('/createBlog', ensureUserLoggedIn, (req, res) => res.render(`addNewBlog`));
uiRouter.get('/logout', logOut);
uiRouter.get('/myBlogs', ensureUserLoggedIn, (req, res) => blogsPagePerUser);
uiRouter.get('/editBlog/:id', viewBlogToEdit);
uiRouter.get('/deleteBlog/:id', deleteBlog);

export default uiRouter;
