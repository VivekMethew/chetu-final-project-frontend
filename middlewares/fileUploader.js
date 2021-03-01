const multer = require('multer')
const path = require('path')

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/images/blogs')
    },
    filename: function(req, file, cb) {
        cb(null, 'blogs' + '-' + Date.now() + path.extname(file.originalname))
    }
})
module.exports = {
    upload: multer({ storage: storage })
}