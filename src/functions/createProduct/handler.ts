import type { APIGatewayProxyResult } from "aws-lambda";
import { serverErrorResponse, successResponse } from '../../libs/responseCreator';
import { createProductService } from "src/services/createProductService";

const createProduct = async (event): Promise<APIGatewayProxyResult> => {
  try {
    const payload = JSON.parse(event.body);

    const newProduct = await createProductService(payload);

    return successResponse(newProduct);
  } catch (error) {
    return serverErrorResponse(error);
  }
};

export const main = createProduct;
