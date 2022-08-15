const defaultHeaders = {
  'Access-Control-Allow-Origin': '*',
};

const serverErrorResponse = (error: Error, statusCode: number = 500) => {
  return {
    statusCode,
    headers: {
      ...defaultHeaders,
    },
    body: JSON.stringify({ message: error.message || 'Server error' }),
  };
};

const notFoundResponse = (message: string, statusCode: number = 404) => {
  return {
    statusCode,
    headers: {
      ...defaultHeaders,
    },
    body: JSON.stringify({ message: message || 'Not found' }),
  };
};

const invalidRequestResponse = (message: string, statusCode: number = 400) => {
  return {
    statusCode,
    headers: {
      ...defaultHeaders,
    },
    body: JSON.stringify({ message: message || 'Not found' }),
  };
};

const successResponse = (body: Object, statusCode: number = 200) => {
  return {
    statusCode,
    headers: {
      ...defaultHeaders,
    },
    body: JSON.stringify(body),
  };
};

export { serverErrorResponse, notFoundResponse, invalidRequestResponse, successResponse };
