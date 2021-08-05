export type SpyObjPropGetter<T, P extends keyof T> = jasmine.Spy<() => T[P]>;

export type SpyObjPropSetter<T, P extends keyof T> = jasmine.Spy<
  (v: T[P]) => void
>;

export type SpyObjPropAccessor<T, P extends keyof T> =
  | SpyObjPropGetter<T, P>
  | SpyObjPropSetter<T, P>;

export function getSpyObjProp<T, P extends keyof T>(
  spy: jasmine.SpyObj<T>,
  propertyName: P,
  accessType?: 'get'
): SpyObjPropGetter<T, P>;
export function getSpyObjProp<T, P extends keyof T>(
  spy: jasmine.SpyObj<T>,
  propertyName: P,
  accessType?: 'set'
): SpyObjPropSetter<T, P>;
export function getSpyObjProp<T, P extends keyof T>(
  spy: jasmine.SpyObj<T>,
  propertyName: P,
  accessType: 'get' | 'set' = 'get'
): SpyObjPropAccessor<T, P> {
  if (!spy) {
    throw new Error('No spy supplied');
  }

  if (!propertyName) {
    throw new Error('No property name supplied');
  }

  const descriptor = Object.getOwnPropertyDescriptor(spy, propertyName);

  if (!descriptor) {
    throw new Error(propertyName + ' does not exist');
  }
  const accessor = descriptor[accessType];

  if (!accessor) {
    throw new Error(propertyName + '.' + accessType + ' does not exist');
  }

  return accessor as SpyObjPropGetter<T, P>;
}
