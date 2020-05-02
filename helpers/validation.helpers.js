const Joi = require('joi')

module.exports = {
  validateParam: (name, schema) => {
    return (req, res, next) => {
      const result = Joi.validate({ param: req['params'][name] }, schema)

      if (result.error) {
        console.log(name, req['params'][name])
        return res.status(400).json(result.error)
      }

      if (!req.validated) {
        req.validated = { params: {} }
      }

      req.validated['params'][name] = result.value.param
      next()
    }
  },

  validateBody: (schema) => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema)

      if (result.error) {
        return res.status(400).json(result.error)
      }

      if (!req.validated) {
        req.validated = { body: {} }
      }

      req.validated['body'] = result.value
      next()
    }
  },

  schemas: {
    idSchema: Joi.object().keys({
      param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }),

    userRegistration: Joi.object().keys({
      email: Joi.string().email().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      password: Joi.string().required()
    }),

    userLogin: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }),

    userRefresh: Joi.object().keys({
      refreshToken: Joi.string().regex(/^[0-9a-zA-Z-]{36}$/).required()
    }),

    createPost: Joi.object().keys({
      title: Joi.string().required(),
      content: Joi.string().required()
    }),

    postEdit: Joi.object().keys({
      title: Joi.string(),
      content: Joi.string()
    }),

    createComment: Joi.object().keys({
      content: Joi.string().required()
    }),
  }
}