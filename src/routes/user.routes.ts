import { Router } from 'express'
import { UserController } from '../controllers/UserController'
import { UserRepositoryMongoose } from '../repositories/UserRepositoryMongoose'
import { UserUseCases } from '../useCases/UserUseCases'
import checkToken from '../middlewares/checkToken.middleware'

class UserRoutes {
  public router: Router
  private userController: UserController
  constructor() {
    this.router = Router()
    const userRepository = new UserRepositoryMongoose()
    const userUseCases = new UserUseCases(userRepository)
    this.userController = new UserController(userUseCases)
    this.initRoutes()
  }

  initRoutes() {
    // default route = http://localhost:3333/auth
    this.router.post(
      '/register',
      this.userController.create.bind(this.userController)
    )
    this.router.post(
      '/login',
      this.userController.login.bind(this.userController)
    )
    this.router.get(
      '/:id',
      checkToken,
      this.userController.findById.bind(this.userController)
    )
    this.router.get(
      '/:email',
      this.userController.findByEmail.bind(this.userController)
    )
  }
}

export { UserRoutes }
