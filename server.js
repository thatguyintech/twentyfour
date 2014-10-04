var express = require('express');
var exphbs = require('express-handlebars');

var app = express();
var hbs = exphbs.create({defaultLayout: 'main', extname: '.hbs'});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.set('port', (process.env.PORT || 9001))
app.use(express.static('static'));

app.get('/', function(req, res) {
    res.render('game');
});

app.listen(app.get('port'));
