// module.exports = (req, res, next) => {
exports.middlewareGlobal = (req, res, next) => {
    res.locals.umaVarLocal = 'Este é  o valor da variavel';
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