const fetch_blogs = require('../helpers/blogs')
const fs = require('fs')
module.exports = {
    blogs: async(req, res) => {
        if (req.session.userid) {
            try {
                res.render('default/blogs', { session: req.session })
            } catch (error) {
                res.render('default/blogs', { session: req.session })
            }
        } else {
            res.redirect('/login')
        }
    },
    blog_create: async(req, res) => {
        // console.log(req.file)
        await fetch_blogs.create_blog(req.session.access_token, {
                userid: "603640b671a4603ab8d37ec4",
                title: req.body.title,
                author: req.body.author,
                body: req.body.body,
                fileType: req.file.mimetype,
                filePath: `${req.file.destination}/${req.file.filename}`,
                fileBuffer: null,
                fileSize: req.file.size
            })
            .then(d => {
                console.log(d)
                res.redirect('/blogs')
            }).catch(err => {
                res.redirect('/blogs')
            })
    },
    blog_delete: async(req, res) => {
        try {
            await fetch_blogs.delete_blog(req.session.access_token, req.params.blogid)
                .then(d => {
                    console.log('successfully deleted', d)
                    fs.unlinkSync(`${d.result.filePath}`);
                    res.render('default/home', { message: 'successfully deleted' })
                }).catch(err => {
                    res.redirect('/home')
                })
        } catch (error) {
            res.redirect('/home')
        }
    },
    blog_update: async(req, res) => {
        try {
            await fetch_blogs.update_blog(req.session.access_token, blogid, req.body)
                .then(d => {
                    res.redirect('/home')
                }).catch(err => {
                    res.redirect('/home')
                })
        } catch (error) {
            res.redirect('/home')
        }
    }
}