import { User } from 'src/domain/entities/user.entity';
import { UserPrismaModel } from '../user.prisma.model';

export class UserPrismaModelToUserEntityMapper {
  public static map(user: UserPrismaModel): User {
    const anUser: User = User.with({
      id: user.id,
      email: user.email,
      password: user.password,
      resetToken: user.resetToken ? (user.resetToken as string) : undefined,
      resetTokenExpiresAt: user.resetTokenExpiresAt
        ? (user.resetTokenExpiresAt as Date)
        : undefined,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });

    return anUser;
  }
}
