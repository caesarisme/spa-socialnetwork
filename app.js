const express = require('express')
const logger = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const config = require('config')

mongoose.connect(config.get('MONGO_URL'), {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true
})

const app = express()

// Route imports
const userRoutes = require('./routes/user.routes')
const postRoutes = require('./routes/post.routes')

// Middlewares
app.use(logger('dev'))
app.use(bodyParser.json())

// Routes
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)

// Catch 404 errors and forward them to error handler
app.use((req, res, next) => {
  const err = new Error('Not found')
  err.status = 404
  next(err)
})

// Error handler function
app.use((err, req, res, next) => {
  const error = app.get('env') === 'development' ? err : {}
  const status = err.status || 500

  // Respond to client
  res.status(status).json({
    error: { message: error.message }
  })

  // Respond to ourselves
  console.log(err)
})

// Start the server
const PORT = config.get('PORT') || 3000
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`))