import type { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { middyfy } from '@libs/lambda';
import { productMocks } from '@mocks/products';

const getProductById: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // change to await request to DB in the future
  const product = JSON.stringify(productMocks.find((product) => product.id === event.pathParameters['productId']));

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: `${product}`,
  };
};

export const main = middyfy(getProductById);
