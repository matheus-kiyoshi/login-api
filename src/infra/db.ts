import mongoose from 'mongoose'
import 'dotenv/config'

export async function connect() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.yq0he2b.mongodb.net/users`
    )
  } catch (error) {
    console.log(error)
  }
}
