const router = require('express-promise-router')()

// Helpers
const { jwtRequired } = require('../helpers/jwt.helpers')
const { validateBody, validateParam, schemas } = require('../helpers/validation.helpers')
const { uploadImage } = require('../helpers/upload.helper')

// Controller
const Controller = require('../controllers/post.controller')


router.route('/')
  .post(
    [jwtRequired, validateBody(schemas.createPost)],
    Controller.createPost
  ) // Create my post

router.route('/:postId')
  .patch(
    [jwtRequired, validateParam('postId', schemas.idSchema), validateBody(schemas.postEdit)],
    Controller.editPostById
  ) // Edit my post
  .delete([jwtRequired, validateParam('postId', schemas.idSchema)], Controller.deletePostById) // Delete my post

router.route('/image')
  .post(
    [jwtRequired, uploadImage('post', 'image')],
    Controller.uploadImageForPost
  ) // Upload image for post

router.route('/:postId/comments') // Todo: Test endpoint postman
  .post(
    [jwtRequired, validateParam('postId', schemas.idSchema), validateBody(schemas.createComment)],
    Controller.addCommentToPostWithId
  ) // Comment any post

router.route('/:postId/comments/:commentId')
  .delete(
    [jwtRequired, validateParam('postId', schemas.idSchema), validateParam('commentId', schemas.idSchema)],
    Controller.deleteCommentFromPostWithId
  ) // Delete my comment or comment of my post

router.route('/feed')
  .get([jwtRequired], Controller.getFeed)

module.exports = router
