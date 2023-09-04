import { HttpException } from '../interfaces/HttpException'
import { UserRepository } from '../repositories/UserRepository'
import User from '../entities/User'
import bcrypt from 'bcrypt'

class UserUseCases {
  constructor(private userRepository: UserRepository) {}

  async create(user: User) {
    if (!user.firstName) {
      throw new HttpException('First name is required', 400)
    }
    if (!user.lastName) {
      throw new HttpException('Last name is required', 400)
    }
    if (!user.email) {
      throw new HttpException('Email is required', 400)
    }
    if (!user.password) {
      throw new HttpException('Password is required', 400)
    }
    if (user.password.length < 8) {
      throw new HttpException('Password must be at least 8 characters', 400)
    }

    // verify if user already exists
    const userExists = await this.userRepository.findByEmail(user.email)
    if (userExists) {
      throw new HttpException('User already exists', 409)
    }

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)

    const result = await this.userRepository.create(user)
    return result
  }

  async findByEmail(email: string) {
    if (!email) {
      throw new HttpException('Email is required', 400)
    }

    const result = await this.userRepository.findByEmail(email)
    return result
  }
}

export { UserUseCases }
