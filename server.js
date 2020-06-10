
// TODO 
// Admin - Add Event and display
// Login - common login 
// Clean up - remove unused file and formating 
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const loginRouter = require('./Routes/login');
const createRouter = require('./Routes/create');
const accountRouter = require('./Routes/account');

const app = express();

const database = require('./Database/database');
const endpoints = require('./Routes/apiEndpoints');
 
endpoints(app);
 

app.use(express.static('view'));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());

app.use('/whereitsat/account', accountRouter);
app.use('/whereitsat/create', createRouter);
app.use('/whereitsat/account', accountRouter);
app.use('/whereitsat/auth',loginRouter);
database.initialize();

app.listen(8001, () => {  
    console.log("Server started with port 8001")     
    
});