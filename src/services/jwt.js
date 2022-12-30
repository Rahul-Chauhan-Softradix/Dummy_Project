const jwt = require('jsonwebtoken')
const {secretKey} = require('../../config/keys')

const refreashToken = (payload)=> jwt.sign(payload,secretKey,{expiresIn:'24hr'})

module.exports = {refreashToken}