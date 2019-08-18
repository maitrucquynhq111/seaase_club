
const mongoose = require('mongoose');
const {MONGODB_URL } = require('./utils/setting');
const path = require('path');
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const app = express()
// load the cookie-parsing middleware
// app.use(cookieParser())
const port = process.env.PORT || 5000;
const RouterControl = require('./routers');
console.log('MONGODB_URL', MONGODB_URL);

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);



let db = mongoose.connection;
db.once("open", () => {
    console.log("connected to the database:", MONGODB_URL);
});

const option = {
    socketTimeoutMS: 10000,
    keepAlive: true,
    reconnectTries: 1000,
    useNewUrlParser: true 
};

mongoose.connect(MONGODB_URL, option)
.catch(err => {
    console.log('error when connect mongoose', err);
});

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:", MONGODB_URL));



// Allow cross origin resource sharing (CORS) within our application
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(cors())
//Static file declaration
app.use(express.static(path.join(__dirname, 'client/build')));

//production mode
if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));  //  app.get('*', (req, res) => {    res.sendfile(path.join(__dirname = 'client/build/index.html'));  })
}
//build mode
app.get('/', (req, res) => {  res.sendFile(path.join(__dirname+'/client/build/index.html'));})

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', RouterControl);
// app.get('/api/helloworld', (req, res) => {
//   res.json({sayHi: 'hello from server, nice to meet you!'})
// })
// app.get('/', (req, res) => {
//    res.send('hello from server!')
// })
 
app.listen(port, () => {
   console.log('App listening on port 5000')
}) 