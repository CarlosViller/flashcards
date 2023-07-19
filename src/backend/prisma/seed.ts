import prisma from "./client";

async function main() {
  await prisma.user.upsert({
    where: { email: "alice@prisma.io" },
    update: {},
    create: {
      email: "alice@prisma.io",
      boxes: {
        create: {
          boxName: "Test box",
          cards: {
            create: [
              {
                question: "Pregunta 1",
                answer: "Respuesta 1",
              },
              {
                question: "Pregunta 2",
                answer: "Respuesta 2",
              },
              {
                question: "Pregunta 3",
                answer: "Respuesta 3",
              },
              {
                question: "Pregunta 4",
                answer: "Respuesta 4",
              },
            ],
          },
        },
      },
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
