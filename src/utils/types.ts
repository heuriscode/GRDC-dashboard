import type { EventType } from '@prisma/client';

export interface ActionCreatorWithoutData<
    ActionType = string,
    ActionData = unknown,
> {
    action: ActionType;
    data?: ActionData;
}

export interface ActionCreator<ActionType = string, ActionData = unknown> {
    action: ActionType;
    data: ActionData;
}

export type EmptyProps = { [key: string]: unknown };

export enum ERROR_TYPE {
    ERROR = 'error',
    CART = 'cart',
    SUCCESS = 'success',
}

export interface ErrorType {
    type: ERROR_TYPE;
    message: string;
}

export interface LoginErrorResponse {
    logout: false;
    message: string;
}

export interface ErrorResponse {
    success: false;
    error: string;
}

export interface SuccessResponse<Data> {
    success: true;
    data: Data;
}

export interface ObjectTypes {
    enabled: boolean;
    id: string;
    identifierName: string;
    name: string;
}

interface EventData {
    id: string;
    type: EventType;
    data: Record<string, unknown>;
}

interface RainEvent extends EventData {
    type: 'RAINFALL';
    rainfall: number;
}
