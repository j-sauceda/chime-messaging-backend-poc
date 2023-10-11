import { APIGatewayEvent, APIGatewayProxyHandler } from 'aws-lambda';
import { corsHeaders as headers } from '../utils/corsHeaders';
import MessagingService from '../services/MessagingService';
import logger from '../utils/logger';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayEvent) => {
  const origin = event.headers.origin ?? event.headers.Origin ?? '';
  const response = { headers: headers(origin) };

  try {
    const { appInstanceARN, channelName, channelId, appInstanceUserARN } = typeof event.body === 'string' ? JSON.parse(event.body || '{}') : event.body;
    logger.info('Processing request to create chime messaging channel');
    logger.debug(`event body: ${event.body}`);

    const messagingService = new MessagingService();
    const data = await messagingService.createChannel(appInstanceARN, channelName, channelId, appInstanceUserARN);
    return {
      ...response,
      statusCode: data.$metadata ? data.$metadata.httpStatusCode : '200',
      body: JSON.stringify({ ...data }),
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    logger.error('Error creating messaging channel: ', error);
    return {
      ...response,
      statusCode: error.$metadata ? error.$metadata.httpStatusCode : '400',
      body: JSON.stringify({error}),
    };
  }
};
