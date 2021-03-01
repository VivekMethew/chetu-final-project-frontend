const { generateMessage, generateLocationMessage } = require('../modal/messages')
const { addUser, removeUser, getUser, getUsersInRoom } = require('../modal/users')
const Filter = require('bad-words')
let socketsConnected = new Set()
module.exports = {
    getConnection: (io) => {
        return function onConneted(socket) {
            // console.log(socket.id)
            socketsConnected.add(socket.id)

            io.emit('clients-total', socketsConnected.size)

            socket.on('join', (options, callback) => {
                const { error, user } = addUser({ id: socket.id, ...options })

                if (error) {
                    return callback(error)
                }

                socket.join(user.room)
                console.log(options)
                socket.emit('message', generateMessage('Admin', 'Welcome!'))
                socket.broadcast.to(user.room).emit('message', generateMessage('Admin', `${user.username} has joined!`))
                io.to(user.room).emit('roomData', {
                    room: user.room,
                    users: getUsersInRoom(user.room)
                })

                callback()
            })


            socket.on('sendMessage', (message, callback) => {
                const user = getUser(socket.id)
                const filter = new Filter()

                if (filter.isProfane(message)) {
                    return callback('Profanity is not allowed!')
                }

                io.to(user.room).emit('message', generateMessage(user.username, message))
                callback()
            })

            socket.on('sendLocation', (coords, callback) => {
                const user = getUser(socket.id)
                io.to(user.room).emit('locationMessage', generateLocationMessage(user.username, `https://google.com/maps?q=${coords.latitude},${coords.longitude}`))
                callback()
            })

            socket.on('disconnect', () => {
                const user = removeUser(socket.id)

                if (user) {
                    io.to(user.room).emit('message', generateMessage('Admin', `${user.username} has left!`))
                    io.to(user.room).emit('roomData', {
                        room: user.room,
                        users: getUsersInRoom(user.room)
                    })
                }
            })
        }
    }
}