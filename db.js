const mongoose = require('mongoose')
const shortid = require('shortid')
const mongoUri = process.env.MONGOURI || 'mongodb://localhost/shorturl'
const Schema = mongoose.Schema
mongoose.Promise = global.Promise

const options = {
  server: {
    socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 }
  },
  replset: {
    socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 }
  }
}

mongoose.connect(mongoUri, options)
const db = mongoose.connection
const redirSchema = new Schema({
  shortUrl: {
    type: String,
    default: shortid.generate
  },
  url: String,
  createdAt: Date
}, {
  versionKey: false
})

const Redir = mongoose.model('Redir', redirSchema)

module.exports = db
module.exports.Redir = Redir
