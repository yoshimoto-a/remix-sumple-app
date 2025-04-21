import { Link } from "@remix-run/react";
import { RecipeArticleWithActions } from "~/types/recipes/IndexResponse";
import { formatSteps } from "~/utils/formatSteps";
interface Props {
  recipe: RecipeArticleWithActions;
}

export const RecipeItem: React.FC<Props> = ({ recipe }) => {
  return (
    <div className="py-4 px-3 rounded-md flex flex-col gap-3 bg-light_beige ">
      {recipe.article.imageUrl && (
        <div className="flex  justify-center">
          <img
            alt={recipe.article.title}
            src={recipe.article.imageUrl}
            width={400}
            height={400}
            className="w-full h-44 object-contain"
          />
        </div>
      )}
      <div className="flex justify-between">
        <h3 className="text-xl">{recipe.article.title}</h3>
        <div>{recipe.userName}</div>
      </div>

      <div className="">
        <h3>〇作り方</h3>
        <div className="line-clamp-3">{formatSteps(recipe.article.tips)}</div>
      </div>
      <Link
        to={`/recipes/${recipe.article.id}`}
        className="bg-dark_brown text-white py-2 px-3 rounded-md text-center"
      >
        材料・作り方を見る
      </Link>
    </div>
  );
};
