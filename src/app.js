const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geoCode = require('../utils/geoCode');
const forecast = require('../utils/forcast');

const app = express();
const port = process.env.PORT || 3000;

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location 
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve 
app.use(express.static(publicDirectoryPath));

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Idan Harari'
    });
});

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        name: 'Idan Harari'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: 'You must provide a search term!'
        });
    }

    geoCode(req.query.search, (error, { latitude, longitude, location } = {}) => {
        if (error){
            console.log(error);
            return res.send({error});
        }
        forecast(latitude, longitude, (err, forecastData) => {
            if (err){
                return res.send({err}); 
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.search
            });
        });
    });
});

app.get('/help', (req,res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Idan Harari'
    });
});

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Idan Harari',
        errorMessage: 'Help article not found.'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Idan Harari',
        errorMessage: 'Page not found.'
    });
});


app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});