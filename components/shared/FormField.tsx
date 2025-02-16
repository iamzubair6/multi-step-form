import { FieldType, FormFieldConfig } from "@/types/form";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function FormField({ field }: { field: FormFieldConfig }) {
  const { control, watch } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);

  const passwordToggleButton = (
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="focus:outline-none"
    >
      {showPassword ? (
        <EyeOff className="h-4 w-4 text-gray-500" />
      ) : (
        <Eye className="h-4 w-4 text-gray-500" />
      )}
    </button>
  );

  const getPasswordValidation = (fieldType: FieldType) => {
    if (fieldType === "password") {
      return {
        ...field.validation,
        pattern: {
          value:
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          message: "Password must meet all requirements",
        },
      };
    }
    if (fieldType === "confirmPassword" && field.matchWith) {
      return {
        ...field.validation,
        validate: (value: string) => {
          const watchedValue = watch(field.matchWith || "");
          return value === watchedValue || "Passwords do not match";
        },
      };
    }
    return field.validation;
  };

  const renderField = ({ fieldProps, error }: any) => {
    switch (field.type) {
      case "password":
      case "confirmPassword":
        return (
          <div className="relative">
            <Input
              {...fieldProps}
              type={showPassword ? "text" : "password"}
              id={field.name}
              placeholder={field.placeholder}
              className={`${error ? "border-red-500" : ""} pr-10`}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              {passwordToggleButton}
            </div>
          </div>
        );

      case "select":
        return (
          <Select
            onValueChange={fieldProps.onChange}
            defaultValue={fieldProps.value}
          >
            <SelectTrigger className={error ? "border-red-500" : ""}>
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      default:
        return (
          <div className="relative">
            <Input
              {...fieldProps}
              type={field.type}
              id={field.name}
              placeholder={field.placeholder}
              className={`${error ? "border-red-500" : ""} ${
                field.rightIcon ? "pr-10" : ""
              }`}
            />
            {field.rightIcon && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                {field.rightIcon}
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={field.name}>{field.label}</Label>
      <Controller
        name={field.name}
        control={control}
        rules={getPasswordValidation(field.type)}
        render={({ field: fieldProps, fieldState: { error } }) => (
          <div>
            {renderField({ fieldProps, error })}
            {error && (
              <p className="mt-1 text-sm text-red-500">{error.message}</p>
            )}
          </div>
        )}
      />
    </div>
  );
}
