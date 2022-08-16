import type { APIGatewayProxyResult } from "aws-lambda";
import { getProductByIdService } from "src/services/getProductByIdService";

import { serverErrorResponse, notFoundResponse, successResponse } from '../../libs/responseCreator';

type Event = {
  pathParameters: {
    productId: unknown
  }
}

const getProductById = async (event: Event): Promise<APIGatewayProxyResult> => {
  if (!event.pathParameters.productId) {
    return notFoundResponse('Please check the product ID');
  }

  try {
    const product = await getProductByIdService(event.pathParameters.productId);

    if (!product) {
      return notFoundResponse('Product not found');;
    }

    return successResponse(product);
  } catch (error) {
    return serverErrorResponse(error);
  }
};

export const main = getProductById;