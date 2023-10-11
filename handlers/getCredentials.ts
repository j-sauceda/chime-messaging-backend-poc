import { APIGatewayEvent, APIGatewayProxyHandler } from "aws-lambda";
import CredentialsService from "../services/CredentialsService";
import { corsHeaders as headers } from "../utils/corsHeaders";
import logger from "../utils/logger";

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayEvent
) => {
  const origin = event.headers.origin ?? event.headers.Origin ?? "";
  const response = { headers: headers(origin) };

  try {
    const appInstanceUserARN =
      event.queryStringParameters?.appInstanceUserARN ?? "";
    logger.info("Processing request to get user credentials");

    const credentialsService = new CredentialsService();
    const data = await credentialsService.getUserCredentials(
      appInstanceUserARN
    );
    return {
      ...response,
      statusCode: data.$metadata.httpStatusCode
        ? data.$metadata.httpStatusCode
        : "200",
      body: JSON.stringify({ ...data }),
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error) {
    logger.error("Error getting credentials: ", error);
    return {
      ...response,
      statusCode: error.$metadata ? error.$metadata.httpStatusCode : "400",
      body: JSON.stringify({ error }),
    };
  }
};
