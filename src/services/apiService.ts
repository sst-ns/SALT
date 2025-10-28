import AWS from "aws-sdk";

export const AWS_Configure = () => {
  AWS.config.region = import.meta.env.VITE_REACT_AWS_REGION;
  //   AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  //     IdentityPoolId: import.meta.env.VITE_REACT_AWS_IDENTITY_POOL_ID, // Identity Pool ID
  //   });

  AWS.config.update({
    accessKeyId: import.meta.env.VITE_REACT_AWS_ACCESS_KEY,
    secretAccessKey: import.meta.env.VITE_REACT_AWS_SECRET_KEY,
    sessionToken: import.meta.env.VITE_REACT_AWS_SESSION_TOKEN,
    region: import.meta.env.VITE_REACT_AWS_REGION,
  });

  //   AWS.config.update({
  //     region: import.meta.env.VITE_REACT_AWS_REGION,
  //     credentials: new AWS.CognitoIdentityCredentials({
  //       IdentityPoolId: import.meta.env.VITE_REACT_AWS_IDENTITY_POOL_ID,
  //       Logins: {
  //         [`cognito-idp.${import.meta.env.VITE_REACT_AWS_REGION}.amazonaws.com/${
  //           import.meta.env.VITE_REACT_AWS_USER_POOL_ID
  //         }`]: window.sessionStorage.getItem("tkn_frm_saml"),
  //       },
  //     }),
  //   });
};
