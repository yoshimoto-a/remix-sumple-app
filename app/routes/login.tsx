import { CustomForm } from "~/components/CustomForm";
import { Input } from "~/components/Input";
import { Button } from "~/components/Button";
import { schema, useLoginForm } from "~/hooks/useLoginForm";
import { Toaster } from "react-hot-toast";
import { json, Link, useActionData, useNavigate } from "@remix-run/react";
import { supabaseServer } from "~/utils/supabase.server";
import { ActionFunctionArgs } from "@remix-run/node";
import { useEffect } from "react";
type ActionResponse = {
  message: string;
  redirectUrl?: string;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const raw = Object.fromEntries(formData);

  const result = schema.safeParse(raw);
  if (!result.success) {
    return json<ActionResponse>(
      { message: "Invalid form data" },
      { status: 400 }
    );
  }

  const { email, password } = result.data;

  const { error, data } = await supabaseServer.auth.signInWithPassword({
    email,
    password,
  });
  console.log(error, data);
  if (error) {
    return json<ActionResponse>({ message: error.message }, { status: 401 });
  }
  return json<ActionResponse>({
    message: "Login successful",
    redirectUrl: "/recipes",
  });
};

export default function Login() {
  const { register, errors, isSubmitting } = useLoginForm();
  const actionData = useActionData<typeof action>();
  const navigate = useNavigate();

  useEffect(() => {
    if (actionData?.redirectUrl) {
      // ログイン成功後にリダイレクト
      navigate(actionData.redirectUrl);
    }
  }, [actionData, navigate]);
  return (
    <CustomForm title="ログイン" method="POST">
      <Toaster />
      {actionData?.message && <div>{actionData.message}</div>}
      <div className="flex flex-col gap-3">
        <Input
          label="メールアドレス"
          disabled={isSubmitting}
          id="email"
          inputMode="email"
          placeholder="メールアドレス"
          type="email"
          errors={errors.email}
          {...register("email")}
        />
        <Input
          label="パスワード"
          disabled={isSubmitting}
          id="password"
          inputMode="text"
          placeholder="パスワード"
          type="password"
          errors={errors.password}
          {...register("password")}
        />
        <Link to="/forgot_password">パスワードを忘れた方はこちら</Link>
        <div className="mt-4 h-9">
          <Button type="submit">ログイン</Button>
        </div>
      </div>
    </CustomForm>
  );
}
