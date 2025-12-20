import { User } from 'src/domain/entities/user.entity';
import { UserPrismaModel } from '../user.prisma.model';

export class UserPrismaModelToUserEntityMapper {
  public static map(user: UserPrismaModel): User {
    const anUser: User = User.with(user);

    return anUser;
  }
}
