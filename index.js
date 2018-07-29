const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const bodyParser = require('body-parser');
const moment = require('moment');

const app = express();

nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

app.set('view engine', 'njk');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));

function checkBirthYear(date) {
  const age = moment().diff(date, 'years');
  return age;
}

app.get('/check', (req, res) => {
  res.render('main');
});

app.post('/check', (req, res) => {
  const { name, dateBirth } = req.body;

  if (checkBirthYear(dateBirth) > 18) {
    const route = '/major?name=';
    const newRoute = route.concat(name);
    res.redirect(newRoute);
  } else {
    const route = '/minor?name=';
    const newRoute = route.concat(name);
    res.redirect(newRoute);
  }
});

app.get('/major', (req, res) => {
  if (req.query.name == null) {
    res.redirect('check');
  } else {
    res.render('major', { name: req.query.name });
  }
});

app.get('/minor', (req, res) => {
  if (req.query.name == null) {
    res.redirect('check');
  } else {
    res.render('minor', { name: req.query.name });
  }
});

app.listen(3000);
