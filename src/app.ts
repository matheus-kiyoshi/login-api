import express, { Application } from 'express'
import { errorMiddleware } from './middlewares/error.middlewares'
import { UserRoutes } from './routes/user.routes'
import { connect } from './infra/db'
import cors from 'cors'

class App {
  public app: Application
  private userRoutes = new UserRoutes()
  constructor() {
    this.app = express()
    this.middlewaresInitialize()
    this.initializeRoutes()
    this.interceptionError()
    connect()
  }

  private initializeRoutes() {
    this.app.use('/users', this.userRoutes.router)
  }

  private interceptionError() {
    this.app.use(errorMiddleware)
  }

  private middlewaresInitialize() {
    this.app.use(express.json())
    this.app.use(cors())
    this.app.use(express.urlencoded({ extended: true }))
  }

  listen() {
    this.app.listen(process.env.PORT || 3333, () => {
      console.log('Server running on port 3333')
    })
  }
}

export { App }
