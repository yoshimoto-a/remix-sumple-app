import { ReactNode, ComponentPropsWithRef, forwardRef } from "react";

type Variant = "dark" | "light";

interface Props extends ComponentPropsWithRef<"button"> {
  children?: ReactNode;
  className?: string;
  variant?: Variant;
}

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ children, className, variant = "dark", ...props }, ref) => {
    const color = () => {
      switch (variant) {
        case "dark":
          return "bg-dark_brown text-white hover:bg-white hover:text-dark_brown";
        case "light":
          return "bg-light_beige text-dark_brown hover:bg-dark_brown hover:text-white border-dark_brown";
      }
    };

    return (
      <button
        {...props}
        ref={ref}
        className={`border-solid border-[1px] w-full h-full rounded-lg py-1 ${className} ${color()}`}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
