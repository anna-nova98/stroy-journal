import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Создаем виды работ
  const workTypes = await prisma.workType.createMany({
    data: [
      {
        name: 'Кладка перегородок',
        description: 'Кладка кирпичных и блочных перегородок',
        unit: 'м²',
      },
      {
        name: 'Монтаж опалубки',
        description: 'Установка опалубки для бетонных работ',
        unit: 'м²',
      },
      {
        name: 'Бетонирование',
        description: 'Заливка бетона в опалубку',
        unit: 'м³',
      },
      {
        name: 'Армирование',
        description: 'Установка арматурного каркаса',
        unit: 'т',
      },
      {
        name: 'Кровельные работы',
        description: 'Устройство кровли',
        unit: 'м²',
      },
      {
        name: 'Отделочные работы',
        description: 'Внутренняя отделка помещений',
        unit: 'м²',
      },
      {
        name: 'Электромонтаж',
        description: 'Прокладка электрических сетей',
        unit: 'м',
      },
      {
        name: 'Сантехнические работы',
        description: 'Установка сантехнического оборудования',
        unit: 'шт',
      },
      {
        name: 'Остекление',
        description: 'Установка окон и стеклопакетов',
        unit: 'м²',
      },
      {
        name: 'Фасадные работы',
        description: 'Отделка фасада здания',
        unit: 'м²',
      },
    ],
    skipDuplicates: true,
  });

  console.log(`✅ Created ${workTypes.count} work types`);

  // Создаем тестовые записи журнала
  const workLogs = await prisma.workLog.createMany({
    data: [
      {
        workDate: new Date('2024-01-15'),
        workTypeId: (await prisma.workType.findFirst({ where: { name: 'Кладка перегородок' } }))!.id,
        quantity: 24.5,
        workerName: 'Иванов Иван Иванович',
        notes: 'Кладка перегородок в блоке А',
      },
      {
        workDate: new Date('2024-01-16'),
        workTypeId: (await prisma.workType.findFirst({ where: { name: 'Монтаж опалубки' } }))!.id,
        quantity: 120.0,
        workerName: 'Петров Петр Петрович',
        notes: 'Опалубка для фундамента',
      },
      {
        workDate: new Date('2024-01-17'),
        workTypeId: (await prisma.workType.findFirst({ where: { name: 'Бетонирование' } }))!.id,
        quantity: 45.0,
        workerName: 'Сидоров Алексей Владимирович',
        notes: 'Заливка плиты перекрытия',
      },
      {
        workDate: new Date('2024-01-18'),
        workTypeId: (await prisma.workType.findFirst({ where: { name: 'Армирование' } }))!.id,
        quantity: 3.2,
        workerName: 'Кузнецова Мария Сергеевна',
        notes: 'Армирование колонн',
      },
      {
        workDate: new Date('2024-01-19'),
        workTypeId: (await prisma.workType.findFirst({ where: { name: 'Кровельные работы' } }))!.id,
        quantity: 280.0,
        workerName: 'Васильев Дмитрий Анатольевич',
        notes: 'Устройство мягкой кровли',
      },
    ],
    skipDuplicates: true,
  });

  console.log(`✅ Created ${workLogs.count} work logs`);
  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });