/**
 * Combines a default style with an optional array of additional styles into a single space-separated string.
 *
 * @param options - An object containing:
 *   - `defaultStyle` (string) - The base style that is always included.
 *   - `styles` (string[] | undefined) - An optional array of additional styles to merge.
 * @returns {string} A concatenated string of styles, ensuring the default style is always present.
 */
export const getStyles = (options: {
  styles?: string[];
  defaultStyle: string;
}): string => {
  const { styles, defaultStyle } = options;
  return styles !== undefined && Array.isArray(styles) && styles.length
    ? `${defaultStyle} ${styles.join(' ')}`
    : defaultStyle;
};
