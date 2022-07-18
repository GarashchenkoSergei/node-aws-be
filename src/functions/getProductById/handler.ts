import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { productMocks } from '@mocks/products';

const getProductById = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if (!event.pathParameters.productId) {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'please provide the product ID' }),
    };
  }

  try {
    // change to await request to DB in the future with type checks
    const product = productMocks.find((product) => product.id === event.pathParameters.productId);

    if (!product) {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'product not found' }),
      };
    }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(product),
    };
  } catch (error) {
    return {
      statusCode: 503,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: 'something went wrong',
    };
  }
};

export const main = getProductById;