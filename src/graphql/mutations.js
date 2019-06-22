// eslint-disable
// this is an auto generated file. This will be overwritten

export const createInventoryItem = `mutation CreateInventoryItem($input: CreateInventoryItemInput!) {
  createInventoryItem(input: $input) {
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
export const updateInventoryItem = `mutation UpdateInventoryItem($input: UpdateInventoryItemInput!) {
  updateInventoryItem(input: $input) {
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
export const deleteInventoryItem = `mutation DeleteInventoryItem($input: DeleteInventoryItemInput!) {
  deleteInventoryItem(input: $input) {
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
export const createUserLocations = `mutation CreateUserLocations($input: CreateUserLocationsInput!) {
  createUserLocations(input: $input) {
    user
    franchise
    location
    id
  }
}
`;
export const updateUserLocations = `mutation UpdateUserLocations($input: UpdateUserLocationsInput!) {
  updateUserLocations(input: $input) {
    user
    franchise
    location
    id
  }
}
`;
export const deleteUserLocations = `mutation DeleteUserLocations($input: DeleteUserLocationsInput!) {
  deleteUserLocations(input: $input) {
    user
    franchise
    location
    id
  }
}
`;
