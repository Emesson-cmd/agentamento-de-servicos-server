import { Module } from '@nestjs/common';
import { servicePrismaRepositoryProvider } from 'src/usecases/service/service.prisma.repository.provider';
import { userPrismaRepositoryProvider } from 'src/usecases/user/user.prisma.repository.provider';

@Module({
  providers: [userPrismaRepositoryProvider, servicePrismaRepositoryProvider],
  exports: [userPrismaRepositoryProvider, servicePrismaRepositoryProvider],
})
export class DatabaseModule {}
