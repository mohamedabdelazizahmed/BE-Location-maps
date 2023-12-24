import express from 'express';
import { upload, create, list } from '../controllers/LocationController.js';
import LocationRequest from '../requests/LocationRequest.js';
const router = express.Router();

router.post('upload', upload);
router.post('location/create',LocationRequest, create);
router.get('location/all', list);

export default router;
