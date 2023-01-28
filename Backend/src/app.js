const dotenv = require('dotenv');
const express = require('express');
const cookieParser = require('cookie-parser')

dotenv.config("../.env");

// const envi = process.env.DATABASE
// console.log(envi)

const app = express();
app.use(cookieParser());

app.use(express.json());

require('./db/conn');

const User = require('./model/userSchema');

app.use(require('./router/auth'));

const port = process.env.PORT || 5000

// Middleware
// const middleware = (req, res, next) => {
//     console.log('Hello My Middleware');
//     next();
// }

// app.get('/', (req, res)=>{
//     res.send('Hello World from app.js');
// });

// app.get('/about', middleware, (req, res)=>{
//     console.log('Hello My About');
//     res.send('Hello World from About');
// });

app.listen(port, ()=>{
    console.log(`hello i am listening at port ${port}`);
});