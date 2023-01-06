const Joi = require('@hapi/joi')

const listAllUser = Joi.object({
    limit:Joi.string().min(0).max(100).trim(),
    length:Joi.string().min(0).max(100).trim()
  })

  
  module.exports = {listAllUser}