import { HttpException } from '../interfaces/HttpException'
import { UserRepository } from '../repositories/UserRepository'
import User from '../entities/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

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

  async login(email: string, password: string) {
    if (!email) {
      throw new HttpException('Email is required', 400)
    }
    if (!password) {
      throw new HttpException('Password is required', 400)
    }

    const user = await this.userRepository.findByEmail(email)
    if (!user) {
      throw new HttpException('User not found', 404)
    }

    // verify password
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      throw new HttpException('Invalid password', 422)
    }

    try {
      const secret =
        process.env.SECRET ||
        'DA312D3124WAOIB521UDVPONA52152DGPWAB521DYNVWAD412WO44123217659AVBH'
      const token = jwt.sign(
        {
          id: user._id
        },
        secret,
        {
          expiresIn: '1d'
        }
      )

      return { msg: 'Login successful', token: token }
    } catch (error) {
      throw new HttpException('Internal server error', 500)
    }
  }

  async findById(id: string) {
    if (!id) {
      throw new HttpException('Id is required', 400)
    }

    const result = await this.userRepository.findById(id)
    if (!result) {
      throw new HttpException('User not found', 404)
    }

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
