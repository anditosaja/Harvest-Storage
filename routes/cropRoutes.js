import express from 'express';
import {
  getAllCrops,
  getCropById,
  createCrop,
  updateCrop,
  deleteCrop,
} from '../controllers/cropController.js';

const router = express.Router();

router.route('/').get(getAllCrops).post(createCrop);
router.route('/:id').get(getCropById).put(updateCrop).delete(deleteCrop);

export default router;