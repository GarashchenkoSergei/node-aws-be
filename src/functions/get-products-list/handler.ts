import type { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda"
import { middyfy } from '@libs/lambda';
import { productMocks } from '@mocks/products';

const getProductsList: APIGatewayProxyHandler = async (): Promise<APIGatewayProxyResult> => {
  // change to await request to DB in the future
  const products = JSON.stringify(productMocks);

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: `${products}`,
  };
};

export const main = middyfy(getProductsList);
