export function getPrismaErrorMessage(errorCode: string): string {
    switch (errorCode) {
        case "P2002": // Unique constraint failed
            return "uniqueConstraintFailed";
        case "P2003": // Null constraint failed
            return "nullConstraintFailed";
        case "P2001": // Unique constraint violation
            return "uniqueConstraintViolation";
        case "P2025": // Foreign key constraint failed
            return "foreignKeyConstraintFailed";
        case "P2000": // General error
            return "generalError";
        case "P3000": // Integrity constraint violation
            return "integrityConstraintViolation";
        case "P4000": // Serialization failure
            return "serializationFailure";
        case "P5000": // Timeout
            return "timeout";
        case "28P01": // Connection timeout
            return "connectionTimeout";
        case "28000": // Connection failure
            return "connectionFailure";
        case "42P01": // Undefined table
            return "undefinedTable";
        case "42703": // Undefined column
            return "undefinedColumn";
        case "23505": // Duplicate key value violates unique constraint
            return "duplicateKeyValue";
        case "23503": // Foreign key violation
            return "foreignKeyViolation";
        case "22P02": // Invalid text representation
            return "invalidTextRepresentation";
        case "23502": // Not null violation
            return "notNullViolation";
        case "22001": // String data right truncation
            return "stringDataRightTruncation";
        case "22023": // Numeric value out of range
            return "numericValueOutOfRange";
        default:
            return "unknownError";
    }
}
