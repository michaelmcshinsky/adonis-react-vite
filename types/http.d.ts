import type { VineValidator } from '@vinejs/vine'
import type { Infer, SchemaTypes } from '@vinejs/vine/types'
import type { RequestValidationOptions } from '@adonisjs/core/types'

declare module '@adonisjs/core/http' {
  interface Request {
    validateUsing<
      Schema extends SchemaTypes,
      MetaData extends undefined | Record<string, unknown>,
    >(
      validator: VineValidator<Schema, MetaData>,
      ...args: [undefined] extends MetaData
        ? [options?: RequestValidationOptions<MetaData> | undefined]
        : [options: RequestValidationOptions<MetaData>]
    ): Promise<Infer<Schema>>
  }
}

export {}