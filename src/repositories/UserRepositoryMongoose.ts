import mongoose from 'mongoose'
import { UserRepository } from './UserRepository'
import User from '../entities/User'

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: new mongoose.Types.ObjectId().toString()
  },
  firstName: String,
  lastName: String,
  email: String,
  password: String
})

const UserModel = mongoose.model('User', userSchema)

class UserRepositoryMongoose implements UserRepository {
  // TODO: change the any type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async create(user: User): Promise<any> {
    const userModel = new UserModel(user)

    await userModel.save()

    return userModel
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const userModel = await UserModel.findOne({ email: email }).exec()

    return userModel ? userModel.toObject() : undefined
  }
}

export { UserRepositoryMongoose }
