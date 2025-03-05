/**
 * Validates a user's email address.
 * @param email
 * @returns a boolean indicating a valid or invalid email address pattern.
 */
export const isValidEmail = (email: string | null | undefined) => {
  // Null or empty check
  if (!email?.trim()) {
    return false;
  }

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return false;
  }

  // Sanitization: Check for malicious content like scripts
  if (/<script>/.test(email) || /javascript:/i.test(email)) {
    return false;
  }

  return true;
};

/**
 * Validates a phone number format based on international standards.
 *
 * - Supports E.164 format (e.g., +1234567890)
 * - Allows optional country codes
 * - Accepts numbers with spaces, dashes, and parentheses
 * - Works for international numbers
 *
 * @param phone - The phone number string to validate.
 * @returns `true` if the phone number is valid, `false` otherwise.
 */
export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex =
    /^(\+?\d{1,3}[-.\s]?)?(\(?\d{1,4}\)?[-.\s]?)?[\d\s.-]{5,15}$/;

  return phoneRegex.test(phone.trim());
};
