require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes');
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf');
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTSTRING, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useFindAndModify: false
 })
.then(() => {
    console.log('Conectei ao DB');
    app.emit('pronto');
})
.catch(e => console.log(e));

const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middleware/middleware')
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

const sessionOptions = session({
    secret: 'jdisjdisjdisa3i23293 2983 9283gbbgfdgfdgdfgddfgddrrrr  r928492()',
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});
app.use(sessionOptions);
app.use(flash());

app.set('views', './src/Views') //caminho relativo
//app.set('views', path.resolve(__dirname, 'src', 'Views')); - Caminho Absoluto
app.set('view engine', 'ejs');

app.use(csrf());
//Nossos proprios middlewares
app.use(middlewareGlobal);
app.use(csrfMiddleware);
app.use(checkCsrfError);
app.use(routes);

app.on('pronto', () => {
    app.listen(3000, () => {
        console.log('acessar http://localhost:3000');
        console.log('Servidor Executando na porta 3000');
    });

});

