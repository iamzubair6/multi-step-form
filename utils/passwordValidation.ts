export const passwordRules = [
  { id: 1, rule: "At least 8 characters" },
  { id: 2, rule: "Contains uppercase letter" },
  { id: 3, rule: "Contains lowercase letter" },
  { id: 4, rule: "Contains number" },
  { id: 5, rule: "Contains special character" },
] as const;

export const validatePasswordRule = (password: string, rule: string) => {
  switch (rule) {
    case "At least 8 characters":
      return password.length >= 8;
    case "Contains uppercase letter":
      return /[A-Z]/.test(password);
    case "Contains lowercase letter":
      return /[a-z]/.test(password);
    case "Contains number":
      return /[0-9]/.test(password);
    case "Contains special character":
      return /[^A-Za-z0-9]/.test(password);
    default:
      return false;
  }
};
