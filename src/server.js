'use strict'

const Hapi = require('@hapi/hapi')
const routes = require('./routes')
// const Jwt = require('hapi-auth-jwt2')
const keys = 'NeverShareYourSecret'

const { createUnixSocketPool } = require('./database')
const validate = async function (decoded, request, h) {
  const pg = await createUnixSocketPool()
  console.log(' - - - - - - - decoded token:')
  console.log(decoded)
  const { id } = decoded
  console.log(id)
  try {
    const user = await pg('users').where({ id }).first() // Menggunakan first() untuk mengambil satu baris saja
    if (!user) {
      return { isValid: false }
    } else {
      return { isValid: true }
    }
  } catch (error) {
    console.error('Error while validating token:', error)
    return { isValid: false }
  }
}

const init = async () => {
  const PORT = process.env.PORT || 8080
  const server = Hapi.server({
    port: PORT,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*']

      }
    }
  })

  await server.register(require('hapi-auth-jwt2'))
  server.auth.strategy('jwt_mbkm', 'jwt', {
    key: keys,
    validate,
    verifyOptions: {
      ignoreExpiration: true
    }
  })
  // eslint-disable-next-line spaced-comment
  server.auth.default('jwt_mbkm')
  server.events.on('log', (event) => {
    console.log(event) // Menampilkan semua log Hapi
  })
  server.route(routes)
  await server.start()
  console.log(`Server berjalan pada ${server.info.uri}`)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
