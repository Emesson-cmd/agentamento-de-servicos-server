import { ServiceGateway } from 'src/domain/repositories/service.gateway';
import { prismaClient } from '../client.prisma';
import { Service } from 'src/domain/entities/service.entity';
import { ServiceEntityToServicePrismaModelMapper } from './models/mappers/service-entity-to-service-prisma-model.mapper';
import { ServicePrismaModelToServiceEntityMapper } from './models/mappers/service-prisma-model-to-service-entity.mapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ServicePrismaRepository extends ServiceGateway {
  public constructor() {
    super();
  }

  async create(service: Service): Promise<void> {
    const model = ServiceEntityToServicePrismaModelMapper.map(service);

    await prismaClient.service.create({
      data: model,
    });
  }

  async update(service: Service): Promise<void> {
    const model = ServiceEntityToServicePrismaModelMapper.map(service);

    await prismaClient.service.update({
      where: { id: service.getId() },
      data: model,
    });
  }

  async delete(id: string): Promise<void> {
    await prismaClient.service.delete({ where: { id } });
  }

  async findById(id: string): Promise<Service | null> {
    const model = await prismaClient.service.findUnique({ where: { id } });

    if (!model) return null;

    const service = ServicePrismaModelToServiceEntityMapper.map(model);

    return service;
  }

  async findByName(name: string): Promise<Service | null> {
    const model = await prismaClient.service.findFirst({ where: { name } });

    if (!model) return null;

    const service = ServicePrismaModelToServiceEntityMapper.map(model);

    return service;
  }

  async findAll(): Promise<Service[]> {
    const models = await prismaClient.service.findMany({});

    const services = models.map((model) =>
      ServicePrismaModelToServiceEntityMapper.map(model),
    );

    return services;
  }
}
