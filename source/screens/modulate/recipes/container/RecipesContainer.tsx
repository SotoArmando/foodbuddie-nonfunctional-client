import { useState, useEffect, useMemo } from 'react';

interface Ingrediente {
  Ingredientes: string;
}

interface Paso {
  "Pasos-": string;
}

interface Cuisine {
  Cuisines: string;
}

interface DishType {
  "Dish Types": string;
}

interface Tag {
  Tags: string;
}

export interface Recipe {
  "web-scraper-order": string;
  "web-scraper-start-url": string;
  Title: string;
  Description: string;
  Ingredientes: Ingrediente[];
  "Pasos-": Paso[];
  Cuisines: Cuisine[];
  "Dish Types": DishType[];
  Tags: Tag[];
  Picture: string;
  "Alt Picture-src": string;
}

interface UseRecipesResult {
  recipes: Recipe[] | null;
  loading: boolean;
  error: string | null;
}

export function useRecipes(apiUrl: string): UseRecipesResult {
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecipes() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();

        // Assuming data is an array of recipe objects
        const parsedRecipes: Recipe[] = data.map((recipe: any) => ({
          ...recipe,
          "Picture": recipe.Picture?.length > 0 && `https://tastemade.com${recipe.Picture?.match(/url\(["']?(.*?)["']?\)/)[1]}`,
          "Alt Picture-src": recipe["Alt Picture-src"] && `https://tastemade.com${recipe["Alt Picture-src"]}`, 
          Ingredientes: JSON.parse(recipe.Ingredientes),
          "Pasos-": JSON.parse(recipe["Pasos-"]),
          Cuisines: JSON.parse(recipe.Cuisines),
          "Dish Types": JSON.parse(recipe["Dish Types"]),
          Tags: JSON.parse(recipe.Tags),
        }));
        // console.log(parsedRecipes)
        setRecipes(parsedRecipes);
      } catch (err: any) {
        setError(err.message);
        setRecipes(null);
      } finally {
        setLoading(false);
      }
    }

    fetchRecipes();
  }, [apiUrl]);
  const memo = useMemo(() =>({ recipes, loading, error }), [recipes])
  return memo;
}
