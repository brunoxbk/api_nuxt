const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const router = express.Router();


app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(cors({
    origin: '*'
}));

//Rotas
const auth = require('./routes/auth');
const index = require('./routes/index');
const posts = require('./routes/post');
// const personRoute = require('./routes/personRoute');
app.use('/', index);
app.use('/auth', auth);
app.use('/posts', posts);
// app.use('/persons', personRoute);

module.exports = app;