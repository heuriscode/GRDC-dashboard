import { useEffect, useRef } from 'react';
import isEqual from 'lodash/isEqual';

export function useMemoCompare<Type>(next: Type) {
    // Ref for storing previous value
    const previousRef = useRef<Type>();
    const previous = previousRef.current;
    // Pass previous and next value to compare function
    // to determine whether to consider them equal.
    const equal = isEqual(previous, next);
    // If not equal update previousRef to next value.
    // We only update if not equal so that this hook continues to return
    // the same old value if compare keeps returning true.
    useEffect(() => {
        if (!equal) {
            previousRef.current = next;
        }
    });
    // Finally, if equal then return the previous value
    return equal ? previous : next;
}
