import Location from '../models/Location.js';
import { validationResult } from 'express-validator';

export const upload = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // to exit file execution
        const error = new Error("Validation Failed, enter data correct ");
        error.statusCode = 422;
        throw error;
    }
    // checking file in request to validation
    if (!req.file) {
        const error = new Error("No Image Provided .");
        err.statusCode = 422;
        throw err;
    }
    return res.status(200).json({ message: 'File uploaded successfully', fileUrl: req.file.path });

}

export const create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Validation Failed, enter data correct ");
        error.statusCode = 422;
        throw error;
    }
    if (!req.file) {
        const error = new Error("No Image Provided .");
        err.statusCode = 422;
        throw err;
    }
    const { title, latitude, longitude } = req.body;
    try {
        const newLocation = await Location.create({
            title: title,
            latitude: latitude,
            longitude: longitude,
            imagePath: imagePath,
        });
        console.log('New Location created:', newLocation);
        return res.status(201).json({ message: 'Location added successfully', location: newLocation });
    } catch (error) {
        console.log(err);
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}

export const list = async (req, res) => {
    try {
        const allLocations = await Location.findAll();    
        res.status(200).json(allLocations);
      } catch (error) {
        // Handle errors
        console.error('Error fetching locations:', error);
        res.status(500).json({ error: 'Failed to fetch locations' });
      }
    
}