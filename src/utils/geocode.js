const request = require('request')
const constant = require('./constant')

const geocode = (address, callback) => {

    const geocodeUrl =  constant.baseUrl + address + ".json?access_token=" + constant.mapBoxAccessKey + "&limit=1" 
    request({url : geocodeUrl, json : true}, (error, response) => {
        if (error){
            callback("internet error", undefined)
        }
        else if (response.body.features.length <= 0){
            callback("unable to find location, try with another searcch", undefined)
        }
        else{
            callback(undefined, {
                lattitude : response.body.features[0].center[0],
                longitude : response.body.features[0].center[1],
                location : response.body.features[0].place_name
            })
        }
    })

}

module.exports = geocode