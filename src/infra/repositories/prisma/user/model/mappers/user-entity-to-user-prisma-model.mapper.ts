import { User } from 'src/domain/entities/user.entity';
import { UserPrismaModel } from '../user.prisma.model';

export class UserEntityToUserPrismaModelMapper {
  public static map(user: User): UserPrismaModel {
    const model: UserPrismaModel = {
      id: user.getId(),
      email: user.getEmail(),
      password: user.getPassword(),
      resetToken: user.getResetToken() ?? null,
      resetTokenExpiresAt: user.getResetTokenExpiresAt() ?? null,
      createdAt: user.getCreatedAt(),
      updatedAt: user.getUpdatedAt(),
    };

    return model;
  }
}
