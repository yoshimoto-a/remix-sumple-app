import { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json, Link, useLoaderData } from "@remix-run/react";
import { IndexResponse } from "~/types/recipe/IndexResponse";
import { formatSteps } from "~/utils/formatSteps";
export const meta: MetaFunction = () => {
  return [{ title: "Recipe" }, { name: "description", content: "詳細ページ" }];
};
export const loader = async ({ params }: LoaderFunctionArgs) => {
  const response = await fetch(
    `https://koji-book.vercel.app/api/recipes/${params.id}`
  );
  const recipe: IndexResponse = await response.json();
  return json(recipe, {
    headers: {
      "Cache-Control": "public, max-age=300",
    },
  });
};

export default function Recipe() {
  const recipe = useLoaderData<typeof loader>();
  return (
    <div className="max-w-[765px] mx-auto">
      <h1 className="text-4xl text-center py-10">
        {recipe.recipeArticle.title}
      </h1>
      <div className="pl-20">
        <Link
          to="/recipes"
          className="bg-dark_brown text-white py-2 px-3 rounded-md"
        >
          一覧に戻る
        </Link>
      </div>

      <div className="flex justify-center py-2">
        {recipe.recipeArticle.imageUrl && (
          <img
            alt={recipe.recipeArticle.title}
            src={recipe.recipeArticle.imageUrl}
            width={400}
            height={400}
            className="w-full h-44 object-contain"
          />
        )}
      </div>
      <div className="flex flex-col items-center">
        <div className="flex justify-between items-center pb-2">
          <div className="">
            <h3 className="text-2xl">{recipe.recipeArticle.title}</h3>
            <div className="text-sm">投稿者:{recipe.postedName}</div>
          </div>
          <div className="flex justify-end items-center gap-5"></div>
        </div>
        <div className="flex flex-col gap-3 pb-5">
          <div className="flex justify-start items-center">
            <div className="bg-dark_brown text-white py-1 px-2 rounded-sm inline-block text-sm cursor-pointer">
              {recipe.maltTitle}
            </div>
          </div>

          <div>
            <h3 className="text-xl pb-2">〇材料</h3>
            <div className="whitespace-pre-wrap">
              {recipe.recipeArticle.material}
            </div>
          </div>
          <div>
            <h3 className="text-xl pb-2">〇手順</h3>
            <div className="whitespace-pre-wrap">
              {formatSteps(recipe.recipeArticle.tips)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
