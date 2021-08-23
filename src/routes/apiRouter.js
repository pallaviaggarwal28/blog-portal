import express from 'express';
import { editBlog, insertBlog } from "../controllers/blogs";
import { registerUser } from "../controllers/users";
import { performLogin } from '../controllers/users';

const apiRouter = express.Router();

apiRouter.post('/signUp', registerUser);
apiRouter.post('/login', performLogin);
apiRouter.post('/createBlog', insertBlog);
apiRouter.post('/editBlog', editBlog);

export default apiRouter;
