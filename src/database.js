const { knex } = require('knex')
const createUnixSocketPool = async config => {
  try {
    return knex({
      client: 'pg',
      connection: {
        host: '34.101.34.7',
        user: 'postgres', // e.g. 'my-db-user'
        password: '123', // e.g. 'my-db-password'
        database: 'pengguna', // e.g. 'my-database'
        socketPath: 'cloudsql/mbkm-419510:asia-southeast2:test', // e.g. '/cloudsql/project:region:instance'
        // Specify additional properties here.
        ...config
      }
    })
  } catch (error) {
    console.error('Error creating database pool:', error)
    throw error // Rethrow the error to handle it elsewhere if needed
  }
}

createUnixSocketPool()
module.exports = { createUnixSocketPool }
