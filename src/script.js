const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const newLink = await prisma.link.create({
    data: {
      url: 'www.howtographql.com',
      description: 'Fullstack tutorial for GraphQL',
    },
  });
  const allLinks = await prisma.link.findMany();
  prisma.link.update({
    
  })
  console.log(allLinks);
}

main()
  .catch(e => { throw e })
  .finally(async () => await prisma.$disconnect);
