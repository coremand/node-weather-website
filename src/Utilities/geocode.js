const request = require('request');

const geocode = (address, callback) => {
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaGFuc3ZhbCIsImEiOiJjand3ZzRjOGswMWM5NDRxZ3Zma3U1ZGIzIn0.HoAuAPjDERaI-AW51Ir37Q&limit=1'
    
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback("No Data connection");
        }else if(body.features.length === 0){
            callback("cant find location");
        }else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude:body.features[0].center[0],
                location: body.features[0].place_name
            });
            
        }
    });
}
module.exports = geocode;