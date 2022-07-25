const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('database.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(router)
server.use(jsonServer.rewrite({"/cake/:cakePathname/feedback/:feedbackId": "/feedback/:feedbackId"}));