require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')
const morgan = require('morgan')
const session = require('express-session')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const PORT = process.env.PORT || 3000

io.on('connection', require('./helpers/socket.connection').getConnection(io))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true
}))

const viewPath = path.join(__dirname, 'views')
const viewStatic = path.join(__dirname, 'public')

app.set('view engine', 'ejs')
app.set('views', viewPath)

app.use('/public', express.static(viewStatic))

app.use(require('./routes/users.routes'))
app.use(require('./routes/blogs.routes'))

// fs.unlinkSync('public/images/blogs/blogs-1614577614387.jpg')

app.use(morgan('dev'))

app.use((req, res, next) => {
    next({ error: { status: 500, message: 'Not Found!!!' } })
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.redirect('/home')
})

server.listen(PORT, () => {
    console.log('Server Running On', PORT)
})