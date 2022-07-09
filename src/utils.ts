import { getInput } from '@actions/core';

/**
 * Retrieves an input variable
 *
 * This function will attempt to retrieve the specified input variable and
 * return it. If the input variable is empty and a fallback value has been
 * specified, the fallback value is returned. Otherwise, an empty string is
 * returned.
 *
 * @param name name of the input, as declared in action.yaml
 * @param fallback a fallback value to return if the input is empty
 */
export const input = (name: string, fallback?: string): string => {
    const value = getInput(name);
    return value === '' && fallback ? fallback : value;
};



export const makePackageName = (extensionPath: string) => {
    // Read package.json, find the version
    return 'extension.vsix';
}
