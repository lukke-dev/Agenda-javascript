// module.exports = (req, res, next) => {
exports.middlewareGlobal = (req, res, next) => {
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.user = req.session.user;
    next();
}

exports.outromiddleware = (req, res, next) => {
    console.log('outro middle')
}

exports.checkCsrfError = (err, req, res, next) => {
    if (err) {
        return res.render('404');
    }
    next();
}

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}