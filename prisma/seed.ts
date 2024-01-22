import { PrismaClient } from '@prisma/client';
const client = new PrismaClient();

async function main() {
    await client.user.upsert({
        where: { uid: 'admin' },
        create: { uid: 'admin', name: 'admin', role: 'ADMIN' },
        update: {},
    });
}

main()
    .then(async () => {
        await client.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await client.$disconnect();
        process.exit(1);
    });
