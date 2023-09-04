import User from '../entities/User'

type UserWithID = {
  _id: string
  firstName: string
  lastName: string
  email: string
  password: string
}

interface UserRepository {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  create(user: User): Promise<any>
  findByEmail(email: string): Promise<UserWithID | undefined>
  findById(id: string): Promise<UserWithID | undefined>
}

export { UserRepository }
