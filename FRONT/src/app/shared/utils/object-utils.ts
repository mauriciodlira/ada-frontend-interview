/**
 * Validates wether an object is logically empty or not based on the following assumptions:
 * - For `number`, if it is `NaN`;
 * - For `string`, if after trimmed, it is an empty string;
 * - For `object`, if it is an empty Array, or the object has no keys defined;
 * - For `boolean`, if it is false;
 * @param obj object to validate emptiness
 * @returns result of the comparison specified above
 */
export function isValueEmpty(obj: unknown): boolean {
    if (obj === null || obj === undefined) {
        return true;
    } else {
        switch (typeof obj) {
            case 'number':
                return isNaN(obj);
            case 'boolean':
                return !obj;
            case 'function':
                return false;
            case 'object':
                if (obj === null)
                    return true;

                if (Array.isArray(obj)) {
                    return obj.length === 0;
                }

                return Object.keys(obj).length === 0;

            case 'string':
                return obj.trim().length === 0;
            default:
                return !!obj;
        }
    }
}
