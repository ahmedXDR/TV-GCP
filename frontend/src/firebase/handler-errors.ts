const errorMessages = {
  "auth/invalid-credential":
    "Your email or password is incorrect. Please try again.",
  "auth/email-already-in-use":
    "This email is already associated with an existing account. Please use a different email.",
  "auth/id-token-expired": "Your session has expired. Please log in again.",
  "auth/id-token-revoked":
    "Your session has been revoked. Please log in again.",
  "auth/insufficient-permission":
    "Permission denied. Please check your credentials and try again.",
  "auth/internal-error":
    "Oops! Something unexpected happened on our end. Please report the issue.",
  "auth/invalid-argument":
    "Oops! An invalid argument was provided. Please check your input and try again.",
  "auth/invalid-email":
    "The provided email is not valid. Please enter a valid email address.",
  "auth/user-not-found": "User not found. Please try to signup!",
};

export const getErrorMessage = (code: keyof typeof errorMessages): string => {
  return (
    errorMessages[code] || "Oops! Something went wrong. Please try again later."
  );
};
