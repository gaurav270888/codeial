

module.exports.profile = function(req, res) {
    //return res.end('<h1> User Profile </h1>');

    return res.render('users', {
        title: 'Users Profile Page'
    });
}

module.exports.posts = function(req, res) {
    //return res.end('<h1> User Posts </h1>');

    return res.render('users', {
        title: 'Users Posts Page'
    });
}