import { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { IndexResponse } from "~/types/recipes/IndexResponse";
import { RecipeItem } from "~/components/recipes/RecipeItem";
export const meta: MetaFunction = () => {
  return [
    { title: "Recipes" },
    { name: "description", content: "recipes 一覧ページ" },
  ];
};

export const loader = async () => {
  const response = await fetch(
    "https://koji-book.vercel.app/api/recipes?page=0"
  );
  const recipes = await response.json();
  return recipes;
};

export default function Recipes() {
  const recipes: IndexResponse = useLoaderData();
  return (
    <>
      <h1 className="text-4xl text-center py-10">麹帳のレシピ一覧</h1>
      <div className="max-w-md mx-auto flex flex-col gap-5 pb-10">
        {recipes.recipeArticles.map(recipe => (
          <RecipeItem recipe={recipe} key={recipe.article.id} />
        ))}
      </div>
    </>
  );
}
