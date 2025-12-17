import * as React from "react";
import { Loader2 } from "lucide-react";

type ButtonVariant = "default" | "outline" | "ghost";
type ButtonSize = "default" | "sm" | "lg" | "icon";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    isLoading?: boolean;
    children: React.ReactNode;
}

const getVariantClasses = (variant: ButtonVariant) => {
    switch (variant) {
        case "outline":
            return "border border-gray-300 text-gray-700 bg-white hover:bg-gray-50";
        case "ghost":
            return "text-gray-700 hover:bg-gray-100";
        case "default":
        default:
            // This style matches the purple 'Generate article' button
            return "bg-purple-600 text-white hover:bg-purple-700 shadow-md";
    }
};

const getSizeClasses = (size: ButtonSize) => {
    switch (size) {
        case "sm":
            return "h-8 px-3 text-sm";
        case "lg":
            return "h-12 px-8 text-lg";
        case "icon":
            return "h-10 w-10";
        case "default":
        default:
            return "h-10 px-4 py-2 text-sm";
    }
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = "default",
            size = "default",
            isLoading = false,
            children,
            disabled,
            ...props
        },
        ref
    ) => {
        const finalClassName = [
            "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500",
            "disabled:opacity-50 disabled:pointer-events-none",
            getVariantClasses(variant),
            getSizeClasses(size),
            className,
        ].join(" ");

        return (
            <button
                className={finalClassName}
                ref={ref}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                    children
                )}
            </button>
        );
    }
);

Button.displayName = "Button";

export { Button };