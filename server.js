require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');

const connectDB = require('./config/dbConn');
const corsOptions = require('./config/corsOptions');
const { swaggerUi, swaggerSpec } = require('./swagger');

const authRoute = require('./routes/authRoutes');
const userRoute = require('./routes/userRoutes');
const commentRoute = require('./routes/commentRoutes');
const postRoute = require('./routes/postRoutes');
const categoryRoute = require('./routes/categoryRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, '/uploads')));

// Serve Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/auth', authRoute);
app.use('/users', userRoute);
app.use('/posts', postRoute);
app.use('/comments', commentRoute);
app.use('/categories', categoryRoute);

mongoose.connection.once('open', () => {
  console.log('connected to the mongodb');

  app.listen(PORT, () => {
    console.log('server running on port ', PORT);
  });
});

mongoose.connection.on('error', err => {
  console.log(err);
});
