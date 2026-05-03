import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

const mongoURI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;

export const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('MongoDB Conectado exitosamente');
    } catch (error) {
        console.error('Error de conexión:', error.message);
        process.exit(1);
    }
};