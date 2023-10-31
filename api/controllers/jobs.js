
import Job from '../models/Job.js';
import StatusCodes from 'http-status-codes';
import BadRequestError from '../errors/bad-request.js';
import NotFoundError from '../errors/not-found.js';

const getAllJobs = async (req, res) => {
  res.send('Get all jobs');
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
