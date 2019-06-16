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
