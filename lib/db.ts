import { error } from "console";
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI! //aisa ho sakta hai ki .env mai khali ho ya humne type bhi  declare nahi kiya kii

if(!MONGODB_URI){
    throw new Error("Please define mongo_uri in env variables")
}

let cached = global.mongoose //cache rakhega connection ko

if(!cached){
    cached = global.mongoose = {
        conn:null,
        promise:null
    }
}

export async function connectToDatabase() {
    if(cached.conn){
        return cached.conn
    }

    if(!cached.promise){
        const opts = { //plans like free and paid
            bufferCommands:true,
            maxPoolSize:10
        }
        
        mongoose
        .connect(MONGODB_URI,opts)
        .then(()=>mongoose.connection)
    }

    try{
        cached.conn = await cached.promise
    }catch(error){
        cached.promise = null
        throw error;
    }
    return cached.conn
    
}

// Because there is an EDGE connection in next.js we have to do and write more code here
// Also we have 