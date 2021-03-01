const fetch_blogs = require('../helpers/blogs')
const fetch_users = require('../helpers/users.fetcher')
module.exports = {
    users: async(req, res, next) => {
        if (req.session.userid) {
            fetch_blogs.blogs(req.session.access_token).then(d => {
                res.render('default/index', { session: req.session, blogs: d })
            }).catch(err => {
                res.render('default/index', { session: req.session, blogs: undefined })
            })
        } else {
            res.redirect('/login')
        }
    },
    chats: async(req, res, next) => {
        if (req.session.userid) {
            fetch_blogs.blogs(req.session.access_token).then(d => {
                res.render('default/root', { session: req.session, blogs: d })
            }).catch(err => {
                res.render('default/root', { session: req.session, blogs: undefined })
            })
        } else {
            res.redirect('/login')
        }
    },
    sendMail: async(req, res, next) => {
        if (req.session.userid) {
            fetch_blogs.blogs(req.session.access_token).then(d => {
                res.render('default/compose', { session: req.session, blogs: d })
            }).catch(err => {
                res.render('default/compose', { session: req.session, blogs: undefined })
            })
        } else {
            res.redirect('/login')
        }
    },
    users_create: async(req, res) => {
        res.render('default/index')
    },
    users_delete: async(req, res) => {
        res.render('default/index')
    },
    users_update: async(req, res) => {
        res.render('default/index')
    },
    get_login: async(req, res) => {
        res.render('default/login')
    },
    post_login: async(req, res) => {
        console.log(req.body)
        const sess = req.session
        fetch_users.users_login(req.body)
            .then(d => {
                // console.log(d)
                sess.userid = d.userid
                sess.access_token = d.accessToken
                sess.refress_token = d.refreshToken
                res.redirect('/home')
            }).catch(err => {
                // console.log(err.message)
                res.redirect('/login')
            })
    },
    createMailer: async(req, res) => {
        // console.log(req.body)
        await fetch_users.mailSender(req.session.access_token, req.body)
            .then(d => {
                // console.log(d)
                res.redirect('/send-mail')
            }).catch(err => {
                // console.log(err.message)
                res.redirect('/login')
            })
    }
}