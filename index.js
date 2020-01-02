const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io').listen(server)
const layout = require('express-ejs-layouts')

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(layout)

// SOCKET VARIABLES
let connections = []
let players = []
// SOCKET FUN
io.sockets.on('connection', socket => {
    console.log(socket)
    connections.push(socket)
    console.log(`Connection made: ${connections.length} sockets connected.`)

    socket.on('disconnect', data => {
        updateUsernames()
        players.splice(players.indexOf(socket.username), 1)

        console.log(data)
        connections.splice(connection.indexOf(socket), 1)
        io.emit('disconnected', socket.username)
        console.log(`Disconneted: ${connections.length} sockets connected.`)
    })

    const updateUsernames = () => {
        io.sockets.emit('get players', players)
    }
})

app.get('/', (req, res) => {
    res.render('index')
})

server.listen(3000, () => {
    console.log('keeping it 3000')
})