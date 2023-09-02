import express, { Application } from 'express'
import { errorMiddleware } from './middlewares/error.middlewares'
import { UserRoutes } from './routes/user.routes'

class App {
  public app: Application
  private userRoutes = new UserRoutes()
  constructor() {
    this.app = express()
    this.middlewaresInitialize()
    this.initializeRoutes()
    this.interceptionError()
  }

  private initializeRoutes() {
    this.app.use('/users', this.userRoutes.router)
  }

  private interceptionError() {
    this.app.use(errorMiddleware)
  }

  private middlewaresInitialize() {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
  }

  listen() {
    this.app.listen(3333, () => {
      console.log('Server running on port 3333')
    })
  }
}

export { App }
