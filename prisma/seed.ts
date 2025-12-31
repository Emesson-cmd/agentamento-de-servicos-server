import { PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  const passwordHash = await bcrypt.hash('123456', 10);

  // 🔹 Barbearia
  const barberShop = await prisma.barberShop.create({
    data: {
      name: 'Barbearia Style Pro',
      description: 'Cortes modernos e clássicos',
      phone: '(11) 99999-9999',
      address: 'Rua Central, 123',
    },
  });

  // 🔹 Admin
  await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@barbearia.com',
      password: passwordHash,
      role: UserRole.ADMIN,
    },
  });

  // 🔹 Serviços
  const haircut = await prisma.service.create({
    data: {
      barberShopId: barberShop.id,
      name: 'Corte de Cabelo',
      price: 40,
      durationMin: 30,
    },
  });

  const beard = await prisma.service.create({
    data: {
      barberShopId: barberShop.id,
      name: 'Barba',
      price: 30,
      durationMin: 20,
    },
  });

  // 🔹 Barbeiros
  const barberUser1 = await prisma.user.create({
    data: {
      name: 'João Barbeiro',
      email: 'joao@barbearia.com',
      password: passwordHash,
      role: UserRole.BARBER,
    },
  });

  const barber1 = await prisma.barber.create({
    data: {
      userId: barberUser1.id,
      barberShopId: barberShop.id,
      bio: 'Especialista em degradê',
      experienceYears: 5,
    },
  });

  const barberUser2 = await prisma.user.create({
    data: {
      name: 'Carlos Barbeiro',
      email: 'carlos@barbearia.com',
      password: passwordHash,
      role: UserRole.BARBER,
    },
  });

  const barber2 = await prisma.barber.create({
    data: {
      userId: barberUser2.id,
      barberShopId: barberShop.id,
      bio: 'Especialista em barba',
      experienceYears: 8,
    },
  });

  // 🔹 Relacionar serviços aos barbeiros
  await prisma.barberService.createMany({
    data: [
      { barberId: barber1.id, serviceId: haircut.id },
      { barberId: barber1.id, serviceId: beard.id },
      { barberId: barber2.id, serviceId: haircut.id },
      { barberId: barber2.id, serviceId: beard.id },
    ],
  });

  // 🔹 Horários dos barbeiros
  const weekdays = [1, 2, 3, 4, 5]; // Seg a Sex

  for (const day of weekdays) {
    await prisma.barberSchedule.createMany({
      data: [
        {
          barberId: barber1.id,
          weekday: day,
          startTime: '09:00',
          endTime: '18:00',
        },
        {
          barberId: barber2.id,
          weekday: day,
          startTime: '10:00',
          endTime: '19:00',
        },
      ],
    });
  }

  // 🔹 Clientes
  const clientUser = await prisma.user.create({
    data: {
      name: 'Cliente Teste',
      email: 'cliente@teste.com',
      password: passwordHash,
      role: UserRole.CLIENT,
    },
  });

  await prisma.client.create({
    data: {
      userId: clientUser.id,
    },
  });

  console.log('✅ Seed finalizado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
