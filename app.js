var express = require('express');
var path = require('path'); // 디렉토리 연결
var favicon = require('serve-favicon');
var logger = require('morgan'); // 모든 요청에 대한 로그 
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser'); //  http body pasing.

var routes = require('./routes/index');
var users = require('./routes/users');

// 라우트를 선언해서 모듈 쓰듯이 사용. 

// pulblic  

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico'))); 


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// 정적 퍼블릭 경로로 지정해주겠다. /public  폴더안에서 바인딩을 해주겠다. 


app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;// 외부에서 사용할 수 있게.  앱이라는 모듈을 외부에서 쓸 수 있게. /bin/www에 있다.   start ./bin/www  = npm start랑 같다
/*

 app.listen 300
 앱을 생성해서 선언 후에 
 ./bin/www 실행. 
 
 node ./bin/www = npm start 와 같음.
 왜냐하면 패키지에 start에 "npm ./bin/www" 을 실행. 
 
 "test" : "DEBUG=blog:* npm start" 
 이렇게 하면 npm test 이ㅓㅎ게 해서 실행할수 있다. 

*/
