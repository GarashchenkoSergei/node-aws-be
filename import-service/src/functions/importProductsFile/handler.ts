import type { APIGatewayProxyResult } from 'aws-lambda';
import { S3 } from 'aws-sdk';
import { serverErrorResponse, invalidRequestResponse, successResponse } from '../../libs/responseCreator';

const { UPLOADED_FOLDER, BUCKET_NAME, REGION } = process.env

const importProductsFile = async (event): Promise<APIGatewayProxyResult> => {
  const { name: fileName } = event.queryStringParameters;

  if (!fileName) {
    return invalidRequestResponse('Please provide the name parameter');
  }

  try {
    const s3 = new S3({ region: REGION });

    const s3Params = {
      Bucket: BUCKET_NAME,
      Key: `${UPLOADED_FOLDER}/${fileName}`,
      Expires: 60,
      ContentType: 'text/csv'
    };

    const url = await s3.getSignedUrlPromise('putObject', s3Params);

    console.log(url)

    return successResponse(url);
  } catch (error) {
    return serverErrorResponse(error);
  }
};

export const main = importProductsFile;
