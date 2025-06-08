export interface FormInvalidResponse {
    message: "formInvalid";
    field: Record<string, "require" | "string" | "max150" | "max500">;
}

export interface NotFoundResponse {
    message: "notFound";
}
