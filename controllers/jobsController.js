const jobs = require('../modals/Jobs')
const asyncHandler = require("express-async-handler");
const Users = require('../modals/users');


const createJobs = asyncHandler(async (req, res) => {
    try {
        const { title, description , salary, vacancy } = req.body
        const createdBy = req.user._id;

        console.log(req.user.role);

        if (req.user.role === 'Corporate' || req.user.role === 'corporate') {
            const savedJob = await jobs.create({
                title, description,salary, vacancy, createdBy
            });
            res.status(201).json({
                message: 'Job created successfully',
                job: savedJob
            });
        }

        else {
            res.json({
                message: "not an Corporate role to add job"
            })
        }
    }
    catch (error) {
        console.log(error);
    }

})


const getAllJobs = asyncHandler(async (req, res) => {
    const allJobs = await jobs.find({}).populate("createdBy" , {name: 1})
    res.json(allJobs)
})

const getSingleJob = asyncHandler( async (req,res)=>{
    const { id : jobID } = req.params
    const singleJob = await jobs.findById(jobID)
    res.json({singleJob})
})

const getMyCreatedJobs = asyncHandler(async (req, res) => {
    try {
        const MyCreatedJobs = await jobs.find({ createdBy: req.user._id })
        res.json(MyCreatedJobs)
    }
    catch (error) {
        console.log(error);
    }

})

const applyToJob = asyncHandler(async (req, res) => {
    try {
      const { id: jobID } = req.params;
  
      const alreadyApplied = await jobs
        .find({ _id: jobID, appliedBy: req.user._id })
        .countDocuments();
  
      console.log(alreadyApplied);
  
      if (alreadyApplied > 0) {
        res.json({ error: "You are already applied for this job" });
      } else {
        const applyJob = await jobs.findOneAndUpdate(
          { _id: jobID },
          { $push: { appliedBy: req.user._id } },
          { new: true }
        );
        res.json(applyJob);
      }
    } catch (error) {
      console.log(error);
    }
  });

module.exports = { createJobs, getAllJobs, getMyCreatedJobs ,applyToJob , getSingleJob }