export const isStringEmpty = (value?: string, ignoreWhitespaces: boolean = false) => {
    return value === undefined || value === null || value === '' || (ignoreWhitespaces && value.trim() === '');
}