const jwt = require('jsonwebtoken')
const config = require('config')

const User = require('../models/User')

module.exports = {
  issueToken: (payload, options = {}) => (
    jwt.sign(payload, config.get('SECRET'), options)
  ),

  jwtRequired: (req, res, next) => {
    const authHeader = req.headers.authorization

    if (authHeader) {
      const token = authHeader.split(' ')[1]
      jwt.verify(token, config.get('SECRET'), async (err, payload) => {
        if (err) {
          return res.sendStatus(401)
        }

        req.user = await User.findById(payload.sub)
        next()
      })
    } else {
      res.sendStatus(403)
    }
  }
}
