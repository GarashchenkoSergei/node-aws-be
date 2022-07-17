import type { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda"
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { productMocks } from '../../mocks/products.js';

const getProductsList: APIGatewayProxyHandler = async (): Promise<APIGatewayProxyResult> => {
  // change to await request to DB in the future
  const products = JSON.stringify(productMocks);

  return formatJSONResponse({
    statusCode: 200,
    body: `${products}`,
  });
};

export const main = middyfy(getProductsList);
