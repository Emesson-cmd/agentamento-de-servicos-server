import { Service } from 'src/domain/entities/service.entity';
import { ServicePrismaModel } from '../service.prisma.model';

export class ServicePrismaModelToServiceEntityMapper {
  public static map(service: ServicePrismaModel): Service {
    const anService: Service = Service.with({
      id: service.id,
      name: service.name,
      description: service?.description ?? undefined,
      price: service.price.toNumber(),
      durationMin: service.durationMin,
      createdAt: service.createdAt,
      updatedAt: service.updatedAt,
      isActive: service.isActive,
      barberShopId: service.barberShopId,
    });

    return anService;
  }
}
