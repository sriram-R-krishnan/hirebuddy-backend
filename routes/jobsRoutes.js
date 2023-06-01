const express = require('express')
const { createJobs, getAllJobs, getMyCreatedJobs, applyToJob, getSingleJob } = require('../controllers/jobsController')
const router = express.Router()

const authenticationMiddleware = require('../middlewares/auth')

router.post( '/createjobs' ,authenticationMiddleware, createJobs )
router.get( '/mycreatedjobs' ,authenticationMiddleware, getMyCreatedJobs )
router.get( '/alljobs/:id' ,authenticationMiddleware, getSingleJob )
router.post( '/alljobs/:id' ,authenticationMiddleware, applyToJob )
router.get('/alljobs' , getAllJobs)



module.exports = router 