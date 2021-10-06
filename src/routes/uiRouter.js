import express from 'express';
import { blogsPage, blogsPagePerUser, viewBlogToEdit } from "../controllers/blogs";
import { ensureUserLoggedIn, validateSession } from "../controllers/middleware";

const uiRouter = express.Router();
const asyncHandler = require('express-async-handler');

uiRouter.get('/signUp', (req, res) => res.render(`signUp`));
uiRouter.get('/login', (req, res) => res.render(`login`));
uiRouter.get('/createBlog', ensureUserLoggedIn, (req, res) => res.render(`addNewBlog`));
uiRouter.get('/myBlogs/edit/:id', ensureUserLoggedIn, viewBlogToEdit);
uiRouter.get('/myBlogs', ensureUserLoggedIn, (req, res) => blogsPagePerUser(req.signedCookies.email, res));
uiRouter.get('/error', (req, res) => {res.send("Custom error landing page.")});
uiRouter.get('/', validateSession, asyncHandler(blogsPage));

export default uiRouter;
