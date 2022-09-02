import express from 'express';
import {
    createHotel,
    updateHotel,
    deleteHotel,
    getHotel,
    getHotels,
    countByCity,
} from '../controllers/hotel.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

router.post('/', verifyAdmin, createHotel);
router.put('/:id', verifyAdmin, updateHotel);
router.delete('/find/:id', verifyAdmin, deleteHotel);
router.get('/:id', getHotel);

router.get('/', getHotels);
router.get('/countByCity', countByCity);
router.get('/countByType', getHotels);

export default router;
