const socket = io()

const messageForm = document.getElementById('formMessages')
let messageContainer = document.getElementById('messageContainer')


socket.on('locationMessage', (message) => {
    console.log(message)
})

socket.on('roomData', ({ room, users }) => {
    console.log(room, users)
})

messageForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const message = e.target.elements.messagesText.value
    console.log(message)
    socket.emit('sendMessage', message, (error) => {
        if (error) {
            return console.log(error)
        }
        console.log('Message delivered!')
        addMessageToUI(true, message)
    })
})


socket.on('message', (message) => {
    console.log('Recieve All Message', message)
    addMessageToUI(false, message)
})


function addMessageToUI(isOwnMessage, data) {
    console.log(data)
    const element = `<li class="${isOwnMessage ? "messages-right":"messages-left"}">
        <p>${data.text}</p>
    </li>`

    messageContainer.innerHTML += element
    scrollToBottom()
}

function scrollToBottom() {
    messageContainer.scrollTo(0, messageContainer.scrollHeight)
}

socket.emit('join', { username: 'vivek kumar', room: userid }, (error) => {
    if (error) {
        alert(error)
        location.href = '/logout'
    }
})