// import { CognitoUserPool } from 'amazon-cognito-identity-js';

// const poolData = {
//   UserPoolId: 'us-east-1_wSIZ6PatW',
//   ClientId: '41f7nq8s0d4spgq8vq9c9hpd7r',
// };

// const userPool = new CognitoUserPool(poolData);

// export const signUp = (username, password, email) => {
//   userPool.signUp(username, password, [{ Name: 'email', Value: email }], null, (err, result) => {
//     if (err) {
//       console.error('Signup Error:', err);
//       return;
//     }
//     console.log('Signup Success:', result);
//   });
// };

// export const login = (username, password) => {
//   // Add logic to handle login using Cognito
// };
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'us-east-1_wSIZ6PatW',  
  ClientId: '41f7nq8s0d4spgq8vq9c9hpd7r',  
};

const userPool = new CognitoUserPool(poolData);

export const signUp = (username, password, email) => {
  userPool.signUp(username, password, [{ Name: 'email', Value: email }], null, (err, result) => {
    if (err) {
      console.error('Signup Error:', err);
      return;
    }
    console.log('Signup Success:', result);
  });
};

export const login = (username, password) => {
  const user = new CognitoUser({
    Username: username,
    Pool: userPool,
  });

  const authenticationDetails = new AuthenticationDetails({
    Username: username,
    Password: password,
  });

  user.authenticateUser(authenticationDetails, {
    onSuccess: (result) => {
      console.log('Login Success:', result);
      console.log('Access Token:', result.getAccessToken().getJwtToken());
      console.log('ID Token:', result.getIdToken().getJwtToken());
      console.log('Refresh Token:', result.getRefreshToken().getToken());
    },

    onFailure: (err) => {
      console.error('Login Error:', err);
    },

    newPasswordRequired: (userAttributes, requiredAttributes) => {
      console.log('New Password Required:', userAttributes);
    },

    mfaRequired: (challengeName, challengeParameters) => {
      console.log('MFA Required:', challengeName, challengeParameters);
    },

    totpRequired: (challengeName, challengeParameters) => {
      console.log('TOTP Required:', challengeName, challengeParameters);
    },
  });
};
