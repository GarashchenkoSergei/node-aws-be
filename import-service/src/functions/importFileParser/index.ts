import { handlerPath } from '@libs/handler-resolver';

const { UPLOADED_FOLDER, BUCKET_NAME } = process.env

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      s3: {
        bucket: `${BUCKET_NAME}`,
        event: 's3:ObjectCreated:*',
        rules: [{
          prefix: `${UPLOADED_FOLDER}/`
        }],
        existing: true
      }
    },
  ],
};
