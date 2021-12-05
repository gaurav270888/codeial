
module.exports.furniture = function(req, res) {
    //return res.end('<h1> Furniture Advertisment </h1>');

    return res.render('advertisments', {
        title: 'Furniture advertisments Page'
    });
}

module.exports.gym = function(req, res) {
    //return res.end('<h1> Gym Advertisment </h1>');

    return res.render('advertisments', {
        title: 'Gym advertisments Page'
    });
}