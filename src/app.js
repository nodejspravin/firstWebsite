const path = require('path')
const express = require('express')
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()

const publicDirName = path.join(__dirname, '../public')
const hbsDirName = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, "../template/partials")

app.set('view engine', 'hbs')
app.set('views', hbsDirName)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirName))


app.get("", (req, res) => {
    res.render("index",{
        title : "Welcome",
        name : "Pravin Kulkarni"
    })
})

app.get("/about", (req, res) => {
    res.render('about', {
        title : "About",
        country : "Thailand"
    })
})

app.get("/help", (req, res) => {
    res.render('help', {
        title : "Help",
        message : "Contact me at 9552520009"
    })
})


app.get("/weather", (req, res) => {

    if (!req.query.address){
        return res.send({
            error : "You have to enter address, to get correct data"
        })
    }

    const geocodeData = geocode(req.query.address, (error, {lattitude, logintude, location} = {}) => {
        if (error)
        {
            return res.send({ error })
        }

        forecast(lattitude, logintude, (error, forecastData) => {
            if (error)
            {
                return res.send({ error })
            }

            res.send({
                forecast : forecastData,
                location : location,
                address : req.query.address
            })
        })
    })
})



app.get("/help/*", (req, res) => {
    res.render("404",{
        title : "404",
        errormessage : "404 page not found"
    })
})

app.get("*", (req, res) => {
    res.render("404",{
        title : "404",
        errormessage : "404 page not found"
    })
})

app.listen(3000, () => {
    console.log('server is running on port 3000')
})