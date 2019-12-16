const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const server = express();

var session = require('express-session');
const sessionConfig = {
    name: 'notsession', // default is connect.sid
    secret: 'nobody tosses a dwarf!',
    cookie: {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        secure: true,
        ttpOnly: true, // only set cookies over https. Server will not send back a cookie over http.
    }, // 1 day in milliseconds
    resave: false,
    saveUninitialized: false,
};
// configure express-session middleware
server.use(session(sessionConfig));

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);

module.exports = server;
