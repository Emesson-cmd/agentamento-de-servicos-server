import { UserGateway } from 'src/domain/repositories/user.gateway';
import { UserPrismaRepository } from 'src/infra/repositories/prisma/user/user.prisma.repository';

export const userPrismaRepositoryProvider = {
  provide: UserGateway,
  useClass: UserPrismaRepository,
};
