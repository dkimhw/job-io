
import Job from '../models/Job.js';
import StatusCodes from 'http-status-codes';
import BadRequestError from '../errors/bad-request.js';
import NotFoundError from '../errors/not-found.js';

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({
    createdBy: req.user.userId
  }).sort('createdAt');

  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
}

const getJob = async (req, res) => {
  res.send('Get a single job');
}
const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
}

const updateJob = async (req, res) => {
  res.send('Updated a job');
}

const deleteJob = async (req, res) => {
  res.send('Deleted a job');
}

export default {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob
}
