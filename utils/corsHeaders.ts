export const corsHeaders = (requestOrigin: string) => {
  const origins = (process.env.CORS_ORIGINS_LIST || '').split(',');
  if (origins.includes(requestOrigin)) {
    return {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': `${requestOrigin}`,
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Credentials': 'true',
    };
  }
  return {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '',
    'Access-Control-Allow-Methods': '',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Credentials': 'true',
  };
};
