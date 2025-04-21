export type User = {
  id: string;
  supabaseUserId: string;
  name: string;
  role: "MEMBER" | "ADMIN"; // 必要に応じて追加
  createdAt: string;
  updatedAt: string;
};

export type MaltArticle = {
  id: string;
  status: "PUBLIC" | "PRIVATE";
  maltRole: "MAIN" | "SUB";
  title: string;
  temperature: number;
  time: number;
  material: string;
  tips: string;
  likes: number;
  saves: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
  imageUrl: string;
  mainMaltArticleId: string;
};

export type RecipeComment = {
  id: string;
  content: string;
  createdDate: string;
  userName: string;
  userId: string;
  parentComment?: RecipeComment;
};

export type RecipeArticle = {
  id: string;
  status: "PUBLIC" | "PRIVATE";
  title: string;
  material: string;
  tips: string;
  likes: number;
  saves: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
  maltArticleId: string;
  imageUrl: string;
  maltArticle: MaltArticle;
  user: User;
  recipeComment: RecipeComment[];
};

export type IndexResponse = {
  recipeArticle: RecipeArticle;
  maltTitle: string;
  postedName: string;
  comments: RecipeComment[];
  liked: boolean;
  saved: boolean;
};
