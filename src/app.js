const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./Utilities/geocode');
const forecast = require('./Utilities/forecast');

const app = express();
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Obinna Nwabia"
    });
});

app.get("/help", (req,res) => {
    res.render("help", {
        title: "help page",
        name: "Obinna Nwabia"
    });
});


app.get("/about", (req, res) => {
    res.render("about", {
        title: "about me",
        name: "Obinna Nwabia"
    });
});

app.get("/weather", (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "Enter An Address"
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, location} = {} ) => {
          if(error) {
              return res.send({ error})
          }
          forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
          });
    });
});

app.get("/help/*",(req, res) => {
      res.render("404", {
          title: 404,
          name: "Obinna Nwabia",
          errorMessage: "Help Article not found"
        });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: 404,
        name: "Obinna Nwabia",
        errorMessage: "PAGE NOT FOUND"
    });
});

app.listen(3000, () => {
    console.log("SERVER HAS STARTED")
});