const express = require('express')
const { signUp, login, findSingleUser } = require('../controllers/userController')
const authenticationMiddleware = require('../middlewares/auth')
const router = express.Router()


router.route('/signup').post( signUp )
router.route('/login').post( login)


module.exports = router 