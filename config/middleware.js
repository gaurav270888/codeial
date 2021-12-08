
module.exports.setFlash = function(req, res, next) {

    res.locals.flash = {
        'success': req.flash('success'),
        'error' : req.flash('error')
    }
    // this is important to move control to next process in line, otherwise your code will get stuck here.
    next();
}