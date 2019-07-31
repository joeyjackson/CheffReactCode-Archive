// eslint-disable
// this is an auto generated file. This will be overwritten

export const createFranchiseAndLocations = `mutation CreateFranchiseAndLocations(
  $input: CreateFranchiseAndLocationsInput!
) {
  createFranchiseAndLocations(input: $input) {
    id
    userID
    franchise
    location
    latitude
    longitude
  }
}
`;
export const updateFranchiseAndLocations = `mutation UpdateFranchiseAndLocations(
  $input: UpdateFranchiseAndLocationsInput!
) {
  updateFranchiseAndLocations(input: $input) {
    id
    userID
    franchise
    location
    latitude
    longitude
  }
}
`;
export const deleteFranchiseAndLocations = `mutation DeleteFranchiseAndLocations(
  $input: DeleteFranchiseAndLocationsInput!
) {
  deleteFranchiseAndLocations(input: $input) {
    id
    userID
    franchise
    location
    latitude
    longitude
  }
}
`;
export const createProducts = `mutation CreateProducts($input: CreateProductsInput!) {
  createProducts(input: $input) {
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
export const updateProducts = `mutation UpdateProducts($input: UpdateProductsInput!) {
  updateProducts(input: $input) {
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
export const deleteProducts = `mutation DeleteProducts($input: DeleteProductsInput!) {
  deleteProducts(input: $input) {
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
export const createRecipeMix = `mutation CreateRecipeMix($input: CreateRecipeMixInput!) {
  createRecipeMix(input: $input) {
    id
    menuID
    productID
    quantityUsed
  }
}
`;
export const updateRecipeMix = `mutation UpdateRecipeMix($input: UpdateRecipeMixInput!) {
  updateRecipeMix(input: $input) {
    id
    menuID
    productID
    quantityUsed
  }
}
`;
export const deleteRecipeMix = `mutation DeleteRecipeMix($input: DeleteRecipeMixInput!) {
  deleteRecipeMix(input: $input) {
    id
    menuID
    productID
    quantityUsed
  }
}
`;
export const createMenuItems = `mutation CreateMenuItems($input: CreateMenuItemsInput!) {
  createMenuItems(input: $input) {
    id
    price
    location
    menuName
  }
}
`;
export const updateMenuItems = `mutation UpdateMenuItems($input: UpdateMenuItemsInput!) {
  updateMenuItems(input: $input) {
    id
    price
    location
    menuName
  }
}
`;
export const deleteMenuItems = `mutation DeleteMenuItems($input: DeleteMenuItemsInput!) {
  deleteMenuItems(input: $input) {
    id
    price
    location
    menuName
  }
}
`;
export const createOrderCartItems = `mutation CreateOrderCartItems($input: CreateOrderCartItemsInput!) {
  createOrderCartItems(input: $input) {
    id
    productID
    quantityToBuy
    packSizeToBuy
    subtotalCost
  }
}
`;
export const updateOrderCartItems = `mutation UpdateOrderCartItems($input: UpdateOrderCartItemsInput!) {
  updateOrderCartItems(input: $input) {
    id
    productID
    quantityToBuy
    packSizeToBuy
    subtotalCost
  }
}
`;
export const deleteOrderCartItems = `mutation DeleteOrderCartItems($input: DeleteOrderCartItemsInput!) {
  deleteOrderCartItems(input: $input) {
    id
    productID
    quantityToBuy
    packSizeToBuy
    subtotalCost
  }
}
`;
export const createOrderCarts = `mutation CreateOrderCarts($input: CreateOrderCartsInput!) {
  createOrderCarts(input: $input) {
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
export const updateOrderCarts = `mutation UpdateOrderCarts($input: UpdateOrderCartsInput!) {
  updateOrderCarts(input: $input) {
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
export const deleteOrderCarts = `mutation DeleteOrderCarts($input: DeleteOrderCartsInput!) {
  deleteOrderCarts(input: $input) {
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
export const createInventoryCarts = `mutation CreateInventoryCarts($input: CreateInventoryCartsInput!) {
  createInventoryCarts(input: $input) {
    id {
      id
      inventoryCartID {
        location
        completed
      }
      productID {
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
      quantityLeft
      version
    }
    location
    completed
  }
}
`;
export const updateInventoryCarts = `mutation UpdateInventoryCarts($input: UpdateInventoryCartsInput!) {
  updateInventoryCarts(input: $input) {
    id {
      id
      inventoryCartID {
        location
        completed
      }
      productID {
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
      quantityLeft
      version
    }
    location
    completed
  }
}
`;
export const deleteInventoryCarts = `mutation DeleteInventoryCarts($input: DeleteInventoryCartsInput!) {
  deleteInventoryCarts(input: $input) {
    id {
      id
      inventoryCartID {
        location
        completed
      }
      productID {
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
      quantityLeft
      version
    }
    location
    completed
  }
}
`;
export const createInventoryCountItems = `mutation CreateInventoryCountItems($input: CreateInventoryCountItemsInput!) {
  createInventoryCountItems(input: $input) {
    id
    inventoryCartID {
      id {
        id
        quantityLeft
        version
      }
      location
      completed
    }
    productID {
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
    quantityLeft
    version
  }
}
`;
export const updateInventoryCountItems = `mutation UpdateInventoryCountItems($input: UpdateInventoryCountItemsInput!) {
  updateInventoryCountItems(input: $input) {
    id
    inventoryCartID {
      id {
        id
        quantityLeft
        version
      }
      location
      completed
    }
    productID {
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
    quantityLeft
    version
  }
}
`;
export const deleteInventoryCountItems = `mutation DeleteInventoryCountItems($input: DeleteInventoryCountItemsInput!) {
  deleteInventoryCountItems(input: $input) {
    id
    inventoryCartID {
      id {
        id
        quantityLeft
        version
      }
      location
      completed
    }
    productID {
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
    quantityLeft
    version
  }
}
`;
