const request = require('request');

const forecast = (longitude,latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/f40737304d7b90e1746904f77489a767/' + longitude + ',' + latitude 

    request({url, json: true}, (error, {body}) => {
         if(error){
             callback("No data connection")
         }else if(body.error) {
            callback("Invalid entry")
         }else {
             callback(undefined, body.daily.data[0].summary + " It is currently" + " " + body.currently.temperature +" degrees out with a high of " + body.daily.data[0].temperatureHigh + 
             " degrees " + "and a low of " + body.daily.data[0].temperatureLow + " degrees . There is a " + body.currently.precipProbability+"% " + " chance of rain.");
         }
    });

}
module.exports = forecast;