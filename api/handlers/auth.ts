import jwt from 'jsonwebtoken';

const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID;
const AUTH0_CLIENT_PUBLIC_KEY = process.env.AUTH0_CLIENT_PUBLIC_KEY;

// Policy helper function
const buildIAMPolicy = (userId, effect, resource, context) => {
    const policy = {
        principalId: userId,
        policyDocument: {
            Version: '2012-10-17',
            Statement: [
                {
                    Action: 'execute-api:Invoke',
                    Effect: effect,
                    Resource: resource,
                },
            ],
        },
        context,
    };

    return policy;
};

// Reusable Authorizer function, set on `authorizer` field in serverless.yml
module.exports.auth0 = (event, context, callback) => {
    console.log('event', event);

    if (!event.authorizationToken) {
        callback('Unauthorized');
    }

    const tokenParts = event.authorizationToken.split(' ');
    const tokenValue = tokenParts[1];

    // no auth token!
    if (!(tokenParts[0].toLowerCase() === 'bearer' && tokenValue)) {
        callback('Unauthorized');
    }

    const options = {
        audience: AUTH0_CLIENT_ID,
    };

    try {
        jwt.verify(tokenValue, AUTH0_CLIENT_PUBLIC_KEY, options, (verifyError, decoded) => {
            // 401 Unauthorized
            if (verifyError) {
                console.log('verifyError', verifyError);
                console.log(`Token invalid. ${verifyError}`);
                callback('Unauthorized');
            }

            // is custom authorizer function
            callback(null, buildIAMPolicy(decoded.sub, 'Allow', event.methodArn, context));
        });
    } catch (err) {
        console.log('catch error. Invalid token', err);
        callback('Unauthorized');
    }
};