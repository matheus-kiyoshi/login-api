import User from '../entities/User'

interface UserWithID extends User {
  _id: string
}

interface UserRepository {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  create(user: User): Promise<any>
  updatePassword(user: UserWithID): Promise<UserWithID | undefined>
  findByEmail(email: string): Promise<UserWithID | undefined>
  findById(id: string): Promise<UserWithID | undefined>
}

export { UserRepository }
