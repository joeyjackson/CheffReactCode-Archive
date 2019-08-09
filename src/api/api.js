import { Auth, API, graphqlOperation } from 'aws-amplify';
import * as mutations from './graphql/mutations';
import * as queries from './graphql/queries';

//=========== QUERIES ===========

export const userLocationsPromise = (userID) => {
  return API.graphql(
    graphqlOperation(queries.listFranchiseAndLocationss, {
      filter: {
        userID: {
          eq: userID
        }
      }
    })
  );
};

export const userIDPromise = () => {
  return Auth.currentUserInfo().then(data => {
    return data.attributes.sub;
  });
};

//========== MUTATIONS ==========

export const createUserFranchiseLocation = Item => {
  return API.graphql(
    graphqlOperation(mutations.createFranchiseAndLocations, {
      input: Item
    })
  );
};

export const createInventoryCart = (location) => {
  return API.graphql(
    graphqlOperation(mutations.createInventoryCarts, {
      input: {
        location: location,
        completed: false
      }
    })
  );
};