// locationController.test.js
import request from "supertest";
import app from "../app";
import Location from "../models/Location";

jest.mock("../models/Location", () => ({
    create: jest.fn(),
    findAll: jest.fn(),
}));

describe("Location Controller Tests", () => {
    it('should create a new location entry', async () => {
        const mockLocationData = {
            title: 'Test Location',
            latitude: '123',
            longitude: '456',
            imagePath: 'path/to/image.jpg',
        };

        Location.create.mockResolvedValue(mockLocationData);

        const response = await request(app)
            .post('/api/v1/location/create')
            .send(mockLocationData); 

        
        expect(response.status).toBe(201);

        expect(response.body).toEqual({
            message: 'Location added successfully',
            location: mockLocationData,
        });
    });
    it("should fetch all location entries", async () => {
        const mockLocations = [
            {
                id: 1,
                title: "Location 1",
                latitude: "123",
                longitude: "456",
                imagePath: "path1",
            },
            {
                id: 2,
                title: "Location 2",
                latitude: "789",
                longitude: "012",
                imagePath: "path2",
            },
        ];

        Location.findAll.mockResolvedValue(mockLocations);

        const response = await request(app).get("/api/v1/location/all");

        expect(response.status).toBe(200);

        expect(response.body).toEqual(mockLocations);
    });
    it('should handle file uploads', async () => {
        
        const mockFileData = {
        
          path: '/path/to/uploaded/file.jpg', // Example path to the uploaded file
        };
    
        
        const response = await request(app)
          .post('/api/v1/upload')
          .attach('file', '/path/to/local/file.jpg') 
    
        
        expect(response.status).toBe(200);
    
        
        expect(response.body).toEqual({
          message: 'File uploaded successfully',
          fileUrl: mockFileData.path, 
        });
      });
});
