const axios = require('axios')
const apis = require('../helpers/api')
module.exports = {
    blogs: async(token) => {
        return await new Promise((resolve, reject) => {
            axios.get(`${process.env.API_URL}/blogs`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((result) => {
                resolve(result.data)
            }).catch((err) => {
                reject(err)
            })
        })
    },
    delete_blog: async(token, blogid) => {
        return await new Promise((resolve, reject) => {
            axios.delete(`${process.env.API_URL}/blogs/${blogid}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((result) => {
                resolve(result.data)
            }).catch((err) => {
                reject(err)
            })
        })
    },
    update_blog: async(token, blogid, update_value) => {
        return await new Promise((resolve, reject) => {
            axios.patch(`${process.env.API_URL}/blogs/${blogid}`, update_value, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((result) => {
                resolve(result.data)
            }).catch((err) => {
                reject(err)
            })
        })
    },
    create_blog: async(token, blog_data) => {
        // console.log(blog_data)
        return await new Promise((resolve, reject) => {
            axios.post(`${process.env.API_URL}/blogs`, blog_data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((result) => {
                resolve(result.data)
            }).catch((err) => {
                reject(err)
            })
        })
    }
}