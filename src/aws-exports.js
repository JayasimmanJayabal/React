import { Amplify } from 'aws-amplify';

Amplify.configure({
    Auth: {
        region: 'YOUR_AWS_REGION',
        userPoolId: 'YOUR_COGNITO_USER_POOL_ID',
        userPoolWebClientId: 'YOUR_COGNITO_APP_CLIENT_ID',
    },
    Storage: {
        AWSS3: {
            bucket: 'YOUR_S3_BUCKET_NAME',
            region: 'YOUR_AWS_REGION',
        }
    }
});
