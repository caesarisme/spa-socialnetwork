const router = require('express-promise-router')()

// Helpers
const { jwtRequired } = require('../helpers/jwt.helpers')
const { validateBody, schemas } = require('../helpers/validation.helpers')

// Controller
const Controller = require('../controllers/user.controller')

router.route('/register')
  .post(validateBody(schemas.userRegistration), Controller.register)

router.route('/login')
  .post(validateBody(schemas.userLogin), Controller.login)

router.route('/refresh')
  .post(validateBody(schemas.userRefresh), Controller.refresh)

router.route('/logout')
  .post(jwtRequired, Controller.logout)

router.route('/follow/:followingId')
  .post(jwtRequired, Controller.followById)

module.exports = router
