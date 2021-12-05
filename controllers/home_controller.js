
module.exports.home = function(req, res) {
    //return res.end('<h1> Express is up for Codeial !!</h1>');

    console.log(req.cookies);
    res.cookie('user1', 25);
    return res.render('home', {
        title: 'Home Page'
    });
}