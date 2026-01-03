import { UserGateway } from 'src/domain/repositories/user.gateway';
import { prismaClient } from '../client.prisma';
import { UserPrismaModelToUserEntityMapper } from './model/mappers/user-prisma-model-to-user-entity.mapper';
import { User } from 'src/domain/entities/user.entity';
import { UserEntityToUserPrismaModelMapper } from './model/mappers/user-entity-to-user-prisma-model.mapper';
import { Injectable } from '@nestjs/common';
import { UserPrismaModel } from './model/user.prisma.model';

@Injectable()
export class UserPrismaRepository extends UserGateway {
  public constructor() {
    super();
  }

  async findByEmail(email: string): Promise<User | null> {
    const model = await prismaClient.user.findUnique({ where: { email } });

    if (!model) return null;

    const user = UserPrismaModelToUserEntityMapper.map(model);

    return user;
  }

  async findById(id: string): Promise<User | null> {
    const model = await prismaClient.user.findUnique({ where: { id } });

    if (!model) return null;

    const user = UserPrismaModelToUserEntityMapper.map(model);

    return user;
  }

  async findByResetToken(resetToken: string): Promise<User | null> {
    const model = await prismaClient.user.findFirst({ where: { resetToken } });

    if (!model) return null;

    const user = UserPrismaModelToUserEntityMapper.map(model);

    return user;
  }

  async create(user: User): Promise<void> {
    const model: UserPrismaModel = UserEntityToUserPrismaModelMapper.map(user);

    await prismaClient.user.create({ data: model });
  }

  async update(user: User): Promise<void> {
    const model = UserEntityToUserPrismaModelMapper.map(user);

    await prismaClient.user.update({
      where: { id: user.getId() },
      data: model,
    });
  }
}
