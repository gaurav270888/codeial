const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cookieParse = require('cookie-parser');

app.use(express.urlencoded());

app.use(cookieParse());

// use static variable of express to link our static files like css images and js in assets folder
app.use(express.static('./assets'));

// use express-ejs-layouts module to design our layouts
app.use(expressLayouts);
// extract Styles and Scripts from the sub pages into the layout and put them in Head and bottom of body respectively 
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// Route all the requests here to the central router
app.use('/', require('./routes/index'));

// use ejs module to set up our views
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(err) {
    
    if(err) {
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on: ${port}`);
})


