export interface ReturnErrorType {
    response: {
        message: string;
        field?: any;
    };
    status: {status: number};
}
