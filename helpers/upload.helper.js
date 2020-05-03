const multer = require('multer')
const { v4: uuid } = require('uuid')

module.exports = {
  uploadImage: (model, field = 'file') => multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, './static/uploads/')
      },
      filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1]
        cb(null, `${model}-${field}-${uuid()}.${ ext }`)
      }
    }),
    fileFilter: (req, file, cb) => {
      if (!file.mimetype.startsWith('image')) {
        const error = new Error('Wrong file type')
        error.status = 422
        error.code = "LIMIT_FILE_TYPES"
        return cb(error, false)
      }

      cb(null, true)
    },
    limits: {
      fileSize: 200000
    }
  }).single(field)
}