const express = require('express')
const ejs = require('ejs')
const path = require('path')
const { host, PORT } = require('./config.js')
const app = express()

// setting template engine
app.engine('html', ejs.renderFile)
app.set('view engine', 'html')
app.set('views', path.join(__dirname, 'views'))

// third-party and build-in middlewares
app.use( express.static(path.join(__dirname, 'public')) )

// routes
app.get('/', (req, res) => res.render('index.html'))

app.listen(PORT, () => console.log('http://localhost:' + PORT))