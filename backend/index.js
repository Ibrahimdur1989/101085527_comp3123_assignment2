// import required modules
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');

// import local modules
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const empRoutes = require('./routes/empRoutes');

dotenv.config();

// apply middlewarea
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// connect to mongodb
connectDB();

app.get('/', (req,res) => {
    res.send('COMP3123 Assignment 1 API Running....');
});

// use rout modules 
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', empRoutes);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));