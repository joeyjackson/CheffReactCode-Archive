import React from 'react';
import AWSAppSyncClient from 'aws-appsync';
import AppSyncConfig from './aws-exports';
import { ApolloProvider } from 'react-apollo';
import { Rehydrated } from 'aws-appsync-react'; // this needs to also be installed when working with React
import {
  withAuthenticator,
  SignIn,
  Greetings,
  ConfirmSignIn,
  TOTPSetup,
  ForgotPassword,
  Loading,
  RequireNewPassword,
  VerifyContact
} from 'aws-amplify-react'; // or 'aws-amplify-react-native';
import App from './App';

const client = new AWSAppSyncClient({
  url: AppSyncConfig.aws_appsync_graphqlEndpoint,
  region: AppSyncConfig.aws_appsync_region,
  auth: {
    type: AppSyncConfig.aws_appsync_authenticationType

    // jwtToken: async () => token, // Required when you use Cognito UserPools OR OpenID Connect. token object is obtained previously
  }
});

const WithProvider = () => (
  <ApolloProvider client={client}>
    <Rehydrated>
      <App />
    </Rehydrated>
  </ApolloProvider>
);

export default withAuthenticator(WithProvider, {
  includeGreetings: true,
  authenticatorComponents: [
    <Greetings />,
    <ConfirmSignIn />,
    <TOTPSetup />,
    <ForgotPassword />,
    <Loading />,
    <RequireNewPassword />,
    <VerifyContact />,
    <SignIn />
  ]
});
