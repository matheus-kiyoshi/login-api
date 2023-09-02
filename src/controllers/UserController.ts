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
        password,
      })
      return res.status(201).json({ message: 'User created' })
    } catch (error) {
      next(error)
    }
  }
}

export { UserController }
