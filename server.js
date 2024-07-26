const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const morgan = require('morgan')

const app = express()

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', () => {
    console.log(`connected to MongoDB ${mongoose.connection.name}`)
})


const Car = require('./models/car.js')


app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(morgan('dev'))


app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/cars', async (req, res) => {
    const allCars = await Car.find({})
    res.render('cars/index.ejs', { cars: allCars })
})

app.get('/cars/new', (req, res) => {
    res.render('cars/new.ejs')
})

app.get('/cars/:carId', async (req, res) => {
    const foundCar = await Car.findById(req.params.carId)
    res.render('cars/show.ejs', { car: foundCar })
})

app.post('/cars', async (req, res) => {
    if (req.body.isRunning === 'on') {
        req.body.isRunning = true
    } else {
        req.body.isRunning = false
    }
    await Car.create(req.body)
    res.redirect('/cars')
})

app.delete('/cars/:carId', async (req, res) => {
    await Car.findByIdAndDelete(req.params.carId)
    res.redirect('/cars')
})

app.get('/cars/:carId/edit', async (req, res) => {
    const foundCar = await Car.findById(req.params.carId)
    res.render(cars/edit.js, { car: foundCar })
})























app.listen(3000, () => {
    console.log('Listening on port 3000')
})