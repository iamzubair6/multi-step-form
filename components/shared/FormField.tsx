import { JSX, ReactNode } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface FormFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  control?: any;
  rightIcon?: ReactNode;
  render?: ({
    field,
    fieldState,
    formState,
  }: {
    field: any;
    fieldState: any;
    formState: any;
  }) => JSX.Element;
}

export default function FormField({
  name,
  label,
  placeholder,
  type = "text",
  control,
  rightIcon,
  render,
}: FormFieldProps) {
  const formContext = useFormContext();
  const controlToUse = control || formContext.control;

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Controller
        name={name}
        control={controlToUse}
        render={
          render
            ? render
            : ({ field, fieldState: { error } }) => (
                <div>
                  <div className="relative">
                    <Input
                      {...field}
                      type={type}
                      id={name}
                      placeholder={placeholder}
                      className={`${error ? "border-red-500" : ""} ${
                        rightIcon ? "pr-10" : ""
                      }`}
                    />
                    {rightIcon && (
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        {rightIcon}
                      </div>
                    )}
                  </div>
                  {error && (
                    <p className="mt-1 text-sm text-red-500">{error.message}</p>
                  )}
                </div>
              )
        }
      />
    </div>
  );
}
