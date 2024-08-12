import AWS from 'aws-sdk';

AWS.config.update({
  region: 'us-east-1',
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'us-east-1:44bbc88a-8392-48f4-988e-8e59e88be7f7',
  }),
});

const s3 = new AWS.S3();

export const listBuckets = () => {
  s3.listBuckets((err, data) => {
    if (err) {
      console.error("Error:", err);
    } else {
      console.log("S3 Buckets:", data.Buckets);
    }
  });
};

export const uploadToS3 = (params) => {
  return s3.upload(params).promise();
};
