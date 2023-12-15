
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
  const {user: {userId}, params: {id: jobId}} = req;
  const job = await Job.find({
    createdBy: userId,
    _id: jobId
  });

  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }

  res.status(StatusCodes.OK).json({ job });
}
const createJob = async (req, res) => {
  try {
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({ job });
  } catch (err) {
    next(err);
  }

}

const updateJob = async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId }
  } = req;

  if (company === '' || position === '') {
    throw new BadRequestError('Company or Position fields cannot be empty');
  }

  const job = await Job.findByIdAndUpdate({
    _id: jobId,
    createdBy: userId
  }, req.body, { new: true, runValidators: true });

  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }

  res.status(StatusCodes.OK).json({ job });
}

const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId }
  } = req;

  const job = await Job.findByIdAndRemove({
    _id: jobId,
    createdBy: userId
  });

  if (!job) {
    next(new NotFoundError(`No job with id ${jobId}`));
  }

  res.status(StatusCodes.OK).send();
}

export default {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob
}
