import express from 'express';
import jobsController from '../controllers/jobs.js';

const router = express.Router();

router.post('/', jobsController.createJob);
router.get('/', jobsController.getAllJobs);
router.get('/:id', jobsController.getJob);
router.delete('/:id', jobsController.deleteJob);
router.patch('/:id', jobsController.updateJob);

export default router;
