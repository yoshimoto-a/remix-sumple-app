export type RecipeArticleWithActions = {
  article: {
    id: string;
    title: string;
    material: string;
    tips: string;
    likes: number;
    saves: number;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    maltArticleId: string;
    imageUrl?: string;
  };
  malt: string;
  like: boolean;
  save: boolean;
  userName: string;
};
export type IndexResponse = {
  recipeArticles: RecipeArticleWithActions[];
  totalPages: number;
};
