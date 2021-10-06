import express from 'express';
import { deleteBlog, editBlog, insertBlog } from "../controllers/blogs";
import { logOut, registerUser } from "../controllers/users";
import { performLogin } from '../controllers/users';
import { ensureUserLoggedIn } from "../controllers/middleware";
const asyncHandler = require('express-async-handler');

const apiRouter = express.Router();

apiRouter.post('/signUp', asyncHandler(registerUser));
apiRouter.post('/login', asyncHandler(performLogin));
apiRouter.post('/createBlog', ensureUserLoggedIn, asyncHandler(insertBlog));
apiRouter.post('/editBlog/:id', ensureUserLoggedIn, asyncHandler(editBlog));
apiRouter.post('/deleteBlog/:id', ensureUserLoggedIn, asyncHandler(deleteBlog));
apiRouter.post('/logout', logOut);

export default apiRouter;
