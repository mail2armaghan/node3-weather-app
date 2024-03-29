const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/c25c2fb755399a097b2d3964aa0ba169/' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            let tempDegrees = (body.currently.temperature - 32) * 5/9;
            tempDegrees = Math.round(tempDegrees * 100) / 100;
            let lowTemp = (body.daily.data[0].temperatureLow - 32 ) * 5/9;
            lowTemp = Math.round(lowTemp * 100) / 100;
            let highTemp = (body.daily.data[0].temperatureHigh -32 ) * 5/9;
            highTemp = Math.round(highTemp * 100) / 100;
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + tempDegrees + ' degress out. This high today is ' + highTemp + 'with low of ' + lowTemp + ' There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast