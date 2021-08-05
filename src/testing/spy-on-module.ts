import { SpyObjPropGetter } from './get-spy-obj-prop';

type FunctionIn<
  TObject,
  TKey extends keyof TObject
> = TObject[TKey] extends Function ? TKey : never;

type SpyFunction<TModule, TKey extends keyof TModule> = jasmine.Spy<
  TModule[TKey] extends jasmine.Func
    ? TModule[TKey]
    : TModule[TKey] extends new (...args: infer TArg) => infer TReturn
    ? (...args: TArg) => TReturn
    : never
>;

export function spyOnModule<TModule, TKey extends keyof TModule>(
  module: TModule,
  propName: TModule[TKey] extends Function ? never : TKey
): SpyObjPropGetter<TModule, TKey>;
export function spyOnModule<TModule, TKey extends keyof TModule>(
  module: TModule,
  funcName: TModule[TKey] extends Function ? TKey : never
): SpyFunction<TModule, TKey>;
export function spyOnModule<TModule, TKey extends keyof TModule>(
  module: TModule,
  key: TKey
): SpyFunction<TModule, TKey> | SpyObjPropGetter<TModule, TKey> {
  const keyValue = module[key];
  let name: string;
  if (typeof key === 'string') {
    name = key;
  } else {
    debugger;
    name = key.toString();
  }

  const descriptor = Object.getOwnPropertyDescriptor(module, name);
  if (descriptor?.writable) {
    debugger;
    const functionName = key as FunctionIn<TModule, TKey>;
    const funcSpy = spyOn(module, functionName);
    return funcSpy;
  } else if (descriptor?.configurable) {
    if (descriptor.set) {
      debugger;
    }
    if (typeof keyValue === 'function') {
      const func: Function = keyValue;
      const spy = jasmine.createSpy(name, func as jasmine.Func);
      spyOnProperty(module, key).and.returnValue(spy);
      return spy as SpyFunction<TModule, TKey>;
    } else {
      const spy = spyOnProperty(module, key);

      return spy as SpyObjPropGetter<TModule, TKey>;
    }
  } else {
    debugger;
    throw new Error('descriptor not writable or configurable');
  }
}
