import { NextFunction, Request, Response } from 'express'
import { UserUseCases } from '../useCases/UserUseCases'

class UserController {
  constructor(private userUseCase: UserUseCases) {}

  async create(req: Request, res: Response, next: NextFunction) {
    const { firstName, lastName, email, password } = req.body

    try {
      await this.userUseCase.create({
        firstName,
        lastName,
        email,
        password
      })
      return res.status(201).json({ message: 'User created' })
    } catch (error) {
      next(error)
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body
    try {
      const user = await this.userUseCase.login(email, password)
      return res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params

    try {
      const user = await this.userUseCase.findById(id)
      return res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }

  async updatePassword(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    const { email, currentPassword, newPassword } = req.body

    try {
      const user = await this.userUseCase.updatePassword(
        id,
        email,
        currentPassword,
        newPassword
      )
      return res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }

  async findByEmail(req: Request, res: Response, next: NextFunction) {
    const { email } = req.params

    try {
      const user = await this.userUseCase.findByEmail(email)
      console.log(user)
      return res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }
}

export { UserController }
