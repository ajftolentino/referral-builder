/**
 * Creates a function that wraps a given value in an object with a `payload` property.
 *
 * @template T - The type of the payload.
 * @returns {(payload: T) => { payload: T }} A function that takes a payload and returns an object containing it.
 */
export const withPayloadType = <T>() => {
  return (payload: T) => ({ payload });
};
