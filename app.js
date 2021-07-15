var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishRouter=require('./routes/dishRouter');
var promoRouter=require('./routes/promotionRouter');
var leaderRouter=require('./routes/leaderRouter');

const mongoose = require('mongoose');



/**Connection a la base de donnée */
const url= 'mongodb://localhost:27017/conFusion';
const  connect= mongoose.connect(url);

connect
    .then((db)=>{
      console.log('connected correctly to server ');
    },
        (err) =>{
      console.log(err);
        });

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/** donner l'acces a l'application node
 * node lit middleware par middleware si ce middleware n'est pas valide
 il pourra pas passer au suivant donc il faut bien respecter l'autre des middleware  */
function  auth(req, res, next){
    console.log(req.headers);

    var  authHeader =req.headers.authorization;
    /**authHeader contient la req du client soit le nom d'utilisateur et le mdp
     codé en base 64 */
    if (!authHeader){
        var err = new  Error( 'You are not authenticated!');

        /**signifier en reponse que c'est une Authentication*/
        res.setHeader('WWW-Authenticate','Basic');
        err.status = 401; /**Non autorisé*/
        next(err);
        return
    }
    var auth = new  Buffer.from(authHeader.split(' ')[1],'base64').toString().split(':');
    /**Buffer un tampon qui divise la valeur en suivant l'encodage qu'on donne
     * split pour diviser et l'espace dans le split comme parti de separation
     *le premier element de cette separation est l'element codé en base 64
     * l'autre ou l'element existe
     * toString() contiendra le nom d'utilsateur et le mdp  separer par : au cause de split(':')
     * auth est un tableau dont le premier element est le non d'utilsateur
     * et le second le password */

    var username = auth[0];
    var password = auth[1];

    if (username === 'admin' && password ==='password'){
        next() /**Cela signifie que c'est bon donc il peut passer a un autre middleware*/
    }
    else {
        var err = new  Error( 'You are not authenticated!');

        res.setHeader('WWW-Authenticate','Basic');
        err.status = 401; /**Non autorisé*/
        next(err);
    }

}
app.use(auth);
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dishes',dishRouter);
app.use('/promotions',promoRouter);
app.use('/leaders',leaderRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
