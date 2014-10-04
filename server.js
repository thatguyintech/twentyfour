var express = require('express');
var exphbs = require('express-handlebars');
var app = express();
var hbs = exphbs.create({
    defaultLayout: 'main',
    extname: '.hbs'
});

var http = require('http').Server(app);
var io = require('socket.io')(http);
var util = require('./util.js')

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.set('port', (process.env.PORT || 9001))
app.use(express.static('static'));

app.get('/', function (req, res) {
    res.render('game');
});

io.on('connection', function (socket) {
    socket.emit('num_response', { nums: util.getnums(), streak: 0 });
    socket.on('num_request_success', function (data) {
        socket.emit('num_response', { nums: util.getnums(),
                                      streak: data['streak'] + 1 });
    });
    socket.on('num_request_pass', function (data) {
        socket.emit('num_response', { nums: util.getnums(), streak: 0 });
    });

});

http.listen(app.get('port'));
