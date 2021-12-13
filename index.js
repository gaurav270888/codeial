const express = require('express');
const env = require('./config/environment');
const logger = require('morgan');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParse = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

// setup the chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');
const path = require('path');

if (env.name == 'development') {
    app.use(sassMiddleware({
        src: path.join(__dirname, env.asset_path, 'scss'),
        dest: path.join(__dirname, env.asset_path, 'css'),
        debug: true,
        outputStyle: 'expanded',
        prefix: '/css'
    }));
}


app.use(express.urlencoded());

app.use(cookieParse());

// use static variable of express to link our static files like css images and js in assets folder
app.use(express.static(env.asset_path));

app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(logger(env.morgan.mode, env.morgan.options));

// use express-ejs-layouts module to design our layouts
app.use(expressLayouts);
// extract Styles and Scripts from the sub pages into the layout and put them in Head and bottom of body respectively 
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// use ejs module to set up our views
app.set('view engine', 'ejs');
app.set('views', './views');


app.use(session({
    name: 'codeial',
    // TODO use a proper secret key in production env before deployment
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 60) // cookies valid for 1hr
    },
    // using mongo store to store user cookies to resume session of users in case my server restarts
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled'
    },
        function (err) {
            console.log(err || 'User Cookies stored in Mongo Store !!');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session())

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

// Route all the requests here to the central router
app.use('/', require('./routes/index'));

app.listen(port, function (err) {

    if (err) {
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on: ${port}`);
})


