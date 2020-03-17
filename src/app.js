const path = require("path");
const express = require("express");
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handelbars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: "weather app",
        name: "zloy bobot"
    });
});

app.get("/about", (req, res) => {
    res.render('about', {
        name: "zlot bobot",
        title: 'About'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        name: 'bobot',
        message: "this is random help message"
    })
});

const test = app.get("/weather", (req, res) => {
    
    if(!req.query.address){
        return res.send({
            error: "no address"
        });
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({ error });
        } else

    
        forecast(latitude, longitude, (error, forecastdata) => {
            if(error){
                return res.send({ error });
            }

            res.send({
                address: req.query.address,
                location,
                forecast: forecastdata
            });

        });
    

    });
    
    
});

app.get('/products', (req, res) =>{

    if(!req.query.search){
        return res.send({
            error: "need search term"
        });
    }

    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Help article not found',
        title: '404'
    });
})

app.get('*', (req, res)=>{
    res.render('404', {
        message: 'page not found',
        title: "404"
    });
})

app.listen(3000, () => {
    console.log("server started on port 3000.");
});