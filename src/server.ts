import dotenv from 'dotenv'; //dotenv kutubxonasini import qilish
dotenv.config(); //env fayldagi o'zgaruvchilarni yuklash
import mongoose from "mongoose";
import app from "./app";

 mongoose.connect(process.env.MONGO_URL as string, {})
 .then((data) => {
    console.log("MonggoDB connection succeed");
    const  PORT = process.env.PORT ?? 3003
    app.listen(PORT, function() {
        console.info(`The server is running successfully on port: ${PORT}`);
        console.info(`Admin project on http://localhost:${PORT}/admin \n`);
    });
 })
 .catch((err) => console.log("Error with connecttion of MongoDB", err));