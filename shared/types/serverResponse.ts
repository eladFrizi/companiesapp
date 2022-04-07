export interface ServerResponse <Data, ErrorType>{
    success: boolean,
    data?: Data,
    errorType?: ErrorType
}

export enum ErrorTypes {
    NotFound = 'notFound'
}