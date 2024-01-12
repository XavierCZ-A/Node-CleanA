import mongoose from "mongoose";


interface Options {
    mongoUrl: string,
    dbName: string
}

export const connectDB = async(options: Options) => {
    const {mongoUrl, dbName} = options;

    try {
        await mongoose.connect(mongoUrl, {
            dbName: dbName,
        });
        
        console.log('Database connected')
        return true
        
    } catch (error) {
        throw new Error("Error connecting to database");
        
    }
}