const request = require("request");


const geocode = (address, callback) => {

    console.log(address);

    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiemxveS1ib2JvdCIsImEiOiJjazdvdXN2MmwwMWY4M2xzdmJqMTB5eGRnIn0.NM5R8uKVG_TjA4ev_pA3cQ&limit=1"

    request({url, json: true}, (error, {body}) => {
        
        console.log("error", error);
        console.log("response", body.features.length);

        debugger

        if(error){
            callback("Unable to connect to location service", undefined);
        } else if (body.features.length === 0) {
            callback("Unable to find location. Try another search", undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    })

}

module.exports = geocode;