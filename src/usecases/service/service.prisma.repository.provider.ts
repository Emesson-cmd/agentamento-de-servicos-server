import { ServiceGateway } from 'src/domain/repositories/service.gateway';
import { ServicePrismaRepository } from 'src/infra/repositories/prisma/service/service.prisma.repository';

export const servicePrismaRepositoryProvider = {
  provide: ServiceGateway,
  useClass: ServicePrismaRepository,
};
