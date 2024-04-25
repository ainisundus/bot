const { createUnixSocketPool } = require('../database')
const validate = async function (decoded, request, h) {
  const pg = await createUnixSocketPool()
  console.log(' - - - - - - - decoded token:')
  console.log(decoded)
  const { id } = decoded
  console.log(id)
  const people = await pg('users').where(id)
  if (!people) {
    return { isValid: false }
  } else { return { isValid: true } }
}

module.exports = { validate }
//
// const people = await pg('users').where(decoded.id)
// if (!people) {
// return { isValid: false }
// } else { return { isValid: true } }
