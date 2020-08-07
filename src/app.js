const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Arth Limchiu'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Arth Limchiu'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Arth Limchiu',
    message: 'This is the help page'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Please provide an address'
    });
  }

  geocode(req.query.address, (error, data) => {
    if (error) {
      res.send({ error });
    } else {
      const { latitude, longitude, location } = data;

      forecast(latitude, longitude, (error, weather) => {
        if (error) {
          res.send({ error });
        } else {
          res.send({
            forecast: weather,
            location: location,
            address: req.query.address
          });
        }
      });
    }
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    });
  }

  console.log(req.query.search);
  res.send({
    products: []
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Looks like you\'re lost',
    message: 'Help article not found.',
    name: 'Arth Limchiu'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: 'Looks like you\'re lost',
    message: 'Page not found.',
    name: 'Arth Limchiu'
  });
});

app.listen(port, () => {
  console.log('Server is up on port 3000');
});