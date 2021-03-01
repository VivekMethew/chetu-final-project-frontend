const express = require('express')
const router = express.Router()

// controllers
const usersController = require('../controllers/users.controller')

router.get('/home', usersController.users)

router.get('/chat-users', usersController.chats)

router.get('/send-mail', usersController.sendMail)

router.post('/send-mail', usersController.createMailer)

// router.get('/users/:userid', usersController.user)

// router.post('/users', usersController.blog_create)

router.patch('/users/:userid', usersController.users_update)

router.delete('/users/:userid', usersController.users_delete)

router.get('/login', usersController.get_login)

router.post('/login', usersController.post_login)

router.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/login')
})

module.exports = router