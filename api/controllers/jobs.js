
const getAllJobs = async (req, res) => {
  res.send('Get all jobs');
}

const getJob = async (req, res) => {
  res.send('Get a single job');
}
const createJob = async (req, res) => {
  res.send('Created a job');
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
