import './polyfills';

/**
 * Patches the function `Object.defineProperty` so that Webpack modules are configurable and writable.
 * @param define Original `defineProperty` function.
 */
(function patchWritableModules(define: typeof Object.defineProperty): void {
  Object.defineProperty = <T>(
    object: T,
    p: PropertyKey,
    attributes: PropertyDescriptor & ThisType<T>
  ) => {
    if (
      attributes.hasOwnProperty('value') ||
      attributes.hasOwnProperty('writable')
    ) {
      attributes.writable = true;
    }
    attributes.configurable = true;

    return define(object, p, attributes);
  };
})(Object.defineProperty);
