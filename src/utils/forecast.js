const request = require('request')
const constant = require('./constant')

const forecast = (lat, long, callback) => {

    const forecastUrl = "http://api.weatherstack.com/current?access_key=92a64c91a811b3fcbfd9f86c16795084&query=" + lat + "," + long

    request({url: forecastUrl, json : true}, (error, { body }) => {
        if (error){
            callback('something wrong', undefined)
        }
        else if (body.error){
            callback('unbale to get foreccast', undefined)
        }
        else {
            callback(undefined, 'It is currently ' + body.current.temperature + ' degress out. There is a ' + body.current.feelslike + '% chance of rain.')
        }
    })
}

module.exports = forecast