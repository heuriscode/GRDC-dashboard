import { ErrorResponse, LoginErrorResponse } from './types';

/**
 * Check if response is an error response
 */
export function isErrorResponse(
    data: unknown | undefined,
): data is ErrorResponse {
    return (
        data != null &&
        (data as ErrorResponse).error !== undefined &&
        (data as ErrorResponse).success === false
    );
}

/**
 * Check if response is an error response
 */
export function isLoginErrorResponse(
    data: unknown | undefined,
): data is LoginErrorResponse {
    return data != null && (data as LoginErrorResponse).message !== undefined;
}

/**
 * Typeguard helper to check for null items
 * @param o Item to check for null-ness
 */
export function isNotNull<T>(o?: T | null | void): o is T {
    return o != null;
}

/**
 * Typeguard Function Type
 */
export type TypeGuard<T> = (o?: unknown) => o is T;

/**
 * Typeguard for verifying that an array only contains members matching type
 * @param o Unknown object to verify
 * @param typeguard Typeguard to use to verify the members of the array
 */
export function isArrayOfType<T>(
    o: unknown | undefined,
    typeguard: TypeGuard<T>,
): o is Array<T> {
    return (
        o != null &&
        Array.isArray(o) &&
        o.reduce((prev: boolean, i: unknown) => prev && typeguard(i), true)
    );
}
/**
 * Verify the provided value is a key of the object
 * @param x Value to verify
 * @param obj Object to test if the value is a member of
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function isKeyOfObject<T extends object>(
    x: string | number | symbol,
    obj: T,
): x is keyof T {
    return x in obj;
}

/**
 * Get a array using Object.keys who's typing is narrowed to the keys of the provided object
 * @param obj Object to read the keys from
 */
export function getObjectKeys<T extends { [key: string]: unknown }>(
    obj: T,
): ReadonlyArray<keyof T> {
    return Object.keys(obj);
}

/**
 * String TypeGuard
 */
export function isString(x: unknown): x is string {
    return typeof x === 'string';
}

/**
 * Number TypeGuard
 */
export function isNumber(x: unknown): x is number {
    return typeof x === 'number';
}

/**
 * Boolean TypeGuard
 */
export function isBoolean(x: unknown): x is boolean {
    return typeof x === 'boolean';
}

/**
 * Validates if the test value is null, undefined or of type T
 * @param guard Typeguard to use to validate when the value is not null
 * @param x Value to verify
 */
export function isNullishOrType<T>(
    guard: TypeGuard<T>,
    x: unknown,
): x is T | null | undefined {
    return x == null || guard(x);
}

/**
 * Validates if the test value is null, undefined or of type T
 * @param guard Typeguard to use to validate when the value is not null
 * @param x  Value to verify
 */
export function isTruthyStringValue(x: string | null): boolean {
    switch (x) {
        case 'false':
        case '0':
        case null:
            return false;

        default:
            return true;
    }
}
