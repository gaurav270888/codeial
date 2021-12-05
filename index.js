const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

// use static variable of express to link our static files like css images and js in assets folder
app.use(express.static('./assets'));

// use express-ejs-layouts module to design our layouts
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// Route all the requests here to the central router
app.use('/', require('./routes/index'));

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, function(err) {
    
    if(err) {
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on: ${port}`);
})


