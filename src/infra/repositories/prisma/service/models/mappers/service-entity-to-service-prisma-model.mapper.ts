import { Service } from 'src/domain/entities/service.entity';
import { ServicePrismaModel } from '../service.prisma.model';
import { Prisma } from '@prisma/client';

export class ServiceEntityToServicePrismaModelMapper {
  public static map(service: Service): ServicePrismaModel {
    const model: ServicePrismaModel = {
      id: service.getId(),
      name: service.getName(),
      description: service.getDescription() ?? null,
      price: new Prisma.Decimal(service.getPrice()),
      durationMin: service.getDurationMin(),
      createdAt: service.getCreatedAt(),
      updatedAt: service.getUpdatedAt(),
      isActive: service.getIsActive(),
      barberShopId: service.getBarberShopId(),
    };

    return model;
  }
}
