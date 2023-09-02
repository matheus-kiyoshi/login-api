import mongoose from 'mongoose'

export async function connect() {
  try {
    await mongoose.connect(
      'mongodb+srv://matheuskf12:p5JFqBwJ5jRXKESA@cluster0.yq0he2b.mongodb.net/users'
    )
  } catch (error) {
    console.log(error)
  }
}
