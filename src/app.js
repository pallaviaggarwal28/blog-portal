import logger from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
import indexRouter from './routes/index';
import cors from "cors";

const app = express();

const engines = require('consolidate');
const session = require('express-session');
const flash = require('req-flash');
app.set('views', __dirname + '/views');
app.engine('html', engines.ejs);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use('/', indexRouter);

export default app;
