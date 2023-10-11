import { APIGatewayEvent, APIGatewayProxyHandler } from 'aws-lambda';
import { corsHeaders as headers } from '../utils/corsHeaders';
import IdentityService from "../services/IdentityService";
import logger from '../utils/logger';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayEvent) => {
  const origin = event.headers.origin ?? event.headers.Origin ?? '';
  const response = { headers: headers(origin) };

  try {
    const { appARN, userId, userName } = typeof event.body === 'string' ? JSON.parse(event.body || '{}') : event.body;
    logger.info('Processing request to create chime messaging user');

    const identityService = new IdentityService();
    const data = await identityService.createUser(appARN, userId, userName);
    return {
      ...response,
      statusCode: data.$metadata ? data.$metadata.httpStatusCode : '200',
      body: JSON.stringify({ ...data }),
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    logger.error('Error creating messaging user: ', error);
    return {
      ...response,
      statusCode: error.$metadata ? error.$metadata.httpStatusCode : '400',
      body: JSON.stringify({error}),
    };
  }
};
