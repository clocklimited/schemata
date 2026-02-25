export type ValidateFunction = (
  entityObject: any,
  ...args: any[]
) => Promise<any>

export type RecursiveValidateFunction = (
  entityObject: any,
  set?: string,
  tag?: string,
  parent?: any
) => Promise<any>

export interface ISchemata<P extends Properties, T> {
  readonly properties: MutableProperties<P>
  getProperties(): MutableProperties<P>
  getName(): string
  getDescription(): string
  makeDefault(existingEntity?: any): T
  makeBlank(): T
  stripUnknownProperties(
    entityObject: any,
    tag?: string,
    ignoreTagForSubSchemas?: boolean
  ): T
  cast(entityObject: any, tag?: string): T
  validate: ValidateFunction
  validateRecursive: RecursiveValidateFunction
  propertyName(propertyName: string): string
  extend<Q extends Properties>(
    schema: ISchemata<Q, any>
  ): ISchemata<P & Q, SchemataType<P & Q>>
}

export interface Property {
  type?: any
  name?: string
  defaultValue?: any
  tag?: string | string[]
  validators?: any
  [key: string]: any
}

export type MutableProperty<P extends Property> = Omit<P, keyof Property> &
  Property
export type MutableProperties<P extends Properties> = {
  [K in keyof P]: MutableProperty<P[K]>
}
export type SchemataFactory<P extends Properties, T> = (
  entityObject?: any
) => ISchemata<P, T>

export type SchemataType<T extends Record<string, { type?: any }>> = {
  [P in keyof T]?: T[P]['type'] extends { new () }
    ? InstanceType<T[P]['type']>
    : ReturnType<T[P]['type']>
}

export type Properties = { [name: string]: Property }
