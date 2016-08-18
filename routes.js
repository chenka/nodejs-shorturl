const Joi = require('joi')
const db = require('./db')

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler(request, reply) {
      reply.file('views/index.html')
    }
  },
  {
    method: 'GET',
    path: '/public/{file}',
    handler(request, reply) {
      reply.file(`public/${request.params.file}`)
    }
  },
  {
    method: 'POST',
    path: '/new',
    handler(request, reply) {
      const newRedir = new db.Redir({
        url: request.payload.url,
        createdAt: new Date()
      })

      newRedir.save((error, redir) => {
        if (error) {
          reply(error)
        } else {
          reply(redir)
        }
      })
    },
    config: {
      validate: {
        payload: {
          url: Joi.string()
                  .regex(/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/)
                  .required()
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/{hash}',
    handler(request, reply) {
      const query = {
        'shortUrl': request.params.hash
      }

      db.Redir.findOne(query, (error, redir) => {
        if (error) {
          return reply(error)
        } else if (redir) {
          reply.redirect(redir.url)
        } else {
          reply.file('views/404.html').code(404)
        }
      })
    }
  }
]
