import mongoose from 'mongoose';

const dbConnection = async() => {
  try {
      await mongoose.connect( process.env.DB_CONNECTION!);
      console.log('DB Online');
  } catch (error) {
      console.log(error);
      throw new Error('An error has occured in the connection with DB');
  }
}

export default dbConnection