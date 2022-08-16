import type { APIGatewayProxyResult } from 'aws-lambda';
import { S3 } from 'aws-sdk';
import csv from 'csv-parser';
import { serverErrorResponse, successResponse } from '../../libs/responseCreator';

const { BUCKET_NAME, REGION } = process.env

const importFileParser = async (event): Promise<APIGatewayProxyResult> => {
  try {
    const s3 = new S3({ region: REGION });

    for (const record of event.Records) {
      const fileKey = record.s3.object.key;
      const s3Params: S3.GetObjectRequest = {
        Bucket: BUCKET_NAME,
        Key: fileKey
      };

      const s3Stream = s3.getObject(s3Params).createReadStream();
      const parsedCSV = await parseCSV(s3Stream);

      return successResponse(parsedCSV);
    }
  } catch (error) {
    return serverErrorResponse(error);
  }
};

function parseCSV(stream): Promise<any> {
  return new Promise((resolve, reject) => {
    const parsedData = [];

    stream
      .pipe(csv())
      .on('data', data => {
        parsedData.push(data);
      })
      .on('error', error => reject(error))
      .on('end', () => resolve(parsedData));
  });
}

export const main = importFileParser;
