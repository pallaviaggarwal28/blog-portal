import logger from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from "cors";
import uiRouter from "./routes/uiRouter";
import apiRouter from "./routes/apiRouter";
import { errorLogger, errorResponder } from "./controllers/middleware";

const app = express();

const engines = require('consolidate');
const session = require('express-session');
const flash = require('connect-flash');

app.set('views', __dirname + '/views');
app.engine('html', engines.ejs);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: false
}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json());
app.use(flash());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use('/', uiRouter);
app.use('/api', apiRouter);
app.use(errorLogger)
app.use(errorResponder)

export default app;
