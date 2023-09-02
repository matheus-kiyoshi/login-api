import { HttpException } from '../interfaces/HttpException'
import { UserRepository } from '../repositories/UserRepository'
import User from '../entities/User'

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

    // verify if user already exists

    const result = await this.userRepository.create(user)
    return result
  }
}

export { UserUseCases }
