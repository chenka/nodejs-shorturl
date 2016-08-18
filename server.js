const Hapi = require('hapi')
const server = new Hapi.Server()
const routes = require('./routes')
const db = require('./db')

server.connection({
  port: process.env.PORT || 3000,
  routes: { cors: true }
})

server.register(require('inert'), (error) => {
  db.on('error', console.error.bind(console, 'connection error:'))
    .once('open', () => {
      server.route(routes)
      server.start((error) => {
        if (error) throw error

        console.log(`Server running at port ${server.info.port}`)
      })
    })
})
