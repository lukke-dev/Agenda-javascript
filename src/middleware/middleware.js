// module.exports = (req, res, next) => {
exports.middlewareGlobal = (req, res, next) => {
    res.locals.umaVarLocal = 'Este é  o valor da variavel';
    next();
}

exports.outromiddleware = (req, res, next) => {
    console.log('outro middle')
}

exports.checkCsrfError = (err, req, res, next) => {
    if (err && 'EBADCSRFTOKEN' === err.code) {
        return res.render('404');
    }
}

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
}