import { ReactNode } from "react";
import { Form } from "@remix-run/react";

interface Props {
  children: ReactNode;
  title: string;
  method: "POST" | "PUT" | "DELETE";
}

export const CustomForm: React.FC<Props> = ({ children, title, method }) => {
  return (
    <div className="flex items-center justify-center flex-col h-[calc(100vh-102px)]">
      <h2 className="text-2xl pb-5">{title}</h2>
      <Form method={method} className="mx-2 px-10 py-20 border-2 rounded-lg">
        {children}
      </Form>
    </div>
  );
};
