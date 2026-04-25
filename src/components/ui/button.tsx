import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-base font-medium ring-offset-background transition-[background-color,opacity,border-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-[#1D9E75] text-white hover:bg-[#1a8f68] shadow-sm",
        destructive: "bg-destructive text-destructive-foreground hover:opacity-90",
        outline:
          "border border-[#E8E7E0] bg-background text-[#2C2C2A] hover:bg-[#F8F8F6]",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-[#F0EFEA] hover:text-[#2C2C2A]",
        link: "text-[#1D9E75] underline-offset-4 hover:underline",
        mega: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md text-xl font-medium rounded-xl",
        safe: "bg-safe text-safe-foreground hover:bg-safe/90 shadow-sm",
      },
      size: {
        default: "min-h-[3rem] px-6 py-3",
        sm: "min-h-[2.5rem] rounded-md px-4 text-sm",
        lg: "min-h-[3.5rem] px-8 text-lg",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
