// eslint-disable
// this is an auto generated file. This will be overwritten

export const getInventoryItem = `query GetInventoryItem($id: ID!) {
  getInventoryItem(id: $id) {
    franchise
    location
    item
    storage
    category
    quantity
    parValue
    updatedAt
    id
  }
}
`;
export const listInventoryItems = `query ListInventoryItems(
  $filter: ModelInventoryItemFilterInput
  $limit: Int
  $nextToken: String
) {
  listInventoryItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      franchise
      location
      item
      storage
      category
      quantity
      parValue
      updatedAt
      id
    }
    nextToken
  }
}
`;
export const getUserLocations = `query GetUserLocations($id: ID!) {
  getUserLocations(id: $id) {
    user
    franchise
    location
    id
  }
}
`;
export const listUserLocationss = `query ListUserLocationss(
  $filter: ModelUserLocationsFilterInput
  $limit: Int
  $nextToken: String
) {
  listUserLocationss(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      user
      franchise
      location
      id
    }
    nextToken
  }
}
`;
