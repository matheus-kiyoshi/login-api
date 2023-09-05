import mongoose from 'mongoose'
import { UserRepository } from './UserRepository'
import User from '../entities/User'

type UserWithID = {
  _id: string
  firstName: string
  lastName: string
  email: string
  password: string
}

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

  async updatePassword(user: UserWithID): Promise<UserWithID | undefined> {
    const userModel = await UserModel.findByIdAndUpdate(
      user._id,
      { password: user.password },
      { new: true }
    )

    return userModel ? userModel.toObject() : undefined
  }

  async findById(id: string): Promise<UserWithID | undefined> {
    const userModel = await UserModel.findById(id).select('-password').exec()

    return userModel ? userModel.toObject() : undefined
  }

  async findByEmail(email: string): Promise<UserWithID | undefined> {
    const userModel = await UserModel.findOne({ email: email }).exec()

    return userModel ? userModel.toObject() : undefined
  }
}

export { UserRepositoryMongoose }
