const {
  editUserHandler,
  editPictureHandler,
  getUserHandler,
  registerHandler,
  loginHandler,
  logoutHandler,
  deleteUserHandler,
  deletePictureHandler,
  getAllUser,
  getHistoryHandler,
  historyHandler
} = require('./handler')

const Joi = require('joi')

const routes = [

  {
    method: 'GET',
    path: '/users/{id}',
    handler: getUserHandler,
    config: {
      auth: 'jwt_mbkm'
    }
  },
  {
    method: 'POST',
    path: '/login',
    handler: loginHandler,
    config: {
      auth: false,
      validate: {
        payload: Joi.object({
          email: Joi.string().min(1).max(29).required(),
          password: Joi.string().min(1).required()
        })
      }
    }
  },
  {
    method: 'POST',
    path: '/register',
    handler: registerHandler,
    config: {
      auth: false,
      validate: {
        payload: Joi.object({
          nama: Joi.string().min(1),
          email: Joi.string().email().required().required(),
          password: Joi.string().min(1).required()
        })
      }
    }
  },
  {
    method: 'GET',
    path: '/users',
    handler: getAllUser,
    config: {
      auth: false
    }
  },
  {
    method: 'PUT',
    path: '/users/{id}',
    handler: editUserHandler,
    config: {
      auth: 'jwt_mbkm',
      validate: {
        payload: Joi.object({
          password: Joi.string().min(1).required()
        })
      }
    }
  },
  {
    method: 'PUT',
    path: '/users/picture/{id}',
    handler: editPictureHandler,
    config: {
      auth: 'jwt_mbkm'
    }
  },
  {
    method: 'POST',
    path: '/logout',
    handler: logoutHandler,
    config: {
      auth: 'jwt_mbkm'
    }
  },
  {
    method: 'DELETE',
    path: '/users/{id}',
    handler: deleteUserHandler,
    config: {
      auth: 'jwt_mbkm'
    }
  },
  {
    method: 'DELETE',
    path: '/user/picture/{id}',
    handler: deletePictureHandler,
    config: {
      auth: 'jwt_mbkm'
    }
  },
  {
    method: 'POST',
    path: '/history',
    handler: historyHandler,
    config: {
      auth: 'jwt_mbkm'
    }
  },
  {
    method: 'GET',
    path: '/history/{id}',
    handler: getHistoryHandler,
    config: {
      auth: 'jwt_mbkm'
    }
  },
]
module.exports = routes
