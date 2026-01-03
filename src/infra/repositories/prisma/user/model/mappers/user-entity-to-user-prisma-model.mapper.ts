import { User } from 'src/domain/entities/user.entity';
import { UserPrismaModel } from '../user.prisma.model';

export class UserEntityToUserPrismaModelMapper {
  public static map(user: User): UserPrismaModel {
    const model: UserPrismaModel = {
      id: user.getId(),
      email: user.getEmail(),
      password: user.getPassword(),
      createdAt: user.getCreatedAt(),
      updatedAt: user.getUpdatedAt(),
      name: user.getName(),
      phone: user.getPhone(),
      role: user.getRole(),
      isActive: user.getIsActive(),
      resetToken: user.getResetToken() ?? null,
      resetTokenExpiresAt: user.getResetTokenExpiresAt() ?? null,
    };

    return model;
  }
}
