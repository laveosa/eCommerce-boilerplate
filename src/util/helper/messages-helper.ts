import type { ApiErrorMessageModel } from "#src/const/model/ErrorMessageModel.js";

export function getErrorMessage(
  error: unknown,
  defaultMessage?: string,
): string {
  if (typeof error === "object") {
    return (error as ApiErrorMessageModel).message;
  } else if (typeof error === "string" && error && error.length > 0) {
    return error as string;
  } else {
    return defaultMessage && defaultMessage.length > 0
      ? defaultMessage
      : "no error message!";
  }
}

export function getErrorModel(
  state: number,
  message: unknown,
  defaultMessage?: string,
): ApiErrorMessageModel {
  return {
    message: getErrorMessage(message, defaultMessage),
    status: state || 500,
  };
}

export function isApiError(error: unknown): error is ApiErrorMessageModel {
  return (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    "message" in error &&
    typeof (error as ApiErrorMessageModel).status === "number"
  );
}
