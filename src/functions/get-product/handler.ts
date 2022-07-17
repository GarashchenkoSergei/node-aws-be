import type { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { productMocks } from '@mocks/products';

const getProductById: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // change to await request to DB in the future
  const product = JSON.stringify(productMocks.find((product) => product.id === event.pathParameters['productId']));

  return formatJSONResponse({
    statusCode: 200,
    body: `${product}`,
  });
};

export const main = middyfy(getProductById);
