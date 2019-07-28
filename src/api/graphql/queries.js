// eslint-disable
// this is an auto generated file. This will be overwritten

export const getFranchiseAndLocations = `query GetFranchiseAndLocations($id: ID!) {
  getFranchiseAndLocations(id: $id) {
    id
    userID
    franchise
    location
    latitude
    longitude
  }
}
`;
export const listFranchiseAndLocationss = `query ListFranchiseAndLocationss(
  $filter: ModelFranchiseAndLocationsFilterInput
  $limit: Int
  $nextToken: String
) {
  listFranchiseAndLocationss(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userID
      franchise
      location
      latitude
      longitude
    }
    nextToken
  }
}
`;
export const getProducts = `query GetProducts($id: ID!) {
  getProducts(id: $id) {
    id
    location
    price
    parValue
    packSize
    storageType
    supplier
    brand
    unit
    itemNumber
    description
    commonField
  }
}
`;
export const listProductss = `query ListProductss(
  $filter: ModelProductsFilterInput
  $limit: Int
  $nextToken: String
) {
  listProductss(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      location
      price
      parValue
      packSize
      storageType
      supplier
      brand
      unit
      itemNumber
      description
      commonField
    }
    nextToken
  }
}
`;
export const getRecipeMix = `query GetRecipeMix($id: ID!) {
  getRecipeMix(id: $id) {
    id
    menuID
    productID
    quantityUsed
  }
}
`;
export const listRecipeMixs = `query ListRecipeMixs(
  $filter: ModelRecipeMixFilterInput
  $limit: Int
  $nextToken: String
) {
  listRecipeMixs(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      menuID
      productID
      quantityUsed
    }
    nextToken
  }
}
`;
export const getMenuItems = `query GetMenuItems($id: ID!) {
  getMenuItems(id: $id) {
    id
    price
    location
    menuName
  }
}
`;
export const listMenuItemss = `query ListMenuItemss(
  $filter: ModelMenuItemsFilterInput
  $limit: Int
  $nextToken: String
) {
  listMenuItemss(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      price
      location
      menuName
    }
    nextToken
  }
}
`;
export const getOrderCartItems = `query GetOrderCartItems($id: ID!) {
  getOrderCartItems(id: $id) {
    id
    productID
    quantityToBuy
    packSizeToBuy
    subtotalCost
  }
}
`;
export const listOrderCartItemss = `query ListOrderCartItemss(
  $filter: ModelOrderCartItemsFilterInput
  $limit: Int
  $nextToken: String
) {
  listOrderCartItemss(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      productID
      quantityToBuy
      packSizeToBuy
      subtotalCost
    }
    nextToken
  }
}
`;
export const getOrderCarts = `query GetOrderCarts($id: ID!) {
  getOrderCarts(id: $id) {
    id
    location
    supplyOrderID
    supplyOrderTimestamp
    orderType
    totalCost
    sent
    acknowledged
    shipped
    received
    paid
  }
}
`;
export const listOrderCartss = `query ListOrderCartss(
  $filter: ModelOrderCartsFilterInput
  $limit: Int
  $nextToken: String
) {
  listOrderCartss(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      location
      supplyOrderID
      supplyOrderTimestamp
      orderType
      totalCost
      sent
      acknowledged
      shipped
      received
      paid
    }
    nextToken
  }
}
`;
export const getInventoryCarts = `query GetInventoryCarts($id: ID!) {
  getInventoryCarts(id: $id) {
    id
    location
    completed
  }
}
`;
export const listInventoryCartss = `query ListInventoryCartss(
  $filter: ModelInventoryCartsFilterInput
  $limit: Int
  $nextToken: String
) {
  listInventoryCartss(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      location
      completed
    }
    nextToken
  }
}
`;
export const getInventoryCountItems = `query GetInventoryCountItems($id: ID!) {
  getInventoryCountItems(id: $id) {
    id
    inventoryCartID
    productID
    quantityLeft
    version
  }
}
`;
export const listInventoryCountItemss = `query ListInventoryCountItemss(
  $filter: ModelInventoryCountItemsFilterInput
  $limit: Int
  $nextToken: String
) {
  listInventoryCountItemss(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      inventoryCartID
      productID
      quantityLeft
      version
    }
    nextToken
  }
}
`;
export const searchProductss = `query SearchProductss(
  $filter: SearchableProductsFilterInput
  $sort: SearchableProductsSortInput
  $limit: Int
  $nextToken: Int
) {
  searchProductss(
    filter: $filter
    sort: $sort
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      location
      price
      parValue
      packSize
      storageType
      supplier
      brand
      unit
      itemNumber
      description
      commonField
    }
    nextToken
  }
}
`;
