const jwt = require('jsonwebtoken')

const secretKey = 'NeverShareYourSecret'

const createToken = jwt.sign({
  id: users.id,
  email: users.email
}, secretKey)

module.exports = { createToken }
