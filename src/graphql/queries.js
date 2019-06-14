// eslint-disable
// this is an auto generated file. This will be overwritten

export const getInventoryItem = `query GetInventoryItem($id: ID!) {
  getInventoryItem(id: $id) {
    item
    category
    location
    quantity
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
      item
      category
      location
      quantity
    }
    nextToken
  }
}
`;
