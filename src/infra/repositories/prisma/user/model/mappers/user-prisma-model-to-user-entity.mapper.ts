import { User } from 'src/domain/entities/user.entity';
import { UserPrismaModel } from '../user.prisma.model';

export class UserPrismaModelToUserEntityMapper {
  public static map(user: UserPrismaModel): User {
    const anUser: User = User.with({
      id: user.id,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      name: user.name,
      phone: user.phone,
      role: user.role,
      resetToken: user.resetToken ? user.resetToken : undefined,
      resetTokenExpiresAt: user.resetTokenExpiresAt
        ? user.resetTokenExpiresAt
        : undefined,
    });

    return anUser;
  }
}
