const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const server = express();

// router
const subject = require('./router/subject.router');
const classes = require('./router/class.router');
const parents = require('./router/parents.router');
const teacher = require('./router/teacher.router');
const student = require('./router/student.router');


server.use(cors());
server.use(bodyParser.json());

server.use("/api/subject", subject);
server.use("/api/class", classes);
server.use("/api/parents", parents);
server.use("/api/teacher", teacher);
server.use("/api/student", student);


module.exports = server;