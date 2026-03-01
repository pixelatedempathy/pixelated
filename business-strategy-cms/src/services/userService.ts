import bcrypt from 'bcryptjs'
import { User, UserRole } from '@/types/user'
import { UserModel } from '@/models/User'
import { EmailService } from './emailService'

export class UserService {
  private static async hashPassword(password: string): Promise<string> {
    // Parse BCRYPT_ROUNDS with radix 10 and ensure we have a valid number.
    const rawRounds = process.env['BCRYPT_ROUNDS']
    const parsedRounds = parseInt(rawRounds ?? '12', 10)
    // Fallback to 12 if parsing fails or the value is less than 4 (bcrypt minimum).
    const saltRounds = Number.isNaN(parsedRounds) || parsedRounds < 4 ? 12 : parsedRounds
    return bcrypt.hash(password, saltRounds)
  }

  static async getAllUsers(): Promise<User[]> {
    return UserModel.findAll()
  }

  static async getUserById(id: string): Promise<User | null> {
    return UserModel.findById(id)
  }

  static async updateUserRole(
    id: string,
    role: UserRole,
  ): Promise<User | null> {
    return UserModel.update(id, { role })
  }

  static async deactivateUser(id: string): Promise<User | null> {
    return UserModel.update(id, { isActive: false })
  }

  static async activateUser(id: string): Promise<User | null> {
    return UserModel.update(id, { isActive: true })
  }

  static async inviteUser(
    email: string,
    role: UserRole,
  ): Promise<{ user: User; temporaryPassword: string }> {
    const temporaryPassword = Math.random().toString(36).substring(2, 15)
    const username = email.split('@')[0]

    const hashedPassword = await this.hashPassword(temporaryPassword)

    const user = await UserModel.create({
      email,
      username,
      firstName: '',
      lastName: '',
      password: hashedPassword,
      role,
      isActive: true,
      isEmailVerified: false,
    })

    await EmailService.sendInvitationEmail(email, temporaryPassword, role)
    return { user, temporaryPassword }
  }

  static async completeOnboarding(
    userId: string,
    firstName: string,
    lastName: string,
    newPassword: string,
  ): Promise<User | null> {
    const hashedPassword = await this.hashPassword(newPassword)

    const user = await UserModel.update(userId, {
      firstName,
      lastName,
      password: hashedPassword,
      isEmailVerified: true,
    })

    if (user) {
      await EmailService.sendWelcomeEmail(user.email, user.username)
    }

    return user
  }
}