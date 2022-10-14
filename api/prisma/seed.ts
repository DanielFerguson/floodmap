import { Hazard, Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface Point {
    lat: number;
    lng: number;
}

const generateRandomNumber = (min: number, max: number): number => {
    return (Math.random() * (max - min + 1) + min);
}

const generateRandomPoint = (minX: number, minY: number, maxX: number, maxY: number): Point => {
    const x = generateRandomNumber(minX, maxX);
    const y = generateRandomNumber(minY, maxY);

    return {
        lat: x,
        lng: y,
    };
}

async function main() {
    let minX = -37.605579;
    let maxX = -37.513317;
    let minY = 143.774027;
    let maxY = 143.930067;

    for (let index = 0; index < 50; index++) {
        let point = generateRandomPoint(minX, minY, maxX, maxY);

        await prisma.hazard.create({
            data: {
                userId: 'gday@danferg.com',
                lat: new Prisma.Decimal(point.lat),
                lng: new Prisma.Decimal(point.lng),
            }
        });
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
