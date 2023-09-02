import { Router } from 'express'

class UserRoutes {
  public router: Router
  constructor() {
    this.router = Router()
    this.initRoutes()
  }

  initRoutes() {
    // default route = http://localhost:3333/users
    this.router.get('/', (req, res) => {
      res.send('Users')
    })
  }
}

export { UserRoutes }
