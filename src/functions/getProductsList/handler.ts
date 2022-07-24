import type { APIGatewayProxyResult } from "aws-lambda"
import { productMocks } from '../../mocks/products';

const getProductsList = async (): Promise<APIGatewayProxyResult> => {
  try {
    // change to await request to DB in the future
    const products = JSON.stringify(productMocks);

    if (!products) {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'products not found' }),
      };
    }

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: `${products}`,
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

export const main = getProductsList;
