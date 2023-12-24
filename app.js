import express from 'express';
import bodyParser from 'body-parser';
import sequelize from './util/database.js';
import homeRoutes from './routes/index.js';
import multer from 'multer';
import path from 'path';

const app = express();
app.use(express.json());
// uploading image
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Data().toISOString() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.json());
// Register Multer image
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
); // to store file in image


/** Resolve the CROS problem  */
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});


app.use("/api/v1", homeRoutes);



app.use((err, req, res, next) => {
  console.log(err);
  const status = err.statusCode || 500;
  const message = err.message;
  const data = err.data;
  res.status(status).json({ message: message, data: data });
});


sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server listening on port 3000');
  });
});
