import mongoose from 'mongoose'
import { DB_URL } from './config.js'

// Conection to mongodb
// returns a promise
export const connectDB = async () => {
  try{
    await mongoose.connect(DB_URL)
    console.log('>>> DATABASE CONNECTED')
  }catch(error){
    console.log(error)
  }
}

process.on('uncaughtException', error => {
  mongoose.connection.close()
})  