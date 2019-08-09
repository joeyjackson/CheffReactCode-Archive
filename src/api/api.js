import { Auth } from 'aws-amplify';

export const userIDPromise = () => {
  return Auth.currentUserInfo().then(data => {
    return data.attributes.sub;
  });
};