import express from 'express';
import { deleteBlog, editBlog, insertBlog } from "../controllers/blogs";
import { logOut, registerUser } from "../controllers/users";
import { performLogin } from '../controllers/users';
import { ensureUserLoggedIn } from "../controllers/middleware";

const apiRouter = express.Router();

apiRouter.post('/signUp', registerUser);
apiRouter.post('/login', performLogin);
apiRouter.post('/createBlog', ensureUserLoggedIn, insertBlog);
apiRouter.post('/editBlog/:id', ensureUserLoggedIn, editBlog);
apiRouter.post('/deleteBlog/:id', ensureUserLoggedIn, deleteBlog);
apiRouter.post('/logout', logOut);

export default apiRouter;
