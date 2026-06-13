import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.task.createMany({
    data: [
      {
        title: 'Learn NestJS',
        description: 'Complete backend setup',
      },
      {
        title: 'Build Frontend',
        description: 'Create Next.js UI',
      },
      {
        title: 'Write Tests',
        description: 'Add unit tests',
      },
    ],
  });

  console.log('Seed completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });