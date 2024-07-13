
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Dish = require('./models/dishModel');

dotenv.config();

const dishes = [
  {
    "dishId": "1",
    "dishName": "Jeera Rice",
    "imageUrl": "https://nosh-assignment.s3.ap-south-1.amazonaws.com/jeera-rice.jpg",
    "isPublished": true
  },
  {
    "dishId": "2",
    "dishName": "Paneer Tikka",
    "imageUrl": "https://nosh-assignment.s3.ap-south-1.amazonaws.com/paneer-tikka.jpg",
    "isPublished": true
  },
  {
    "dishId": "3",
    "dishName": "Rabdi",
    "imageUrl": "https://nosh-assignment.s3.ap-south-1.amazonaws.com/rabdi.jpg",
    "isPublished": true
  },
  {
    "dishId": "4",
    "dishName": "Chicken Biryani",
    "imageUrl": "https://nosh-assignment.s3.ap-south-1.amazonaws.com/chicken-biryani.jpg",
    "isPublished": true
  },
  {
    "dishId": "5",
    "dishName": "Alfredo Pasta",
    "imageUrl": "https://nosh-assignment.s3.ap-south-1.amazonaws.com/alfredo-pasta.jpg",
    "isPublished": true
  }
];


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed', error);
    process.exit(1);
  }
};

const importData = async () => {
  await connectDB();
  try {
    await Dish.deleteMany();
    await Dish.insertMany(dishes);
    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
