const axios = require('axios')
const apis = require('../helpers/api')
module.exports = {
    get_all_users: async() => {
        return await new Promise((resolve, reject) => {
            axios.get(`${process.env.API_URL}/blogs`).then((result) => {
                resolve(result.data)
            }).catch((err) => {
                reject(err)
            })
        })
    },
    delete_users: async(blogid) => {
        return await new Promise((resolve, reject) => {
            axios.delete(`${process.env.API_URL}/blogs/${blogid}`).then((result) => {
                resolve(result.data)
            }).catch((err) => {
                reject(err)
            })
        })
    },
    update_users: async(blogid, update_value) => {
        return await new Promise((resolve, reject) => {
            axios.patch(`${process.env.API_URL}/blogs/${blogid}`, update_value).then((result) => {
                resolve(result.data)
            }).catch((err) => {
                reject(err)
            })
        })
    },
    users_login: async(credencials) => {
        return await new Promise((resolve, reject) => {
            axios.post(`${process.env.API_URL}/users/login`, credencials).then((result) => {
                resolve(result.data)
            }).catch((err) => {
                reject(err)
            })
        })
    },
    users_create: async(data) => {
        return await new Promise((resolve, reject) => {
            axios.post(`${process.env.API_URL}/users`, data).then((result) => {
                resolve(result.data)
            }).catch((err) => {
                reject(err)
            })
        })
    },
    mailSender: async(token, mailData) => {
        return await new Promise((resolve, reject) => {
            axios.post(`${process.env.API_URL}/users/mailer`, mailData, {
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