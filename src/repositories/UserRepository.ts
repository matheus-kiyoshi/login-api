import User from '../entities/User'

interface UserWithID extends User {
  _id: string
}

interface UserRepository {
  create(user: User): Promise<unknown>
  delete(id: string): Promise<unknown>
  updatePassword(user: UserWithID): Promise<UserWithID | undefined>
  findByEmail(email: string): Promise<UserWithID | undefined>
  findById(id: string): Promise<UserWithID | undefined>
}

export { UserRepository }
