import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

module.exports.handler = async (event) => {
    const hazards = await prisma.hazard.findMany();

    const features = hazards.map(hazard => ({
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [hazard.lng.toNumber(), hazard.lat.toNumber()]
        },
        properties: {
            hazardType: hazard.hazardType,
            createdAt: hazard.createdAt,
            updatedAt: hazard.updatedAt
        }
    }))

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            geojson: {
                type: 'FeatureCollection',
                features: features
            }
        }),
    };
};