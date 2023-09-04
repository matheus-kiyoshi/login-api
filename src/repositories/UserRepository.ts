import User from '../entities/User'

interface UserRepository {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  create(user: User): Promise<any>
  findByEmail(email: string): Promise<User | undefined>
}

export { UserRepository }
