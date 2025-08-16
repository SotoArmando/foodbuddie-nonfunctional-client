interface InventoryItem {
    progress_of_use: number,
    expiration_date: string,
    purchase_date: string,
    stock_unit: string,
    stock_quantity: number,
    stock_category: number,
}

interface InventoryItemInCulinaryPlan {
    inventory_items: number[],
    culinary_plans: number[]
}