import { PrismaClient } from '@prisma/client'
import type { GeoJSON } from 'geojson';

const prisma = new PrismaClient()

interface CreateHazardEvent {
  lat: number;
  lng: number;
}

module.exports.get = async (event) => {
  const hazards = await prisma.hazard.findMany();

  const features: GeoJSON[] = hazards.map(hazard => ({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [hazard.lng.toNumber(), hazard.lat.toNumber()]
    },
    properties: {
      createdAt: hazard.createdAt,
      updatedAt: hazard.updatedAt
    }
  }))

  return {
    statusCode: 200,
    body: JSON.stringify({
      geojson: {
        type: 'FeatureCollection',
        features: features
      }
    }),
  };
};

// TODO: Get image from request
// TODO: Upload image to s3, get the URI
// TODO: Create db record
module.exports.create = async (event) => {
  const body: CreateHazardEvent = JSON.parse(event.body);

  const hazard = await prisma.hazard.create({
    data: {
      userId: 'gday@danferg.com',
      lat: body.lat,
      lng: body.lng,
    }
  })

  return {
    statusCode: 200,
    body: JSON.stringify({
      hazard: hazard
    }),
  };
}