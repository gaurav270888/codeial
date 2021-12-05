const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParse = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy')
const MongoStore = require('connect-mongo')(session);

app.use(express.urlencoded());

app.use(cookieParse());

// use static variable of express to link our static files like css images and js in assets folder
app.use(express.static('./assets'));

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
    secret: 'somekey',
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

// Route all the requests here to the central router
app.use('/', require('./routes/index'));

app.listen(port, function (err) {

    if (err) {
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on: ${port}`);
})


