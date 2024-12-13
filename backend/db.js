//Conexión a base de datos - MONGODB

import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://U22211208:Luciano2510-@cluster0.rjq89.mongodb.net/Javascript?retryWrites=true&w=majority&appName=Cluster0")
        console.log('Conexión exitosa');
    } catch (error) {
        console.log(error);
    }
}