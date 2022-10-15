import { PrismaClient } from '@prisma/client'
import { verify } from 'jsonwebtoken';

const prisma = new PrismaClient()
const AUTH0_CLIENT_PUBLIC_KEY = process.env.AUTH0_CLIENT_PUBLIC_KEY;

interface jwtResponse {
    sub: string | null;
}

module.exports.handler = async (event) => {
    const token = event.headers.Authorization.split(' ')[1];
    var decoded: jwtResponse = {
        sub: null
    };

    try {
        decoded = verify(token, AUTH0_CLIENT_PUBLIC_KEY);
    } catch (error) {
        return {
            statusCode: 401,
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                message: 'Unauthorized. Please sign in first.'
            })
        }
    }

    if (decoded.sub === null) {
        return {
            statusCode: 401,
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                message: 'Unauthorized. Please sign in first.'
            })
        }
    }

    if (event === undefined || event.body === undefined) {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                message: `An error occured.`
            }),
        }
    };

    const responseBody = typeof event.body === 'string'
        ? JSON.parse(event.body)
        : event.body

    const hazard = await prisma.hazard.create({
        data: {
            userId: decoded.sub,
            lat: responseBody.lat,
            lng: responseBody.lng,
            hazardType: responseBody.hazardType,
            notes: responseBody.notes === "" ? null : responseBody.notes
        }
    })

    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            hazard: hazard
        }),
    };
}