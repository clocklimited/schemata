export type ValidateFunction = (
  entityObject: any,
  set?: string,
  tag?: string,
  callback?: (error: Error | null, response: any) => void
) => Promise<any>

export type RecursiveValidateFunction = (
  entityObject: any,
  set?: string,
  tag?: string,
  parent?: any
) => Promise<any>

export interface ISchemata<P, T> {
  readonly properties: P
  getProperties(): P
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
  extend<Q extends Properties, U extends SchemataType<Q>>(
    schema: ISchemata<Q, U>
  ): ISchemata<P & Q, T & U>
  (): T
}

export interface Property {
  type?: Number | String | Boolean | Date | Array<any> | Object
  name?: string
  defaultValue?:
    | Number
    | String
    | Boolean
    | Date
    | Array<any>
    | Object
    | Function
  tag?: string | string[]
}

export type SchemataType<T extends Record<string, { type?: any }>> = {
  [P in keyof T]?: ReturnType<T[P]['type']>
}

export type Properties = { [name: string]: Property }
