const { nanoid } = require('nanoid')
const { Storage } = require('@google-cloud/storage')
// const { knex } = require('knex')
const { createUnixSocketPool } = require('./database')
// eslint-disable-next-line no-unused-vars
const btoa = require('btoa')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')

const storage = new Storage({
  projectId: 'mbkm-413714',
  credentials: {

    type: 'service_account',
    project_id: 'mbkm-413714',
    private_key_id: 'a9c18565b3252f28556bac994886e7660070b6b0',
    private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCtigsVxnE7Oo+d\nFThZZWx903or78RiQYXOpzMTTuQv3JDb1j2D6+HaGesExgaSMAktrTp3eWwSZCsU\n+lbAX8MHg2ygp1x0V3KQYINrZ6gPsDI55MXUr0FkHBb9Ucf/fHmPs3/gGoHxnemG\nNJA+10Vwc8/L80RFzU6jPJUtrhHaw09OCUuHYO0XAFj63Nn5jXhoxSAo3GUgRdgB\nQ5SK6vf32bJGhXIuzOy522v8EVK9D9GP5Z2N+BffTJ1ibi4yulZ8AQdeis9SzKOX\njhcBdlLZrPDwkCOzCCYcSr49iXB24LOaEm3XutyY3qcgWQOVKTSoBxyvBtqPygQi\n8AYmziqfAgMBAAECggEAEnWYcpiuYGb9HMVDk7AdXLsF3VjpR6xW6oxQJgcicFGN\nb8eiY9R6VzlM4wVExgBpvDFCLVromyzgL6CQtsYuQtqAz7ajDSsPdXpsBZzmkcNO\nbGhrKhGkVTJEYxjJEIzx305wKpXslEIVs4qxfJsTI1WRA82cybH/jI88AmUS4sqY\n4/R/1smDx5ysMrkE/4JGgwBrpN++gDJnk4t6xT54QZS5KLENqQ82jf0ovyJvM85G\neTVQDorVLVMvQtPfzmog58BC+9YKHh/CIw5y5bUNfoKlc//Ta6iGnseHem1CLEHT\n6J6MG2I1IykmmUEgQnZaLmZYLeho0QB3M6w0Vj0kiQKBgQDtRTx2Oh+Yz/pKqTLn\nD4KlvalxW8SdO9ipBLzIfH3YF+Ebf9dhVpk2wz2LJZZidqqGvyFVeU5N+WGCNyDw\nRJb/mmqWjPFqL0PyU9erU2xFHNmYYwNC7Vqqb/AhQmHJcrBbEbzyPPv+Su85g8Yh\nRC6SgOk9Fps6ykXQkjSfur11dwKBgQC7PO0IyejcnjYQyhTxz76yLuC0+mT5/YYY\nka+aUDl5Wp6VyBYCOYpGM+FznR5tiIvaYipz5W3+/kuK+iAE5TkS1qaBHrptx+8K\njnCq5fnTu1bZ6M1US9VwfHGXly/heOGcxwoem1cHMBAh57fvzXPeO+5v4b8JnzEp\n+DOfqzReGQKBgQCzNcRBGA2dghjuI3YLB7AKN4Kv2Dxc9kLjBm0AkOcMPJ0OBDVN\nk/cNYdIuMymvHSoXtG0c/g6i3mVD0RfT4jqavKsdIz+EkEal1aXkBZKVcQD5FG/2\nMQh2Cy44MMdjPHjvkCpCXMWIgFjH/Du+DJ2QkkWYmmaMtRKeQo/0xTssaQKBgQCt\nedVjvy6wuST+iTy+jevwyt4Gz7eepvYG7XP1VT7q4Lrtq2Q4y3cBdC/+HiSC93Ab\n9be/iWJQTutO6E+iOX6Xpai/GOlBrWwcK7zXmhvNwFTHsJoM7/XhMmtMOBd0n7ro\ntsD5epM3ZaCMyVPyKjigPoa7wjxtfcDfUccCuGzcgQKBgQC5NtQ80F+ozlbLRcm9\nx9CM6FrgLfkEzChE8ridiVzERZw8wy4blYz4v4QadE00MKbeZIGNYYvgQa/AkfWS\nOSMvVZ8k435c7ujUh3XKF7J3kOA0E9RYbAUOOSmU3GctuKXXn4sAH6y9OP8WLJTo\naGzWLF0Nct2/YiDJ7J9OaPd5fg==\n-----END PRIVATE KEY-----\n',
    client_email: 'mbkm-photo@mbkm-413714.iam.gserviceaccount.com',
    client_id: '107766563256297172906',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url: 'https://www.googleapis.com/robot/v1/metadata/x509/mbkm-photo%40mbkm-413714.iam.gserviceaccount.com',
    universe_domain: 'googleapis.com'
  }
})

const bucketName = 'mbkm_photo'
const bucket = storage.bucket(bucketName)

// const createUnixSocketPool = async config => {
// try {
// return knex({
// client: 'pg',
// connection: {
// host: '34.101.147.150',
// user: 'postgres', // e.g. 'my-db-user'
// password: 'password123', // e.g. 'my-db-password'
// database: 'data', // e.g. 'my-database'
// socketPath: '/mbkm-413714:asia-southeast2:test', // e.g. '/cloudsql/project:region:instance'
// Specify additional properties here.
//   ...config
// }
// })
// } catch (error) {
// console.error('Error creating database pool:', error)
// throw error // Rethrow the error to handle it elsewhere if needed
// }
// }
async function testConnection () {
  try {
    // eslint-disable-next-line no-unused-vars
    const pool = await createUnixSocketPool()
    console.log('koneksi berhasil')
  } catch (error) {
    console.error('koneksi gagal')
  }
}
testConnection()

// vacaybot vacaybot
// createUnixSocketPool initializes a Unix socket connection pool for
// a Cloud SQL instance of MySQL

const registerHandler = async (request, h) => {
  const { nama, email, password } = request.payload

  if (!nama) {
    const response = h.response({
      status: 'fail',
      message: 'Registrasi gagal. Mohon isi nama anda'
    })

    response.code(400)
    return response
  } else if (!email) {
    const response = h.response({
      status: 'fail',
      message: 'Registrasi gagal. Mohon isi email anda'
    })

    response.code(400)
    return response
  } else if (!password) {
    const response = h.response({
      status: 'fail',
      message: 'Registrasi gagal. Mohon isi password anda'
    })

    response.code(400)
    return response
  }

  const id = nanoid(16)
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const data = await createUnixSocketPool()
    await data('users').insert({ id, nama, email, password: hashedPassword })
  } catch (e) {
    const response = h.response({
      status: 'failed',
      message: e.message
    })
    response.code(500)
    return response
  }

  const response = h.response({
    status: 'success',
    message: 'Registrasi berhasil ditambahkan',
    userId: id
  })

  response.code(201)
  return response
}

const editUserHandler = async (request, h) => {
  const { password } = request.payload
  const { id } = request.params
  if (!password) {
    const response = h.response({
      status: 'fail',
      message: 'Edit password gagal. Mohon isi password baru anda'
    })

    response.code(400)
    return response
  }
  try {
    const data = await createUnixSocketPool()
    const hashedPassword = await bcrypt.hash(password, 10)

    await data('users').where({ id })
      .update({
        password: hashedPassword
      })
  } catch (e) {
    const response = h.response({
      status: 'failed',
      message: 'gagal'
    })
    response.code(500)
    return response
  }

  const response = h.response({
    status: 'success',
    message: 'Edit password berhasil'
  })

  response.code(200)
  return response
}

const deleteUserHandler = async (request, h) => {
  const { id } = request.params
  console.log('Received user id:', id)
  // const { fileName } = request.payload
  try {
    const data = await createUnixSocketPool()
    const deleteData = await data('users').where({ id }).del()

    if (deleteData === 0) {
      return h.response({
        status: 'fail',
        message: 'data user tidak berhasil dihapus'
      }).code(404)
    }
    const response = h.response({
      status: 'success',
      message: 'Data user berhasil dihapus'
    })
    return response.code(200)
  } catch (error) {
    const response = h.response({
      status: 'fail',
      message: 'Terjadi kesalahan saat menghapus data user dan profile photo'
    })
    return response.code(400)
  }
}

const editPictureHandler = async (request, h) => {
  let success = false

  try {
    const { image } = request.payload.image
    const { id } = request.params
    const newFileName = `picture/${id}-${nanoid(8)}.jpg`

    await bucket.file(newFileName).upload(image)

    // Update link photo profil di Cloud SQL
    await createUnixSocketPool().knex('users').where({ id }).update({ picture: newFileName })

    success = true
  } catch (error) {
    console.error('Error updating photo profile:', error)
  }

  if (success) {
    const response = h.response({
      status: 'success',
      message: 'Photo profile berhasil diubah'
    })

    response.code(200)
    return response
  } else {
    const response = h.response({
      status: 'fail',
      message: 'Internal Server Error'
    })
    response.code(500)
    return response
  }
}

const deletePictureHandler = async (request, h) => {
  let success = false

  try {
    const { id } = request.params
    const { fileName } = request.payload

    const deleteProfilePhoto = async (fileName) => {
      await bucket.file(fileName).delete()
    }

    // Hapus foto profil dari Cloud Storage
    await deleteProfilePhoto(fileName)
    await createUnixSocketPool().knex('users').where({ id }).update({ picture: null })

    success = true
  } catch (error) {
    console.error('Error deleting photo profile:', error)
  }

  if (success) {
    const response = h.response({
      status: 'success',
      message: 'Photo profile berhasil dihapus'
    })
    response.code(200)
    return response
  } else {
    const response = h.response({
      status: 'fail',
      message: 'Photo profile tidak berhasil dihapus'
    })
    response.code(500)
    return response
  }
}
const logoutHandler = (request, h) => {
  // eslint-disable-next-line no-unused-vars
  const logout = async () => {
    return { sValid: false }
  }
  try {
    const response = h.response({
      status: 'success',
      message: 'Telah logout'
    })
    response.code(200)
    return response
  } catch (e) {
    const response = h.response({
      status: 'failed',
      message: e.message
    })
    response.code(500)
    return response
  }
}

const getUserHandler = async (request, h) => {
  const { id } = request.params
  console.log('id dari req params', id)

  try {
    const data = await createUnixSocketPool()

    const userData = await data('users').where({ id }).select('nama', 'email', 'picture')
    if (!userData || !(await userData).length) {
      const response = h.response({
        status: 'gagal',
        message: 'data pengguna tidak ditemukan'
      })
      response.code(404)
      return response
    }

    const response = h.response({
      status: 'success',
      message: 'Berhasil mengirim data dan foto',
      user: userData
    })
    response.code(200)
    return response
  } catch (e) {
    const response = h.response({
      status: 'failed',
      message: 'gagal'
    })
    response.code(501)
    return response
  }
}
const getAllUser = async (request, h) => {
  try {
    const data = await createUnixSocketPool()
    const userAll = data('users').select('*')
    return userAll
  } catch (error) {
    console.error('gagal get all user', error)
  }
}

const loginHandler = async (request, h) => {
  const { email, password } = request.payload
  if (!email) {
    const response = h.response({
      status: 'fail',
      message: 'Login gagal. Mohon isi email anda'
    })

    response.code(400)
    return response
  } else if (!password) {
    const response = h.response({
      status: 'fail',
      message: 'Login gagal. Mohon isi password anda'
    })

    response.code(400)
    return response
  }
  try {
    const db = await createUnixSocketPool()
    const user = await db('users').where({ email }).first()
    console.log(user)
    if (!user) {
      const response = h.response({
        status: 'fail',
        message: 'Email tidak ditemukan atau email salah'
      })
      response.code(404)
      return response
    }
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      const response = h.response({
        status: 'fail',
        message: 'Password salah'
      })
      response.code(401)
      return response
    }

    const token = JWT.sign({ id: user.id }, 'NeverShareYourSecret')

    const response = h.response({
      status: 'success',
      message: 'You Login',
      tokenLogin: token,
      idUser: user.id
    })
    response.code(200)
    return response
  } catch (error) {
    console.error(error.message)
  }
}
const historyHandler = async (request, h) => {
  const { id, question, answer } = request.payload
  if (!question) {
    const response = h.response({
      status: 'fail',
      message: 'Masukkan pertanyaan anda'
    })

    response.code(400)
    return response
  } else if (!answer) {
    const response = h.response({
      status: 'fail',
      message: 'Server error, gagal mengirimkan data'
    })

    response.code(400)
    return response
  }
  try {
    const db = await createUnixSocketPool()
    const history = await db('history').insert({ id, question, answer })
    console.log(history)
  } catch (e) {
    const response = h.response({
      status: 'failed',
      message: e.message
    })
    response.code(500)
    return response
  }
  
  const response = h.response({
    status: 'success',
    message: 'History berhasil ditambahkan',
    userId: id
  })

  response.code(201)
  return response
} 
const getHistoryHandler = async (request, h) => {
  const { id } = request.params
  console.log('id dari req params', id)

  try {
    const data = await createUnixSocketPool()

    const userData = await data('history').where({ id }).select('question', 'answer')
    if (!userData || !(await userData).length) {
      const response = h.response({
        status: 'gagal',
        message: 'history pencarian pengguna tidak ditemukan'
      })
      response.code(404)
      return response
    }

    const response = h.response({
      status: 'success',
      message: 'Berhasil mengirim data dan foto',
      user: userData
    })
    response.code(200)
    return response
  } catch (e) {
    const response = h.response({
      status: 'failed',
      message: 'gagal'
    })
    response.code(501)
    return response
  }
}

module.exports = { registerHandler, editUserHandler, deleteUserHandler, editPictureHandler, deletePictureHandler, logoutHandler, getUserHandler, loginHandler, getAllUser, historyHandler, getHistoryHandler }
