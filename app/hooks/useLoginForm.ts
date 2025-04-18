import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
export interface LoginForm {
  email: string;
  password: string;
}
export const schema = z.object({
  email: z
    .string()
    .min(1, { message: "メールアドレスは必須です" })
    .email({ message: "無効なメールアドレスです" }),
  password: z.string().min(6, { message: "パスワードは必須(6文字以上)です" }),
});
export const useLoginForm = () => {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return {
    register,
    errors,
    isSubmitting,
  };
};
