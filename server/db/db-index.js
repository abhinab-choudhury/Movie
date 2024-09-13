import mongoose from 'mongoose';

const CONNECTION_STRING = `${process.env.MONGODB_CONNECTION_STRING}/${process.env.DATABASE_NAME}`;
export const connect_db = async () => {
  try {
    const connection_instance = await mongoose.connect(CONNECTION_STRING);
    console.log(
      'Connected to MongoBD: PORT:',
      connection_instance.connection.port
    );
  } catch (error) {
    console.log('MongoDB Atlas - Connection Failed\n', error);
    process.exit(1);
  }
};
