const express = require('express')
const router = express.Router()
const { upload } = require('../middlewares/fileUploader')

// controllers
const blogController = require('../controllers/blogs.controller')

router.get('/blogs', blogController.blogs)

router.post('/blogs/add', upload.single('image'), blogController.blog_create)

router.patch('/blogs', blogController.blog_update)

router.get('/delete_blog/:blogid', blogController.blog_delete)

module.exports = router