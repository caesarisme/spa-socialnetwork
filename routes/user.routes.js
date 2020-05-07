const router = require('express-promise-router')()

// Helpers
const { jwtRequired } = require('../helpers/jwt.helpers')
const { validateBody, validateParam, schemas } = require('../helpers/validation.helpers')
const { uploadImage }  = require('../helpers/upload.helper')


// Controller
const Controller = require('../controllers/user.controller')

router.route('/register')
  .post(validateBody(schemas.userRegistration), Controller.register)

router.route('/login')
  .post(validateBody(schemas.userLogin), Controller.login)

router.route('/refresh')
  .post(validateBody(schemas.userRefresh), Controller.refresh)

router.route('/search/:email')
  .get([jwtRequired, validateParam('email', schemas.emailSchema)], Controller.searchByEmail)

router.route('/logout')
  .post(jwtRequired, Controller.logout)

router.route('/follow/:followingId') // Todo: validate param
  .post(jwtRequired, Controller.followById)

router.route('/unfollow/:followingId') // Todo: validate param
  .post(jwtRequired, Controller.unfollowById)

router.route('/avatar')
  .post([jwtRequired, uploadImage('user', 'avatar')], Controller.postAvatar)

router.route('/data')
  .get(jwtRequired, Controller.getCurrentUser) // Todo: validate body
  .patch(jwtRequired, Controller.editCurrentUser)

router.route('/data/:userId')
  .get([jwtRequired, validateParam('userId', schemas.idSchema)], Controller.getUserById)

router.route('/followers')
  .get(jwtRequired, Controller.getCurrentUserFollowers)

router.route('/followings')
  .get(jwtRequired, Controller.getCurrentUserFollowings)

module.exports = router
