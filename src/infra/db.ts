import mongoose from 'mongoose'
import 'dotenv/config'

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECT_URI || '')
  } catch (error) {
    console.log(error)
  }
}
