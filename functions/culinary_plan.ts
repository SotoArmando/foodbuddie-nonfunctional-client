import { Recipe } from "./recipe";

interface CulinaryPlan {
    culinary_type: string,
    recipes: Recipe[],
}

export type {
    CulinaryPlan
}