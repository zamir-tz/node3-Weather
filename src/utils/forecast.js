const request = require("request");

const forecast = (lat, long, callback) => {

    const url = "https://api.darksky.net/forecast/212f7e03add7ce96875c967870e192b1/"+ encodeURIComponent(lat) +","+ encodeURIComponent(long) +"?units=si"
    request({url, json: true}, (error, {body}) => {

        if(error) {
            callback("Unable to connect to weather service", undefined);
        } else if (body.error) {
            callback("Incorrect location", undefined);
        } else {
            callback(undefined, body.daily.data[0].summary + " it is currenly " + body.currently.temperature + " degrees out. Temprerature low is " + body.daily.data[0].temperatureLow + " temperature high is " + body.daily.data[0].temperatureHigh + ". There is a " + body.currently.precipProbability + "% chance of rain. blabla");
        }

    })

}


module.exports = forecast;