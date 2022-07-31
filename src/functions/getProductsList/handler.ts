import type { APIGatewayProxyResult } from "aws-lambda";
import { getProductsListService } from '../../services/getProductsListService';
import { serverErrorResponse, notFoundResponse, successResponse } from '../../libs/responseCreator';

const getProductsList = async (): Promise<APIGatewayProxyResult> => {
  try {
    const products = await getProductsListService();

    if (!products) {
      return notFoundResponse('Products not found');
    }

    return successResponse(products);
  } catch (error) {
    return serverErrorResponse(error);
  }
};

export const main = getProductsList;
