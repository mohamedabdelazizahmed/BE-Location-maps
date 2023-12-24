import { body } from 'express-validator';

export default [
    body('latitude').notEmpty().withMessage('Latitude is required'),
    body('longitude').notEmpty().withMessage('Longitude is required'),
    body('imagePath').notEmpty().withMessage('Image Path is required'),
    body('title').notEmpty().withMessage('Title is required').trim(),
];