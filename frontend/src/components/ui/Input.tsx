import * as React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        const finalClassName = [
            "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800",
            "file:border-0 file:bg-transparent file:text-sm file:font-medium",
            "placeholder:text-gray-400",
            "focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className,
        ].join(" ");

        return (
            <input
                type={type}
                className={finalClassName}
                ref={ref}
                {...props}
            />
        );
    }
);

Input.displayName = "Input";

export { Input };