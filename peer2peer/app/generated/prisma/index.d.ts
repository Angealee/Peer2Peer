
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Section
 * 
 */
export type Section = $Result.DefaultSelection<Prisma.$SectionPayload>
/**
 * Model Student
 * 
 */
export type Student = $Result.DefaultSelection<Prisma.$StudentPayload>
/**
 * Model Evaluation
 * 
 */
export type Evaluation = $Result.DefaultSelection<Prisma.$EvaluationPayload>
/**
 * Model EvaluationCriteria
 * 
 */
export type EvaluationCriteria = $Result.DefaultSelection<Prisma.$EvaluationCriteriaPayload>
/**
 * Model EvaluationResponse
 * 
 */
export type EvaluationResponse = $Result.DefaultSelection<Prisma.$EvaluationResponsePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.section`: Exposes CRUD operations for the **Section** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sections
    * const sections = await prisma.section.findMany()
    * ```
    */
  get section(): Prisma.SectionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.student`: Exposes CRUD operations for the **Student** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Students
    * const students = await prisma.student.findMany()
    * ```
    */
  get student(): Prisma.StudentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.evaluation`: Exposes CRUD operations for the **Evaluation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Evaluations
    * const evaluations = await prisma.evaluation.findMany()
    * ```
    */
  get evaluation(): Prisma.EvaluationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.evaluationCriteria`: Exposes CRUD operations for the **EvaluationCriteria** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EvaluationCriteria
    * const evaluationCriteria = await prisma.evaluationCriteria.findMany()
    * ```
    */
  get evaluationCriteria(): Prisma.EvaluationCriteriaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.evaluationResponse`: Exposes CRUD operations for the **EvaluationResponse** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EvaluationResponses
    * const evaluationResponses = await prisma.evaluationResponse.findMany()
    * ```
    */
  get evaluationResponse(): Prisma.EvaluationResponseDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.4.2
   * Query Engine version: 94a226be1cf2967af2541cca5529f0f7ba866919
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Section: 'Section',
    Student: 'Student',
    Evaluation: 'Evaluation',
    EvaluationCriteria: 'EvaluationCriteria',
    EvaluationResponse: 'EvaluationResponse'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "section" | "student" | "evaluation" | "evaluationCriteria" | "evaluationResponse"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Section: {
        payload: Prisma.$SectionPayload<ExtArgs>
        fields: Prisma.SectionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SectionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SectionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload>
          }
          findFirst: {
            args: Prisma.SectionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SectionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload>
          }
          findMany: {
            args: Prisma.SectionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload>[]
          }
          create: {
            args: Prisma.SectionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload>
          }
          createMany: {
            args: Prisma.SectionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SectionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload>
          }
          update: {
            args: Prisma.SectionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload>
          }
          deleteMany: {
            args: Prisma.SectionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SectionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SectionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SectionPayload>
          }
          aggregate: {
            args: Prisma.SectionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSection>
          }
          groupBy: {
            args: Prisma.SectionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SectionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SectionCountArgs<ExtArgs>
            result: $Utils.Optional<SectionCountAggregateOutputType> | number
          }
        }
      }
      Student: {
        payload: Prisma.$StudentPayload<ExtArgs>
        fields: Prisma.StudentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StudentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StudentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          findFirst: {
            args: Prisma.StudentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StudentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          findMany: {
            args: Prisma.StudentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>[]
          }
          create: {
            args: Prisma.StudentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          createMany: {
            args: Prisma.StudentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.StudentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          update: {
            args: Prisma.StudentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          deleteMany: {
            args: Prisma.StudentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StudentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.StudentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          aggregate: {
            args: Prisma.StudentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStudent>
          }
          groupBy: {
            args: Prisma.StudentGroupByArgs<ExtArgs>
            result: $Utils.Optional<StudentGroupByOutputType>[]
          }
          count: {
            args: Prisma.StudentCountArgs<ExtArgs>
            result: $Utils.Optional<StudentCountAggregateOutputType> | number
          }
        }
      }
      Evaluation: {
        payload: Prisma.$EvaluationPayload<ExtArgs>
        fields: Prisma.EvaluationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EvaluationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EvaluationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationPayload>
          }
          findFirst: {
            args: Prisma.EvaluationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EvaluationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationPayload>
          }
          findMany: {
            args: Prisma.EvaluationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationPayload>[]
          }
          create: {
            args: Prisma.EvaluationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationPayload>
          }
          createMany: {
            args: Prisma.EvaluationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.EvaluationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationPayload>
          }
          update: {
            args: Prisma.EvaluationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationPayload>
          }
          deleteMany: {
            args: Prisma.EvaluationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EvaluationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EvaluationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationPayload>
          }
          aggregate: {
            args: Prisma.EvaluationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEvaluation>
          }
          groupBy: {
            args: Prisma.EvaluationGroupByArgs<ExtArgs>
            result: $Utils.Optional<EvaluationGroupByOutputType>[]
          }
          count: {
            args: Prisma.EvaluationCountArgs<ExtArgs>
            result: $Utils.Optional<EvaluationCountAggregateOutputType> | number
          }
        }
      }
      EvaluationCriteria: {
        payload: Prisma.$EvaluationCriteriaPayload<ExtArgs>
        fields: Prisma.EvaluationCriteriaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EvaluationCriteriaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationCriteriaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EvaluationCriteriaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationCriteriaPayload>
          }
          findFirst: {
            args: Prisma.EvaluationCriteriaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationCriteriaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EvaluationCriteriaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationCriteriaPayload>
          }
          findMany: {
            args: Prisma.EvaluationCriteriaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationCriteriaPayload>[]
          }
          create: {
            args: Prisma.EvaluationCriteriaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationCriteriaPayload>
          }
          createMany: {
            args: Prisma.EvaluationCriteriaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.EvaluationCriteriaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationCriteriaPayload>
          }
          update: {
            args: Prisma.EvaluationCriteriaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationCriteriaPayload>
          }
          deleteMany: {
            args: Prisma.EvaluationCriteriaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EvaluationCriteriaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EvaluationCriteriaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationCriteriaPayload>
          }
          aggregate: {
            args: Prisma.EvaluationCriteriaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEvaluationCriteria>
          }
          groupBy: {
            args: Prisma.EvaluationCriteriaGroupByArgs<ExtArgs>
            result: $Utils.Optional<EvaluationCriteriaGroupByOutputType>[]
          }
          count: {
            args: Prisma.EvaluationCriteriaCountArgs<ExtArgs>
            result: $Utils.Optional<EvaluationCriteriaCountAggregateOutputType> | number
          }
        }
      }
      EvaluationResponse: {
        payload: Prisma.$EvaluationResponsePayload<ExtArgs>
        fields: Prisma.EvaluationResponseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EvaluationResponseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationResponsePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EvaluationResponseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationResponsePayload>
          }
          findFirst: {
            args: Prisma.EvaluationResponseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationResponsePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EvaluationResponseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationResponsePayload>
          }
          findMany: {
            args: Prisma.EvaluationResponseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationResponsePayload>[]
          }
          create: {
            args: Prisma.EvaluationResponseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationResponsePayload>
          }
          createMany: {
            args: Prisma.EvaluationResponseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.EvaluationResponseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationResponsePayload>
          }
          update: {
            args: Prisma.EvaluationResponseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationResponsePayload>
          }
          deleteMany: {
            args: Prisma.EvaluationResponseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EvaluationResponseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EvaluationResponseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EvaluationResponsePayload>
          }
          aggregate: {
            args: Prisma.EvaluationResponseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEvaluationResponse>
          }
          groupBy: {
            args: Prisma.EvaluationResponseGroupByArgs<ExtArgs>
            result: $Utils.Optional<EvaluationResponseGroupByOutputType>[]
          }
          count: {
            args: Prisma.EvaluationResponseCountArgs<ExtArgs>
            result: $Utils.Optional<EvaluationResponseCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    section?: SectionOmit
    student?: StudentOmit
    evaluation?: EvaluationOmit
    evaluationCriteria?: EvaluationCriteriaOmit
    evaluationResponse?: EvaluationResponseOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    sections: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sections?: boolean | UserCountOutputTypeCountSectionsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SectionWhereInput
  }


  /**
   * Count Type SectionCountOutputType
   */

  export type SectionCountOutputType = {
    students: number
    evaluations: number
  }

  export type SectionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    students?: boolean | SectionCountOutputTypeCountStudentsArgs
    evaluations?: boolean | SectionCountOutputTypeCountEvaluationsArgs
  }

  // Custom InputTypes
  /**
   * SectionCountOutputType without action
   */
  export type SectionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SectionCountOutputType
     */
    select?: SectionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SectionCountOutputType without action
   */
  export type SectionCountOutputTypeCountStudentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentWhereInput
  }

  /**
   * SectionCountOutputType without action
   */
  export type SectionCountOutputTypeCountEvaluationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EvaluationWhereInput
  }


  /**
   * Count Type StudentCountOutputType
   */

  export type StudentCountOutputType = {
    evaluationsGiven: number
    evaluationsReceived: number
  }

  export type StudentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    evaluationsGiven?: boolean | StudentCountOutputTypeCountEvaluationsGivenArgs
    evaluationsReceived?: boolean | StudentCountOutputTypeCountEvaluationsReceivedArgs
  }

  // Custom InputTypes
  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentCountOutputType
     */
    select?: StudentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeCountEvaluationsGivenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EvaluationResponseWhereInput
  }

  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeCountEvaluationsReceivedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EvaluationResponseWhereInput
  }


  /**
   * Count Type EvaluationCountOutputType
   */

  export type EvaluationCountOutputType = {
    criteria: number
    responses: number
  }

  export type EvaluationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    criteria?: boolean | EvaluationCountOutputTypeCountCriteriaArgs
    responses?: boolean | EvaluationCountOutputTypeCountResponsesArgs
  }

  // Custom InputTypes
  /**
   * EvaluationCountOutputType without action
   */
  export type EvaluationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationCountOutputType
     */
    select?: EvaluationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EvaluationCountOutputType without action
   */
  export type EvaluationCountOutputTypeCountCriteriaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EvaluationCriteriaWhereInput
  }

  /**
   * EvaluationCountOutputType without action
   */
  export type EvaluationCountOutputTypeCountResponsesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EvaluationResponseWhereInput
  }


  /**
   * Count Type EvaluationCriteriaCountOutputType
   */

  export type EvaluationCriteriaCountOutputType = {
    responses: number
  }

  export type EvaluationCriteriaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    responses?: boolean | EvaluationCriteriaCountOutputTypeCountResponsesArgs
  }

  // Custom InputTypes
  /**
   * EvaluationCriteriaCountOutputType without action
   */
  export type EvaluationCriteriaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationCriteriaCountOutputType
     */
    select?: EvaluationCriteriaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EvaluationCriteriaCountOutputType without action
   */
  export type EvaluationCriteriaCountOutputTypeCountResponsesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EvaluationResponseWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    password: string | null
    role: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    password: string | null
    role: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    password: number
    role: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    role?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    name: string
    email: string
    password: string
    role: string
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
    sections?: boolean | User$sectionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    role?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "password" | "role", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sections?: boolean | User$sectionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      sections: Prisma.$SectionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      email: string
      password: string
      role: string
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sections<T extends User$sectionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sectionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.sections
   */
  export type User$sectionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    where?: SectionWhereInput
    orderBy?: SectionOrderByWithRelationInput | SectionOrderByWithRelationInput[]
    cursor?: SectionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SectionScalarFieldEnum | SectionScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Section
   */

  export type AggregateSection = {
    _count: SectionCountAggregateOutputType | null
    _avg: SectionAvgAggregateOutputType | null
    _sum: SectionSumAggregateOutputType | null
    _min: SectionMinAggregateOutputType | null
    _max: SectionMaxAggregateOutputType | null
  }

  export type SectionAvgAggregateOutputType = {
    id: number | null
    createdBy: number | null
  }

  export type SectionSumAggregateOutputType = {
    id: number | null
    createdBy: number | null
  }

  export type SectionMinAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    createdBy: number | null
    createdAt: Date | null
  }

  export type SectionMaxAggregateOutputType = {
    id: number | null
    name: string | null
    description: string | null
    createdBy: number | null
    createdAt: Date | null
  }

  export type SectionCountAggregateOutputType = {
    id: number
    name: number
    description: number
    createdBy: number
    createdAt: number
    _all: number
  }


  export type SectionAvgAggregateInputType = {
    id?: true
    createdBy?: true
  }

  export type SectionSumAggregateInputType = {
    id?: true
    createdBy?: true
  }

  export type SectionMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    createdBy?: true
    createdAt?: true
  }

  export type SectionMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    createdBy?: true
    createdAt?: true
  }

  export type SectionCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    createdBy?: true
    createdAt?: true
    _all?: true
  }

  export type SectionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Section to aggregate.
     */
    where?: SectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sections to fetch.
     */
    orderBy?: SectionOrderByWithRelationInput | SectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sections
    **/
    _count?: true | SectionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SectionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SectionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SectionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SectionMaxAggregateInputType
  }

  export type GetSectionAggregateType<T extends SectionAggregateArgs> = {
        [P in keyof T & keyof AggregateSection]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSection[P]>
      : GetScalarType<T[P], AggregateSection[P]>
  }




  export type SectionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SectionWhereInput
    orderBy?: SectionOrderByWithAggregationInput | SectionOrderByWithAggregationInput[]
    by: SectionScalarFieldEnum[] | SectionScalarFieldEnum
    having?: SectionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SectionCountAggregateInputType | true
    _avg?: SectionAvgAggregateInputType
    _sum?: SectionSumAggregateInputType
    _min?: SectionMinAggregateInputType
    _max?: SectionMaxAggregateInputType
  }

  export type SectionGroupByOutputType = {
    id: number
    name: string
    description: string | null
    createdBy: number
    createdAt: Date
    _count: SectionCountAggregateOutputType | null
    _avg: SectionAvgAggregateOutputType | null
    _sum: SectionSumAggregateOutputType | null
    _min: SectionMinAggregateOutputType | null
    _max: SectionMaxAggregateOutputType | null
  }

  type GetSectionGroupByPayload<T extends SectionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SectionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SectionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SectionGroupByOutputType[P]>
            : GetScalarType<T[P], SectionGroupByOutputType[P]>
        }
      >
    >


  export type SectionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    createdBy?: boolean
    createdAt?: boolean
    instructor?: boolean | UserDefaultArgs<ExtArgs>
    students?: boolean | Section$studentsArgs<ExtArgs>
    evaluations?: boolean | Section$evaluationsArgs<ExtArgs>
    _count?: boolean | SectionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["section"]>



  export type SectionSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    createdBy?: boolean
    createdAt?: boolean
  }

  export type SectionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "createdBy" | "createdAt", ExtArgs["result"]["section"]>
  export type SectionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    instructor?: boolean | UserDefaultArgs<ExtArgs>
    students?: boolean | Section$studentsArgs<ExtArgs>
    evaluations?: boolean | Section$evaluationsArgs<ExtArgs>
    _count?: boolean | SectionCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $SectionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Section"
    objects: {
      instructor: Prisma.$UserPayload<ExtArgs>
      students: Prisma.$StudentPayload<ExtArgs>[]
      evaluations: Prisma.$EvaluationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      description: string | null
      createdBy: number
      createdAt: Date
    }, ExtArgs["result"]["section"]>
    composites: {}
  }

  type SectionGetPayload<S extends boolean | null | undefined | SectionDefaultArgs> = $Result.GetResult<Prisma.$SectionPayload, S>

  type SectionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SectionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SectionCountAggregateInputType | true
    }

  export interface SectionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Section'], meta: { name: 'Section' } }
    /**
     * Find zero or one Section that matches the filter.
     * @param {SectionFindUniqueArgs} args - Arguments to find a Section
     * @example
     * // Get one Section
     * const section = await prisma.section.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SectionFindUniqueArgs>(args: SelectSubset<T, SectionFindUniqueArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Section that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SectionFindUniqueOrThrowArgs} args - Arguments to find a Section
     * @example
     * // Get one Section
     * const section = await prisma.section.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SectionFindUniqueOrThrowArgs>(args: SelectSubset<T, SectionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Section that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectionFindFirstArgs} args - Arguments to find a Section
     * @example
     * // Get one Section
     * const section = await prisma.section.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SectionFindFirstArgs>(args?: SelectSubset<T, SectionFindFirstArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Section that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectionFindFirstOrThrowArgs} args - Arguments to find a Section
     * @example
     * // Get one Section
     * const section = await prisma.section.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SectionFindFirstOrThrowArgs>(args?: SelectSubset<T, SectionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sections that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sections
     * const sections = await prisma.section.findMany()
     * 
     * // Get first 10 Sections
     * const sections = await prisma.section.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sectionWithIdOnly = await prisma.section.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SectionFindManyArgs>(args?: SelectSubset<T, SectionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Section.
     * @param {SectionCreateArgs} args - Arguments to create a Section.
     * @example
     * // Create one Section
     * const Section = await prisma.section.create({
     *   data: {
     *     // ... data to create a Section
     *   }
     * })
     * 
     */
    create<T extends SectionCreateArgs>(args: SelectSubset<T, SectionCreateArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sections.
     * @param {SectionCreateManyArgs} args - Arguments to create many Sections.
     * @example
     * // Create many Sections
     * const section = await prisma.section.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SectionCreateManyArgs>(args?: SelectSubset<T, SectionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Section.
     * @param {SectionDeleteArgs} args - Arguments to delete one Section.
     * @example
     * // Delete one Section
     * const Section = await prisma.section.delete({
     *   where: {
     *     // ... filter to delete one Section
     *   }
     * })
     * 
     */
    delete<T extends SectionDeleteArgs>(args: SelectSubset<T, SectionDeleteArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Section.
     * @param {SectionUpdateArgs} args - Arguments to update one Section.
     * @example
     * // Update one Section
     * const section = await prisma.section.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SectionUpdateArgs>(args: SelectSubset<T, SectionUpdateArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sections.
     * @param {SectionDeleteManyArgs} args - Arguments to filter Sections to delete.
     * @example
     * // Delete a few Sections
     * const { count } = await prisma.section.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SectionDeleteManyArgs>(args?: SelectSubset<T, SectionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sections
     * const section = await prisma.section.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SectionUpdateManyArgs>(args: SelectSubset<T, SectionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Section.
     * @param {SectionUpsertArgs} args - Arguments to update or create a Section.
     * @example
     * // Update or create a Section
     * const section = await prisma.section.upsert({
     *   create: {
     *     // ... data to create a Section
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Section we want to update
     *   }
     * })
     */
    upsert<T extends SectionUpsertArgs>(args: SelectSubset<T, SectionUpsertArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectionCountArgs} args - Arguments to filter Sections to count.
     * @example
     * // Count the number of Sections
     * const count = await prisma.section.count({
     *   where: {
     *     // ... the filter for the Sections we want to count
     *   }
     * })
    **/
    count<T extends SectionCountArgs>(
      args?: Subset<T, SectionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SectionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Section.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SectionAggregateArgs>(args: Subset<T, SectionAggregateArgs>): Prisma.PrismaPromise<GetSectionAggregateType<T>>

    /**
     * Group by Section.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SectionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SectionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SectionGroupByArgs['orderBy'] }
        : { orderBy?: SectionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SectionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSectionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Section model
   */
  readonly fields: SectionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Section.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SectionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    instructor<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    students<T extends Section$studentsArgs<ExtArgs> = {}>(args?: Subset<T, Section$studentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    evaluations<T extends Section$evaluationsArgs<ExtArgs> = {}>(args?: Subset<T, Section$evaluationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EvaluationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Section model
   */
  interface SectionFieldRefs {
    readonly id: FieldRef<"Section", 'Int'>
    readonly name: FieldRef<"Section", 'String'>
    readonly description: FieldRef<"Section", 'String'>
    readonly createdBy: FieldRef<"Section", 'Int'>
    readonly createdAt: FieldRef<"Section", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Section findUnique
   */
  export type SectionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    /**
     * Filter, which Section to fetch.
     */
    where: SectionWhereUniqueInput
  }

  /**
   * Section findUniqueOrThrow
   */
  export type SectionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    /**
     * Filter, which Section to fetch.
     */
    where: SectionWhereUniqueInput
  }

  /**
   * Section findFirst
   */
  export type SectionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    /**
     * Filter, which Section to fetch.
     */
    where?: SectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sections to fetch.
     */
    orderBy?: SectionOrderByWithRelationInput | SectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sections.
     */
    cursor?: SectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sections.
     */
    distinct?: SectionScalarFieldEnum | SectionScalarFieldEnum[]
  }

  /**
   * Section findFirstOrThrow
   */
  export type SectionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    /**
     * Filter, which Section to fetch.
     */
    where?: SectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sections to fetch.
     */
    orderBy?: SectionOrderByWithRelationInput | SectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sections.
     */
    cursor?: SectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sections.
     */
    distinct?: SectionScalarFieldEnum | SectionScalarFieldEnum[]
  }

  /**
   * Section findMany
   */
  export type SectionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    /**
     * Filter, which Sections to fetch.
     */
    where?: SectionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sections to fetch.
     */
    orderBy?: SectionOrderByWithRelationInput | SectionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sections.
     */
    cursor?: SectionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sections.
     */
    skip?: number
    distinct?: SectionScalarFieldEnum | SectionScalarFieldEnum[]
  }

  /**
   * Section create
   */
  export type SectionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    /**
     * The data needed to create a Section.
     */
    data: XOR<SectionCreateInput, SectionUncheckedCreateInput>
  }

  /**
   * Section createMany
   */
  export type SectionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sections.
     */
    data: SectionCreateManyInput | SectionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Section update
   */
  export type SectionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    /**
     * The data needed to update a Section.
     */
    data: XOR<SectionUpdateInput, SectionUncheckedUpdateInput>
    /**
     * Choose, which Section to update.
     */
    where: SectionWhereUniqueInput
  }

  /**
   * Section updateMany
   */
  export type SectionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sections.
     */
    data: XOR<SectionUpdateManyMutationInput, SectionUncheckedUpdateManyInput>
    /**
     * Filter which Sections to update
     */
    where?: SectionWhereInput
    /**
     * Limit how many Sections to update.
     */
    limit?: number
  }

  /**
   * Section upsert
   */
  export type SectionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    /**
     * The filter to search for the Section to update in case it exists.
     */
    where: SectionWhereUniqueInput
    /**
     * In case the Section found by the `where` argument doesn't exist, create a new Section with this data.
     */
    create: XOR<SectionCreateInput, SectionUncheckedCreateInput>
    /**
     * In case the Section was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SectionUpdateInput, SectionUncheckedUpdateInput>
  }

  /**
   * Section delete
   */
  export type SectionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
    /**
     * Filter which Section to delete.
     */
    where: SectionWhereUniqueInput
  }

  /**
   * Section deleteMany
   */
  export type SectionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sections to delete
     */
    where?: SectionWhereInput
    /**
     * Limit how many Sections to delete.
     */
    limit?: number
  }

  /**
   * Section.students
   */
  export type Section$studentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    where?: StudentWhereInput
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    cursor?: StudentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Section.evaluations
   */
  export type Section$evaluationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluation
     */
    select?: EvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluation
     */
    omit?: EvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationInclude<ExtArgs> | null
    where?: EvaluationWhereInput
    orderBy?: EvaluationOrderByWithRelationInput | EvaluationOrderByWithRelationInput[]
    cursor?: EvaluationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EvaluationScalarFieldEnum | EvaluationScalarFieldEnum[]
  }

  /**
   * Section without action
   */
  export type SectionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Section
     */
    select?: SectionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Section
     */
    omit?: SectionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SectionInclude<ExtArgs> | null
  }


  /**
   * Model Student
   */

  export type AggregateStudent = {
    _count: StudentCountAggregateOutputType | null
    _avg: StudentAvgAggregateOutputType | null
    _sum: StudentSumAggregateOutputType | null
    _min: StudentMinAggregateOutputType | null
    _max: StudentMaxAggregateOutputType | null
  }

  export type StudentAvgAggregateOutputType = {
    id: number | null
    sectionId: number | null
  }

  export type StudentSumAggregateOutputType = {
    id: number | null
    sectionId: number | null
  }

  export type StudentMinAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    studentId: string | null
    sectionId: number | null
  }

  export type StudentMaxAggregateOutputType = {
    id: number | null
    name: string | null
    email: string | null
    studentId: string | null
    sectionId: number | null
  }

  export type StudentCountAggregateOutputType = {
    id: number
    name: number
    email: number
    studentId: number
    sectionId: number
    _all: number
  }


  export type StudentAvgAggregateInputType = {
    id?: true
    sectionId?: true
  }

  export type StudentSumAggregateInputType = {
    id?: true
    sectionId?: true
  }

  export type StudentMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    studentId?: true
    sectionId?: true
  }

  export type StudentMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    studentId?: true
    sectionId?: true
  }

  export type StudentCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    studentId?: true
    sectionId?: true
    _all?: true
  }

  export type StudentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Student to aggregate.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Students
    **/
    _count?: true | StudentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StudentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StudentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StudentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StudentMaxAggregateInputType
  }

  export type GetStudentAggregateType<T extends StudentAggregateArgs> = {
        [P in keyof T & keyof AggregateStudent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStudent[P]>
      : GetScalarType<T[P], AggregateStudent[P]>
  }




  export type StudentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentWhereInput
    orderBy?: StudentOrderByWithAggregationInput | StudentOrderByWithAggregationInput[]
    by: StudentScalarFieldEnum[] | StudentScalarFieldEnum
    having?: StudentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StudentCountAggregateInputType | true
    _avg?: StudentAvgAggregateInputType
    _sum?: StudentSumAggregateInputType
    _min?: StudentMinAggregateInputType
    _max?: StudentMaxAggregateInputType
  }

  export type StudentGroupByOutputType = {
    id: number
    name: string
    email: string
    studentId: string
    sectionId: number
    _count: StudentCountAggregateOutputType | null
    _avg: StudentAvgAggregateOutputType | null
    _sum: StudentSumAggregateOutputType | null
    _min: StudentMinAggregateOutputType | null
    _max: StudentMaxAggregateOutputType | null
  }

  type GetStudentGroupByPayload<T extends StudentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StudentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StudentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StudentGroupByOutputType[P]>
            : GetScalarType<T[P], StudentGroupByOutputType[P]>
        }
      >
    >


  export type StudentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    studentId?: boolean
    sectionId?: boolean
    section?: boolean | SectionDefaultArgs<ExtArgs>
    evaluationsGiven?: boolean | Student$evaluationsGivenArgs<ExtArgs>
    evaluationsReceived?: boolean | Student$evaluationsReceivedArgs<ExtArgs>
    _count?: boolean | StudentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["student"]>



  export type StudentSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    studentId?: boolean
    sectionId?: boolean
  }

  export type StudentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "studentId" | "sectionId", ExtArgs["result"]["student"]>
  export type StudentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    section?: boolean | SectionDefaultArgs<ExtArgs>
    evaluationsGiven?: boolean | Student$evaluationsGivenArgs<ExtArgs>
    evaluationsReceived?: boolean | Student$evaluationsReceivedArgs<ExtArgs>
    _count?: boolean | StudentCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $StudentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Student"
    objects: {
      section: Prisma.$SectionPayload<ExtArgs>
      evaluationsGiven: Prisma.$EvaluationResponsePayload<ExtArgs>[]
      evaluationsReceived: Prisma.$EvaluationResponsePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      email: string
      studentId: string
      sectionId: number
    }, ExtArgs["result"]["student"]>
    composites: {}
  }

  type StudentGetPayload<S extends boolean | null | undefined | StudentDefaultArgs> = $Result.GetResult<Prisma.$StudentPayload, S>

  type StudentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StudentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StudentCountAggregateInputType | true
    }

  export interface StudentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Student'], meta: { name: 'Student' } }
    /**
     * Find zero or one Student that matches the filter.
     * @param {StudentFindUniqueArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StudentFindUniqueArgs>(args: SelectSubset<T, StudentFindUniqueArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Student that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StudentFindUniqueOrThrowArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StudentFindUniqueOrThrowArgs>(args: SelectSubset<T, StudentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Student that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindFirstArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StudentFindFirstArgs>(args?: SelectSubset<T, StudentFindFirstArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Student that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindFirstOrThrowArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StudentFindFirstOrThrowArgs>(args?: SelectSubset<T, StudentFindFirstOrThrowArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Students that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Students
     * const students = await prisma.student.findMany()
     * 
     * // Get first 10 Students
     * const students = await prisma.student.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const studentWithIdOnly = await prisma.student.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StudentFindManyArgs>(args?: SelectSubset<T, StudentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Student.
     * @param {StudentCreateArgs} args - Arguments to create a Student.
     * @example
     * // Create one Student
     * const Student = await prisma.student.create({
     *   data: {
     *     // ... data to create a Student
     *   }
     * })
     * 
     */
    create<T extends StudentCreateArgs>(args: SelectSubset<T, StudentCreateArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Students.
     * @param {StudentCreateManyArgs} args - Arguments to create many Students.
     * @example
     * // Create many Students
     * const student = await prisma.student.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StudentCreateManyArgs>(args?: SelectSubset<T, StudentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Student.
     * @param {StudentDeleteArgs} args - Arguments to delete one Student.
     * @example
     * // Delete one Student
     * const Student = await prisma.student.delete({
     *   where: {
     *     // ... filter to delete one Student
     *   }
     * })
     * 
     */
    delete<T extends StudentDeleteArgs>(args: SelectSubset<T, StudentDeleteArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Student.
     * @param {StudentUpdateArgs} args - Arguments to update one Student.
     * @example
     * // Update one Student
     * const student = await prisma.student.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StudentUpdateArgs>(args: SelectSubset<T, StudentUpdateArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Students.
     * @param {StudentDeleteManyArgs} args - Arguments to filter Students to delete.
     * @example
     * // Delete a few Students
     * const { count } = await prisma.student.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StudentDeleteManyArgs>(args?: SelectSubset<T, StudentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Students.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Students
     * const student = await prisma.student.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StudentUpdateManyArgs>(args: SelectSubset<T, StudentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Student.
     * @param {StudentUpsertArgs} args - Arguments to update or create a Student.
     * @example
     * // Update or create a Student
     * const student = await prisma.student.upsert({
     *   create: {
     *     // ... data to create a Student
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Student we want to update
     *   }
     * })
     */
    upsert<T extends StudentUpsertArgs>(args: SelectSubset<T, StudentUpsertArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Students.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentCountArgs} args - Arguments to filter Students to count.
     * @example
     * // Count the number of Students
     * const count = await prisma.student.count({
     *   where: {
     *     // ... the filter for the Students we want to count
     *   }
     * })
    **/
    count<T extends StudentCountArgs>(
      args?: Subset<T, StudentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StudentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Student.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StudentAggregateArgs>(args: Subset<T, StudentAggregateArgs>): Prisma.PrismaPromise<GetStudentAggregateType<T>>

    /**
     * Group by Student.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StudentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StudentGroupByArgs['orderBy'] }
        : { orderBy?: StudentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StudentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStudentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Student model
   */
  readonly fields: StudentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Student.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StudentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    section<T extends SectionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SectionDefaultArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    evaluationsGiven<T extends Student$evaluationsGivenArgs<ExtArgs> = {}>(args?: Subset<T, Student$evaluationsGivenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EvaluationResponsePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    evaluationsReceived<T extends Student$evaluationsReceivedArgs<ExtArgs> = {}>(args?: Subset<T, Student$evaluationsReceivedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EvaluationResponsePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Student model
   */
  interface StudentFieldRefs {
    readonly id: FieldRef<"Student", 'Int'>
    readonly name: FieldRef<"Student", 'String'>
    readonly email: FieldRef<"Student", 'String'>
    readonly studentId: FieldRef<"Student", 'String'>
    readonly sectionId: FieldRef<"Student", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Student findUnique
   */
  export type StudentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student findUniqueOrThrow
   */
  export type StudentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student findFirst
   */
  export type StudentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Students.
     */
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student findFirstOrThrow
   */
  export type StudentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Students.
     */
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student findMany
   */
  export type StudentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Students to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student create
   */
  export type StudentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The data needed to create a Student.
     */
    data: XOR<StudentCreateInput, StudentUncheckedCreateInput>
  }

  /**
   * Student createMany
   */
  export type StudentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Students.
     */
    data: StudentCreateManyInput | StudentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Student update
   */
  export type StudentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The data needed to update a Student.
     */
    data: XOR<StudentUpdateInput, StudentUncheckedUpdateInput>
    /**
     * Choose, which Student to update.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student updateMany
   */
  export type StudentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Students.
     */
    data: XOR<StudentUpdateManyMutationInput, StudentUncheckedUpdateManyInput>
    /**
     * Filter which Students to update
     */
    where?: StudentWhereInput
    /**
     * Limit how many Students to update.
     */
    limit?: number
  }

  /**
   * Student upsert
   */
  export type StudentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The filter to search for the Student to update in case it exists.
     */
    where: StudentWhereUniqueInput
    /**
     * In case the Student found by the `where` argument doesn't exist, create a new Student with this data.
     */
    create: XOR<StudentCreateInput, StudentUncheckedCreateInput>
    /**
     * In case the Student was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StudentUpdateInput, StudentUncheckedUpdateInput>
  }

  /**
   * Student delete
   */
  export type StudentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter which Student to delete.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student deleteMany
   */
  export type StudentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Students to delete
     */
    where?: StudentWhereInput
    /**
     * Limit how many Students to delete.
     */
    limit?: number
  }

  /**
   * Student.evaluationsGiven
   */
  export type Student$evaluationsGivenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationResponse
     */
    select?: EvaluationResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvaluationResponse
     */
    omit?: EvaluationResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationResponseInclude<ExtArgs> | null
    where?: EvaluationResponseWhereInput
    orderBy?: EvaluationResponseOrderByWithRelationInput | EvaluationResponseOrderByWithRelationInput[]
    cursor?: EvaluationResponseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EvaluationResponseScalarFieldEnum | EvaluationResponseScalarFieldEnum[]
  }

  /**
   * Student.evaluationsReceived
   */
  export type Student$evaluationsReceivedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationResponse
     */
    select?: EvaluationResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvaluationResponse
     */
    omit?: EvaluationResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationResponseInclude<ExtArgs> | null
    where?: EvaluationResponseWhereInput
    orderBy?: EvaluationResponseOrderByWithRelationInput | EvaluationResponseOrderByWithRelationInput[]
    cursor?: EvaluationResponseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EvaluationResponseScalarFieldEnum | EvaluationResponseScalarFieldEnum[]
  }

  /**
   * Student without action
   */
  export type StudentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
  }


  /**
   * Model Evaluation
   */

  export type AggregateEvaluation = {
    _count: EvaluationCountAggregateOutputType | null
    _avg: EvaluationAvgAggregateOutputType | null
    _sum: EvaluationSumAggregateOutputType | null
    _min: EvaluationMinAggregateOutputType | null
    _max: EvaluationMaxAggregateOutputType | null
  }

  export type EvaluationAvgAggregateOutputType = {
    id: number | null
    sectionId: number | null
  }

  export type EvaluationSumAggregateOutputType = {
    id: number | null
    sectionId: number | null
  }

  export type EvaluationMinAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    sectionId: number | null
  }

  export type EvaluationMaxAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    sectionId: number | null
  }

  export type EvaluationCountAggregateOutputType = {
    id: number
    title: number
    description: number
    sectionId: number
    _all: number
  }


  export type EvaluationAvgAggregateInputType = {
    id?: true
    sectionId?: true
  }

  export type EvaluationSumAggregateInputType = {
    id?: true
    sectionId?: true
  }

  export type EvaluationMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    sectionId?: true
  }

  export type EvaluationMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    sectionId?: true
  }

  export type EvaluationCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    sectionId?: true
    _all?: true
  }

  export type EvaluationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Evaluation to aggregate.
     */
    where?: EvaluationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Evaluations to fetch.
     */
    orderBy?: EvaluationOrderByWithRelationInput | EvaluationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EvaluationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Evaluations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Evaluations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Evaluations
    **/
    _count?: true | EvaluationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EvaluationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EvaluationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EvaluationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EvaluationMaxAggregateInputType
  }

  export type GetEvaluationAggregateType<T extends EvaluationAggregateArgs> = {
        [P in keyof T & keyof AggregateEvaluation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEvaluation[P]>
      : GetScalarType<T[P], AggregateEvaluation[P]>
  }




  export type EvaluationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EvaluationWhereInput
    orderBy?: EvaluationOrderByWithAggregationInput | EvaluationOrderByWithAggregationInput[]
    by: EvaluationScalarFieldEnum[] | EvaluationScalarFieldEnum
    having?: EvaluationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EvaluationCountAggregateInputType | true
    _avg?: EvaluationAvgAggregateInputType
    _sum?: EvaluationSumAggregateInputType
    _min?: EvaluationMinAggregateInputType
    _max?: EvaluationMaxAggregateInputType
  }

  export type EvaluationGroupByOutputType = {
    id: number
    title: string
    description: string | null
    sectionId: number
    _count: EvaluationCountAggregateOutputType | null
    _avg: EvaluationAvgAggregateOutputType | null
    _sum: EvaluationSumAggregateOutputType | null
    _min: EvaluationMinAggregateOutputType | null
    _max: EvaluationMaxAggregateOutputType | null
  }

  type GetEvaluationGroupByPayload<T extends EvaluationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EvaluationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EvaluationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EvaluationGroupByOutputType[P]>
            : GetScalarType<T[P], EvaluationGroupByOutputType[P]>
        }
      >
    >


  export type EvaluationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    sectionId?: boolean
    section?: boolean | SectionDefaultArgs<ExtArgs>
    criteria?: boolean | Evaluation$criteriaArgs<ExtArgs>
    responses?: boolean | Evaluation$responsesArgs<ExtArgs>
    _count?: boolean | EvaluationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["evaluation"]>



  export type EvaluationSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    sectionId?: boolean
  }

  export type EvaluationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "sectionId", ExtArgs["result"]["evaluation"]>
  export type EvaluationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    section?: boolean | SectionDefaultArgs<ExtArgs>
    criteria?: boolean | Evaluation$criteriaArgs<ExtArgs>
    responses?: boolean | Evaluation$responsesArgs<ExtArgs>
    _count?: boolean | EvaluationCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $EvaluationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Evaluation"
    objects: {
      section: Prisma.$SectionPayload<ExtArgs>
      criteria: Prisma.$EvaluationCriteriaPayload<ExtArgs>[]
      responses: Prisma.$EvaluationResponsePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      description: string | null
      sectionId: number
    }, ExtArgs["result"]["evaluation"]>
    composites: {}
  }

  type EvaluationGetPayload<S extends boolean | null | undefined | EvaluationDefaultArgs> = $Result.GetResult<Prisma.$EvaluationPayload, S>

  type EvaluationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EvaluationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EvaluationCountAggregateInputType | true
    }

  export interface EvaluationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Evaluation'], meta: { name: 'Evaluation' } }
    /**
     * Find zero or one Evaluation that matches the filter.
     * @param {EvaluationFindUniqueArgs} args - Arguments to find a Evaluation
     * @example
     * // Get one Evaluation
     * const evaluation = await prisma.evaluation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EvaluationFindUniqueArgs>(args: SelectSubset<T, EvaluationFindUniqueArgs<ExtArgs>>): Prisma__EvaluationClient<$Result.GetResult<Prisma.$EvaluationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Evaluation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EvaluationFindUniqueOrThrowArgs} args - Arguments to find a Evaluation
     * @example
     * // Get one Evaluation
     * const evaluation = await prisma.evaluation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EvaluationFindUniqueOrThrowArgs>(args: SelectSubset<T, EvaluationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EvaluationClient<$Result.GetResult<Prisma.$EvaluationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Evaluation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluationFindFirstArgs} args - Arguments to find a Evaluation
     * @example
     * // Get one Evaluation
     * const evaluation = await prisma.evaluation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EvaluationFindFirstArgs>(args?: SelectSubset<T, EvaluationFindFirstArgs<ExtArgs>>): Prisma__EvaluationClient<$Result.GetResult<Prisma.$EvaluationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Evaluation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluationFindFirstOrThrowArgs} args - Arguments to find a Evaluation
     * @example
     * // Get one Evaluation
     * const evaluation = await prisma.evaluation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EvaluationFindFirstOrThrowArgs>(args?: SelectSubset<T, EvaluationFindFirstOrThrowArgs<ExtArgs>>): Prisma__EvaluationClient<$Result.GetResult<Prisma.$EvaluationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Evaluations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Evaluations
     * const evaluations = await prisma.evaluation.findMany()
     * 
     * // Get first 10 Evaluations
     * const evaluations = await prisma.evaluation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const evaluationWithIdOnly = await prisma.evaluation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EvaluationFindManyArgs>(args?: SelectSubset<T, EvaluationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EvaluationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Evaluation.
     * @param {EvaluationCreateArgs} args - Arguments to create a Evaluation.
     * @example
     * // Create one Evaluation
     * const Evaluation = await prisma.evaluation.create({
     *   data: {
     *     // ... data to create a Evaluation
     *   }
     * })
     * 
     */
    create<T extends EvaluationCreateArgs>(args: SelectSubset<T, EvaluationCreateArgs<ExtArgs>>): Prisma__EvaluationClient<$Result.GetResult<Prisma.$EvaluationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Evaluations.
     * @param {EvaluationCreateManyArgs} args - Arguments to create many Evaluations.
     * @example
     * // Create many Evaluations
     * const evaluation = await prisma.evaluation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EvaluationCreateManyArgs>(args?: SelectSubset<T, EvaluationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Evaluation.
     * @param {EvaluationDeleteArgs} args - Arguments to delete one Evaluation.
     * @example
     * // Delete one Evaluation
     * const Evaluation = await prisma.evaluation.delete({
     *   where: {
     *     // ... filter to delete one Evaluation
     *   }
     * })
     * 
     */
    delete<T extends EvaluationDeleteArgs>(args: SelectSubset<T, EvaluationDeleteArgs<ExtArgs>>): Prisma__EvaluationClient<$Result.GetResult<Prisma.$EvaluationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Evaluation.
     * @param {EvaluationUpdateArgs} args - Arguments to update one Evaluation.
     * @example
     * // Update one Evaluation
     * const evaluation = await prisma.evaluation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EvaluationUpdateArgs>(args: SelectSubset<T, EvaluationUpdateArgs<ExtArgs>>): Prisma__EvaluationClient<$Result.GetResult<Prisma.$EvaluationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Evaluations.
     * @param {EvaluationDeleteManyArgs} args - Arguments to filter Evaluations to delete.
     * @example
     * // Delete a few Evaluations
     * const { count } = await prisma.evaluation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EvaluationDeleteManyArgs>(args?: SelectSubset<T, EvaluationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Evaluations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Evaluations
     * const evaluation = await prisma.evaluation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EvaluationUpdateManyArgs>(args: SelectSubset<T, EvaluationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Evaluation.
     * @param {EvaluationUpsertArgs} args - Arguments to update or create a Evaluation.
     * @example
     * // Update or create a Evaluation
     * const evaluation = await prisma.evaluation.upsert({
     *   create: {
     *     // ... data to create a Evaluation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Evaluation we want to update
     *   }
     * })
     */
    upsert<T extends EvaluationUpsertArgs>(args: SelectSubset<T, EvaluationUpsertArgs<ExtArgs>>): Prisma__EvaluationClient<$Result.GetResult<Prisma.$EvaluationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Evaluations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluationCountArgs} args - Arguments to filter Evaluations to count.
     * @example
     * // Count the number of Evaluations
     * const count = await prisma.evaluation.count({
     *   where: {
     *     // ... the filter for the Evaluations we want to count
     *   }
     * })
    **/
    count<T extends EvaluationCountArgs>(
      args?: Subset<T, EvaluationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EvaluationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Evaluation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EvaluationAggregateArgs>(args: Subset<T, EvaluationAggregateArgs>): Prisma.PrismaPromise<GetEvaluationAggregateType<T>>

    /**
     * Group by Evaluation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EvaluationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EvaluationGroupByArgs['orderBy'] }
        : { orderBy?: EvaluationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EvaluationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEvaluationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Evaluation model
   */
  readonly fields: EvaluationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Evaluation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EvaluationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    section<T extends SectionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SectionDefaultArgs<ExtArgs>>): Prisma__SectionClient<$Result.GetResult<Prisma.$SectionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    criteria<T extends Evaluation$criteriaArgs<ExtArgs> = {}>(args?: Subset<T, Evaluation$criteriaArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EvaluationCriteriaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    responses<T extends Evaluation$responsesArgs<ExtArgs> = {}>(args?: Subset<T, Evaluation$responsesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EvaluationResponsePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Evaluation model
   */
  interface EvaluationFieldRefs {
    readonly id: FieldRef<"Evaluation", 'Int'>
    readonly title: FieldRef<"Evaluation", 'String'>
    readonly description: FieldRef<"Evaluation", 'String'>
    readonly sectionId: FieldRef<"Evaluation", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Evaluation findUnique
   */
  export type EvaluationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluation
     */
    select?: EvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluation
     */
    omit?: EvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationInclude<ExtArgs> | null
    /**
     * Filter, which Evaluation to fetch.
     */
    where: EvaluationWhereUniqueInput
  }

  /**
   * Evaluation findUniqueOrThrow
   */
  export type EvaluationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluation
     */
    select?: EvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluation
     */
    omit?: EvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationInclude<ExtArgs> | null
    /**
     * Filter, which Evaluation to fetch.
     */
    where: EvaluationWhereUniqueInput
  }

  /**
   * Evaluation findFirst
   */
  export type EvaluationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluation
     */
    select?: EvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluation
     */
    omit?: EvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationInclude<ExtArgs> | null
    /**
     * Filter, which Evaluation to fetch.
     */
    where?: EvaluationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Evaluations to fetch.
     */
    orderBy?: EvaluationOrderByWithRelationInput | EvaluationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Evaluations.
     */
    cursor?: EvaluationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Evaluations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Evaluations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Evaluations.
     */
    distinct?: EvaluationScalarFieldEnum | EvaluationScalarFieldEnum[]
  }

  /**
   * Evaluation findFirstOrThrow
   */
  export type EvaluationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluation
     */
    select?: EvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluation
     */
    omit?: EvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationInclude<ExtArgs> | null
    /**
     * Filter, which Evaluation to fetch.
     */
    where?: EvaluationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Evaluations to fetch.
     */
    orderBy?: EvaluationOrderByWithRelationInput | EvaluationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Evaluations.
     */
    cursor?: EvaluationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Evaluations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Evaluations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Evaluations.
     */
    distinct?: EvaluationScalarFieldEnum | EvaluationScalarFieldEnum[]
  }

  /**
   * Evaluation findMany
   */
  export type EvaluationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluation
     */
    select?: EvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluation
     */
    omit?: EvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationInclude<ExtArgs> | null
    /**
     * Filter, which Evaluations to fetch.
     */
    where?: EvaluationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Evaluations to fetch.
     */
    orderBy?: EvaluationOrderByWithRelationInput | EvaluationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Evaluations.
     */
    cursor?: EvaluationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Evaluations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Evaluations.
     */
    skip?: number
    distinct?: EvaluationScalarFieldEnum | EvaluationScalarFieldEnum[]
  }

  /**
   * Evaluation create
   */
  export type EvaluationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluation
     */
    select?: EvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluation
     */
    omit?: EvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationInclude<ExtArgs> | null
    /**
     * The data needed to create a Evaluation.
     */
    data: XOR<EvaluationCreateInput, EvaluationUncheckedCreateInput>
  }

  /**
   * Evaluation createMany
   */
  export type EvaluationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Evaluations.
     */
    data: EvaluationCreateManyInput | EvaluationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Evaluation update
   */
  export type EvaluationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluation
     */
    select?: EvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluation
     */
    omit?: EvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationInclude<ExtArgs> | null
    /**
     * The data needed to update a Evaluation.
     */
    data: XOR<EvaluationUpdateInput, EvaluationUncheckedUpdateInput>
    /**
     * Choose, which Evaluation to update.
     */
    where: EvaluationWhereUniqueInput
  }

  /**
   * Evaluation updateMany
   */
  export type EvaluationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Evaluations.
     */
    data: XOR<EvaluationUpdateManyMutationInput, EvaluationUncheckedUpdateManyInput>
    /**
     * Filter which Evaluations to update
     */
    where?: EvaluationWhereInput
    /**
     * Limit how many Evaluations to update.
     */
    limit?: number
  }

  /**
   * Evaluation upsert
   */
  export type EvaluationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluation
     */
    select?: EvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluation
     */
    omit?: EvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationInclude<ExtArgs> | null
    /**
     * The filter to search for the Evaluation to update in case it exists.
     */
    where: EvaluationWhereUniqueInput
    /**
     * In case the Evaluation found by the `where` argument doesn't exist, create a new Evaluation with this data.
     */
    create: XOR<EvaluationCreateInput, EvaluationUncheckedCreateInput>
    /**
     * In case the Evaluation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EvaluationUpdateInput, EvaluationUncheckedUpdateInput>
  }

  /**
   * Evaluation delete
   */
  export type EvaluationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluation
     */
    select?: EvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluation
     */
    omit?: EvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationInclude<ExtArgs> | null
    /**
     * Filter which Evaluation to delete.
     */
    where: EvaluationWhereUniqueInput
  }

  /**
   * Evaluation deleteMany
   */
  export type EvaluationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Evaluations to delete
     */
    where?: EvaluationWhereInput
    /**
     * Limit how many Evaluations to delete.
     */
    limit?: number
  }

  /**
   * Evaluation.criteria
   */
  export type Evaluation$criteriaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationCriteria
     */
    select?: EvaluationCriteriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvaluationCriteria
     */
    omit?: EvaluationCriteriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationCriteriaInclude<ExtArgs> | null
    where?: EvaluationCriteriaWhereInput
    orderBy?: EvaluationCriteriaOrderByWithRelationInput | EvaluationCriteriaOrderByWithRelationInput[]
    cursor?: EvaluationCriteriaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EvaluationCriteriaScalarFieldEnum | EvaluationCriteriaScalarFieldEnum[]
  }

  /**
   * Evaluation.responses
   */
  export type Evaluation$responsesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationResponse
     */
    select?: EvaluationResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvaluationResponse
     */
    omit?: EvaluationResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationResponseInclude<ExtArgs> | null
    where?: EvaluationResponseWhereInput
    orderBy?: EvaluationResponseOrderByWithRelationInput | EvaluationResponseOrderByWithRelationInput[]
    cursor?: EvaluationResponseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EvaluationResponseScalarFieldEnum | EvaluationResponseScalarFieldEnum[]
  }

  /**
   * Evaluation without action
   */
  export type EvaluationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Evaluation
     */
    select?: EvaluationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Evaluation
     */
    omit?: EvaluationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationInclude<ExtArgs> | null
  }


  /**
   * Model EvaluationCriteria
   */

  export type AggregateEvaluationCriteria = {
    _count: EvaluationCriteriaCountAggregateOutputType | null
    _avg: EvaluationCriteriaAvgAggregateOutputType | null
    _sum: EvaluationCriteriaSumAggregateOutputType | null
    _min: EvaluationCriteriaMinAggregateOutputType | null
    _max: EvaluationCriteriaMaxAggregateOutputType | null
  }

  export type EvaluationCriteriaAvgAggregateOutputType = {
    id: number | null
    evaluationId: number | null
  }

  export type EvaluationCriteriaSumAggregateOutputType = {
    id: number | null
    evaluationId: number | null
  }

  export type EvaluationCriteriaMinAggregateOutputType = {
    id: number | null
    name: string | null
    evaluationId: number | null
  }

  export type EvaluationCriteriaMaxAggregateOutputType = {
    id: number | null
    name: string | null
    evaluationId: number | null
  }

  export type EvaluationCriteriaCountAggregateOutputType = {
    id: number
    name: number
    evaluationId: number
    _all: number
  }


  export type EvaluationCriteriaAvgAggregateInputType = {
    id?: true
    evaluationId?: true
  }

  export type EvaluationCriteriaSumAggregateInputType = {
    id?: true
    evaluationId?: true
  }

  export type EvaluationCriteriaMinAggregateInputType = {
    id?: true
    name?: true
    evaluationId?: true
  }

  export type EvaluationCriteriaMaxAggregateInputType = {
    id?: true
    name?: true
    evaluationId?: true
  }

  export type EvaluationCriteriaCountAggregateInputType = {
    id?: true
    name?: true
    evaluationId?: true
    _all?: true
  }

  export type EvaluationCriteriaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EvaluationCriteria to aggregate.
     */
    where?: EvaluationCriteriaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EvaluationCriteria to fetch.
     */
    orderBy?: EvaluationCriteriaOrderByWithRelationInput | EvaluationCriteriaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EvaluationCriteriaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EvaluationCriteria from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EvaluationCriteria.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EvaluationCriteria
    **/
    _count?: true | EvaluationCriteriaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EvaluationCriteriaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EvaluationCriteriaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EvaluationCriteriaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EvaluationCriteriaMaxAggregateInputType
  }

  export type GetEvaluationCriteriaAggregateType<T extends EvaluationCriteriaAggregateArgs> = {
        [P in keyof T & keyof AggregateEvaluationCriteria]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEvaluationCriteria[P]>
      : GetScalarType<T[P], AggregateEvaluationCriteria[P]>
  }




  export type EvaluationCriteriaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EvaluationCriteriaWhereInput
    orderBy?: EvaluationCriteriaOrderByWithAggregationInput | EvaluationCriteriaOrderByWithAggregationInput[]
    by: EvaluationCriteriaScalarFieldEnum[] | EvaluationCriteriaScalarFieldEnum
    having?: EvaluationCriteriaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EvaluationCriteriaCountAggregateInputType | true
    _avg?: EvaluationCriteriaAvgAggregateInputType
    _sum?: EvaluationCriteriaSumAggregateInputType
    _min?: EvaluationCriteriaMinAggregateInputType
    _max?: EvaluationCriteriaMaxAggregateInputType
  }

  export type EvaluationCriteriaGroupByOutputType = {
    id: number
    name: string
    evaluationId: number
    _count: EvaluationCriteriaCountAggregateOutputType | null
    _avg: EvaluationCriteriaAvgAggregateOutputType | null
    _sum: EvaluationCriteriaSumAggregateOutputType | null
    _min: EvaluationCriteriaMinAggregateOutputType | null
    _max: EvaluationCriteriaMaxAggregateOutputType | null
  }

  type GetEvaluationCriteriaGroupByPayload<T extends EvaluationCriteriaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EvaluationCriteriaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EvaluationCriteriaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EvaluationCriteriaGroupByOutputType[P]>
            : GetScalarType<T[P], EvaluationCriteriaGroupByOutputType[P]>
        }
      >
    >


  export type EvaluationCriteriaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    evaluationId?: boolean
    evaluation?: boolean | EvaluationDefaultArgs<ExtArgs>
    responses?: boolean | EvaluationCriteria$responsesArgs<ExtArgs>
    _count?: boolean | EvaluationCriteriaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["evaluationCriteria"]>



  export type EvaluationCriteriaSelectScalar = {
    id?: boolean
    name?: boolean
    evaluationId?: boolean
  }

  export type EvaluationCriteriaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "evaluationId", ExtArgs["result"]["evaluationCriteria"]>
  export type EvaluationCriteriaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    evaluation?: boolean | EvaluationDefaultArgs<ExtArgs>
    responses?: boolean | EvaluationCriteria$responsesArgs<ExtArgs>
    _count?: boolean | EvaluationCriteriaCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $EvaluationCriteriaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EvaluationCriteria"
    objects: {
      evaluation: Prisma.$EvaluationPayload<ExtArgs>
      responses: Prisma.$EvaluationResponsePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      evaluationId: number
    }, ExtArgs["result"]["evaluationCriteria"]>
    composites: {}
  }

  type EvaluationCriteriaGetPayload<S extends boolean | null | undefined | EvaluationCriteriaDefaultArgs> = $Result.GetResult<Prisma.$EvaluationCriteriaPayload, S>

  type EvaluationCriteriaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EvaluationCriteriaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EvaluationCriteriaCountAggregateInputType | true
    }

  export interface EvaluationCriteriaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EvaluationCriteria'], meta: { name: 'EvaluationCriteria' } }
    /**
     * Find zero or one EvaluationCriteria that matches the filter.
     * @param {EvaluationCriteriaFindUniqueArgs} args - Arguments to find a EvaluationCriteria
     * @example
     * // Get one EvaluationCriteria
     * const evaluationCriteria = await prisma.evaluationCriteria.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EvaluationCriteriaFindUniqueArgs>(args: SelectSubset<T, EvaluationCriteriaFindUniqueArgs<ExtArgs>>): Prisma__EvaluationCriteriaClient<$Result.GetResult<Prisma.$EvaluationCriteriaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EvaluationCriteria that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EvaluationCriteriaFindUniqueOrThrowArgs} args - Arguments to find a EvaluationCriteria
     * @example
     * // Get one EvaluationCriteria
     * const evaluationCriteria = await prisma.evaluationCriteria.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EvaluationCriteriaFindUniqueOrThrowArgs>(args: SelectSubset<T, EvaluationCriteriaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EvaluationCriteriaClient<$Result.GetResult<Prisma.$EvaluationCriteriaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EvaluationCriteria that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluationCriteriaFindFirstArgs} args - Arguments to find a EvaluationCriteria
     * @example
     * // Get one EvaluationCriteria
     * const evaluationCriteria = await prisma.evaluationCriteria.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EvaluationCriteriaFindFirstArgs>(args?: SelectSubset<T, EvaluationCriteriaFindFirstArgs<ExtArgs>>): Prisma__EvaluationCriteriaClient<$Result.GetResult<Prisma.$EvaluationCriteriaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EvaluationCriteria that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluationCriteriaFindFirstOrThrowArgs} args - Arguments to find a EvaluationCriteria
     * @example
     * // Get one EvaluationCriteria
     * const evaluationCriteria = await prisma.evaluationCriteria.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EvaluationCriteriaFindFirstOrThrowArgs>(args?: SelectSubset<T, EvaluationCriteriaFindFirstOrThrowArgs<ExtArgs>>): Prisma__EvaluationCriteriaClient<$Result.GetResult<Prisma.$EvaluationCriteriaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EvaluationCriteria that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluationCriteriaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EvaluationCriteria
     * const evaluationCriteria = await prisma.evaluationCriteria.findMany()
     * 
     * // Get first 10 EvaluationCriteria
     * const evaluationCriteria = await prisma.evaluationCriteria.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const evaluationCriteriaWithIdOnly = await prisma.evaluationCriteria.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EvaluationCriteriaFindManyArgs>(args?: SelectSubset<T, EvaluationCriteriaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EvaluationCriteriaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EvaluationCriteria.
     * @param {EvaluationCriteriaCreateArgs} args - Arguments to create a EvaluationCriteria.
     * @example
     * // Create one EvaluationCriteria
     * const EvaluationCriteria = await prisma.evaluationCriteria.create({
     *   data: {
     *     // ... data to create a EvaluationCriteria
     *   }
     * })
     * 
     */
    create<T extends EvaluationCriteriaCreateArgs>(args: SelectSubset<T, EvaluationCriteriaCreateArgs<ExtArgs>>): Prisma__EvaluationCriteriaClient<$Result.GetResult<Prisma.$EvaluationCriteriaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EvaluationCriteria.
     * @param {EvaluationCriteriaCreateManyArgs} args - Arguments to create many EvaluationCriteria.
     * @example
     * // Create many EvaluationCriteria
     * const evaluationCriteria = await prisma.evaluationCriteria.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EvaluationCriteriaCreateManyArgs>(args?: SelectSubset<T, EvaluationCriteriaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a EvaluationCriteria.
     * @param {EvaluationCriteriaDeleteArgs} args - Arguments to delete one EvaluationCriteria.
     * @example
     * // Delete one EvaluationCriteria
     * const EvaluationCriteria = await prisma.evaluationCriteria.delete({
     *   where: {
     *     // ... filter to delete one EvaluationCriteria
     *   }
     * })
     * 
     */
    delete<T extends EvaluationCriteriaDeleteArgs>(args: SelectSubset<T, EvaluationCriteriaDeleteArgs<ExtArgs>>): Prisma__EvaluationCriteriaClient<$Result.GetResult<Prisma.$EvaluationCriteriaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EvaluationCriteria.
     * @param {EvaluationCriteriaUpdateArgs} args - Arguments to update one EvaluationCriteria.
     * @example
     * // Update one EvaluationCriteria
     * const evaluationCriteria = await prisma.evaluationCriteria.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EvaluationCriteriaUpdateArgs>(args: SelectSubset<T, EvaluationCriteriaUpdateArgs<ExtArgs>>): Prisma__EvaluationCriteriaClient<$Result.GetResult<Prisma.$EvaluationCriteriaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EvaluationCriteria.
     * @param {EvaluationCriteriaDeleteManyArgs} args - Arguments to filter EvaluationCriteria to delete.
     * @example
     * // Delete a few EvaluationCriteria
     * const { count } = await prisma.evaluationCriteria.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EvaluationCriteriaDeleteManyArgs>(args?: SelectSubset<T, EvaluationCriteriaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EvaluationCriteria.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluationCriteriaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EvaluationCriteria
     * const evaluationCriteria = await prisma.evaluationCriteria.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EvaluationCriteriaUpdateManyArgs>(args: SelectSubset<T, EvaluationCriteriaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one EvaluationCriteria.
     * @param {EvaluationCriteriaUpsertArgs} args - Arguments to update or create a EvaluationCriteria.
     * @example
     * // Update or create a EvaluationCriteria
     * const evaluationCriteria = await prisma.evaluationCriteria.upsert({
     *   create: {
     *     // ... data to create a EvaluationCriteria
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EvaluationCriteria we want to update
     *   }
     * })
     */
    upsert<T extends EvaluationCriteriaUpsertArgs>(args: SelectSubset<T, EvaluationCriteriaUpsertArgs<ExtArgs>>): Prisma__EvaluationCriteriaClient<$Result.GetResult<Prisma.$EvaluationCriteriaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EvaluationCriteria.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluationCriteriaCountArgs} args - Arguments to filter EvaluationCriteria to count.
     * @example
     * // Count the number of EvaluationCriteria
     * const count = await prisma.evaluationCriteria.count({
     *   where: {
     *     // ... the filter for the EvaluationCriteria we want to count
     *   }
     * })
    **/
    count<T extends EvaluationCriteriaCountArgs>(
      args?: Subset<T, EvaluationCriteriaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EvaluationCriteriaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EvaluationCriteria.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluationCriteriaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EvaluationCriteriaAggregateArgs>(args: Subset<T, EvaluationCriteriaAggregateArgs>): Prisma.PrismaPromise<GetEvaluationCriteriaAggregateType<T>>

    /**
     * Group by EvaluationCriteria.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluationCriteriaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EvaluationCriteriaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EvaluationCriteriaGroupByArgs['orderBy'] }
        : { orderBy?: EvaluationCriteriaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EvaluationCriteriaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEvaluationCriteriaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EvaluationCriteria model
   */
  readonly fields: EvaluationCriteriaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EvaluationCriteria.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EvaluationCriteriaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    evaluation<T extends EvaluationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EvaluationDefaultArgs<ExtArgs>>): Prisma__EvaluationClient<$Result.GetResult<Prisma.$EvaluationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    responses<T extends EvaluationCriteria$responsesArgs<ExtArgs> = {}>(args?: Subset<T, EvaluationCriteria$responsesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EvaluationResponsePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EvaluationCriteria model
   */
  interface EvaluationCriteriaFieldRefs {
    readonly id: FieldRef<"EvaluationCriteria", 'Int'>
    readonly name: FieldRef<"EvaluationCriteria", 'String'>
    readonly evaluationId: FieldRef<"EvaluationCriteria", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * EvaluationCriteria findUnique
   */
  export type EvaluationCriteriaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationCriteria
     */
    select?: EvaluationCriteriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvaluationCriteria
     */
    omit?: EvaluationCriteriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationCriteriaInclude<ExtArgs> | null
    /**
     * Filter, which EvaluationCriteria to fetch.
     */
    where: EvaluationCriteriaWhereUniqueInput
  }

  /**
   * EvaluationCriteria findUniqueOrThrow
   */
  export type EvaluationCriteriaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationCriteria
     */
    select?: EvaluationCriteriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvaluationCriteria
     */
    omit?: EvaluationCriteriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationCriteriaInclude<ExtArgs> | null
    /**
     * Filter, which EvaluationCriteria to fetch.
     */
    where: EvaluationCriteriaWhereUniqueInput
  }

  /**
   * EvaluationCriteria findFirst
   */
  export type EvaluationCriteriaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationCriteria
     */
    select?: EvaluationCriteriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvaluationCriteria
     */
    omit?: EvaluationCriteriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationCriteriaInclude<ExtArgs> | null
    /**
     * Filter, which EvaluationCriteria to fetch.
     */
    where?: EvaluationCriteriaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EvaluationCriteria to fetch.
     */
    orderBy?: EvaluationCriteriaOrderByWithRelationInput | EvaluationCriteriaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EvaluationCriteria.
     */
    cursor?: EvaluationCriteriaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EvaluationCriteria from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EvaluationCriteria.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EvaluationCriteria.
     */
    distinct?: EvaluationCriteriaScalarFieldEnum | EvaluationCriteriaScalarFieldEnum[]
  }

  /**
   * EvaluationCriteria findFirstOrThrow
   */
  export type EvaluationCriteriaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationCriteria
     */
    select?: EvaluationCriteriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvaluationCriteria
     */
    omit?: EvaluationCriteriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationCriteriaInclude<ExtArgs> | null
    /**
     * Filter, which EvaluationCriteria to fetch.
     */
    where?: EvaluationCriteriaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EvaluationCriteria to fetch.
     */
    orderBy?: EvaluationCriteriaOrderByWithRelationInput | EvaluationCriteriaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EvaluationCriteria.
     */
    cursor?: EvaluationCriteriaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EvaluationCriteria from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EvaluationCriteria.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EvaluationCriteria.
     */
    distinct?: EvaluationCriteriaScalarFieldEnum | EvaluationCriteriaScalarFieldEnum[]
  }

  /**
   * EvaluationCriteria findMany
   */
  export type EvaluationCriteriaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationCriteria
     */
    select?: EvaluationCriteriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvaluationCriteria
     */
    omit?: EvaluationCriteriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationCriteriaInclude<ExtArgs> | null
    /**
     * Filter, which EvaluationCriteria to fetch.
     */
    where?: EvaluationCriteriaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EvaluationCriteria to fetch.
     */
    orderBy?: EvaluationCriteriaOrderByWithRelationInput | EvaluationCriteriaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EvaluationCriteria.
     */
    cursor?: EvaluationCriteriaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EvaluationCriteria from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EvaluationCriteria.
     */
    skip?: number
    distinct?: EvaluationCriteriaScalarFieldEnum | EvaluationCriteriaScalarFieldEnum[]
  }

  /**
   * EvaluationCriteria create
   */
  export type EvaluationCriteriaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationCriteria
     */
    select?: EvaluationCriteriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvaluationCriteria
     */
    omit?: EvaluationCriteriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationCriteriaInclude<ExtArgs> | null
    /**
     * The data needed to create a EvaluationCriteria.
     */
    data: XOR<EvaluationCriteriaCreateInput, EvaluationCriteriaUncheckedCreateInput>
  }

  /**
   * EvaluationCriteria createMany
   */
  export type EvaluationCriteriaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EvaluationCriteria.
     */
    data: EvaluationCriteriaCreateManyInput | EvaluationCriteriaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EvaluationCriteria update
   */
  export type EvaluationCriteriaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationCriteria
     */
    select?: EvaluationCriteriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvaluationCriteria
     */
    omit?: EvaluationCriteriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationCriteriaInclude<ExtArgs> | null
    /**
     * The data needed to update a EvaluationCriteria.
     */
    data: XOR<EvaluationCriteriaUpdateInput, EvaluationCriteriaUncheckedUpdateInput>
    /**
     * Choose, which EvaluationCriteria to update.
     */
    where: EvaluationCriteriaWhereUniqueInput
  }

  /**
   * EvaluationCriteria updateMany
   */
  export type EvaluationCriteriaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EvaluationCriteria.
     */
    data: XOR<EvaluationCriteriaUpdateManyMutationInput, EvaluationCriteriaUncheckedUpdateManyInput>
    /**
     * Filter which EvaluationCriteria to update
     */
    where?: EvaluationCriteriaWhereInput
    /**
     * Limit how many EvaluationCriteria to update.
     */
    limit?: number
  }

  /**
   * EvaluationCriteria upsert
   */
  export type EvaluationCriteriaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationCriteria
     */
    select?: EvaluationCriteriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvaluationCriteria
     */
    omit?: EvaluationCriteriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationCriteriaInclude<ExtArgs> | null
    /**
     * The filter to search for the EvaluationCriteria to update in case it exists.
     */
    where: EvaluationCriteriaWhereUniqueInput
    /**
     * In case the EvaluationCriteria found by the `where` argument doesn't exist, create a new EvaluationCriteria with this data.
     */
    create: XOR<EvaluationCriteriaCreateInput, EvaluationCriteriaUncheckedCreateInput>
    /**
     * In case the EvaluationCriteria was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EvaluationCriteriaUpdateInput, EvaluationCriteriaUncheckedUpdateInput>
  }

  /**
   * EvaluationCriteria delete
   */
  export type EvaluationCriteriaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationCriteria
     */
    select?: EvaluationCriteriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvaluationCriteria
     */
    omit?: EvaluationCriteriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationCriteriaInclude<ExtArgs> | null
    /**
     * Filter which EvaluationCriteria to delete.
     */
    where: EvaluationCriteriaWhereUniqueInput
  }

  /**
   * EvaluationCriteria deleteMany
   */
  export type EvaluationCriteriaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EvaluationCriteria to delete
     */
    where?: EvaluationCriteriaWhereInput
    /**
     * Limit how many EvaluationCriteria to delete.
     */
    limit?: number
  }

  /**
   * EvaluationCriteria.responses
   */
  export type EvaluationCriteria$responsesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationResponse
     */
    select?: EvaluationResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvaluationResponse
     */
    omit?: EvaluationResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationResponseInclude<ExtArgs> | null
    where?: EvaluationResponseWhereInput
    orderBy?: EvaluationResponseOrderByWithRelationInput | EvaluationResponseOrderByWithRelationInput[]
    cursor?: EvaluationResponseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EvaluationResponseScalarFieldEnum | EvaluationResponseScalarFieldEnum[]
  }

  /**
   * EvaluationCriteria without action
   */
  export type EvaluationCriteriaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationCriteria
     */
    select?: EvaluationCriteriaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvaluationCriteria
     */
    omit?: EvaluationCriteriaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationCriteriaInclude<ExtArgs> | null
  }


  /**
   * Model EvaluationResponse
   */

  export type AggregateEvaluationResponse = {
    _count: EvaluationResponseCountAggregateOutputType | null
    _avg: EvaluationResponseAvgAggregateOutputType | null
    _sum: EvaluationResponseSumAggregateOutputType | null
    _min: EvaluationResponseMinAggregateOutputType | null
    _max: EvaluationResponseMaxAggregateOutputType | null
  }

  export type EvaluationResponseAvgAggregateOutputType = {
    id: number | null
    evaluationId: number | null
    evaluatorStudentId: number | null
    evaluatedStudentId: number | null
    criterionId: number | null
    score: number | null
  }

  export type EvaluationResponseSumAggregateOutputType = {
    id: number | null
    evaluationId: number | null
    evaluatorStudentId: number | null
    evaluatedStudentId: number | null
    criterionId: number | null
    score: number | null
  }

  export type EvaluationResponseMinAggregateOutputType = {
    id: number | null
    evaluationId: number | null
    evaluatorStudentId: number | null
    evaluatedStudentId: number | null
    criterionId: number | null
    score: number | null
  }

  export type EvaluationResponseMaxAggregateOutputType = {
    id: number | null
    evaluationId: number | null
    evaluatorStudentId: number | null
    evaluatedStudentId: number | null
    criterionId: number | null
    score: number | null
  }

  export type EvaluationResponseCountAggregateOutputType = {
    id: number
    evaluationId: number
    evaluatorStudentId: number
    evaluatedStudentId: number
    criterionId: number
    score: number
    _all: number
  }


  export type EvaluationResponseAvgAggregateInputType = {
    id?: true
    evaluationId?: true
    evaluatorStudentId?: true
    evaluatedStudentId?: true
    criterionId?: true
    score?: true
  }

  export type EvaluationResponseSumAggregateInputType = {
    id?: true
    evaluationId?: true
    evaluatorStudentId?: true
    evaluatedStudentId?: true
    criterionId?: true
    score?: true
  }

  export type EvaluationResponseMinAggregateInputType = {
    id?: true
    evaluationId?: true
    evaluatorStudentId?: true
    evaluatedStudentId?: true
    criterionId?: true
    score?: true
  }

  export type EvaluationResponseMaxAggregateInputType = {
    id?: true
    evaluationId?: true
    evaluatorStudentId?: true
    evaluatedStudentId?: true
    criterionId?: true
    score?: true
  }

  export type EvaluationResponseCountAggregateInputType = {
    id?: true
    evaluationId?: true
    evaluatorStudentId?: true
    evaluatedStudentId?: true
    criterionId?: true
    score?: true
    _all?: true
  }

  export type EvaluationResponseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EvaluationResponse to aggregate.
     */
    where?: EvaluationResponseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EvaluationResponses to fetch.
     */
    orderBy?: EvaluationResponseOrderByWithRelationInput | EvaluationResponseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EvaluationResponseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EvaluationResponses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EvaluationResponses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned EvaluationResponses
    **/
    _count?: true | EvaluationResponseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EvaluationResponseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EvaluationResponseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EvaluationResponseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EvaluationResponseMaxAggregateInputType
  }

  export type GetEvaluationResponseAggregateType<T extends EvaluationResponseAggregateArgs> = {
        [P in keyof T & keyof AggregateEvaluationResponse]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEvaluationResponse[P]>
      : GetScalarType<T[P], AggregateEvaluationResponse[P]>
  }




  export type EvaluationResponseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EvaluationResponseWhereInput
    orderBy?: EvaluationResponseOrderByWithAggregationInput | EvaluationResponseOrderByWithAggregationInput[]
    by: EvaluationResponseScalarFieldEnum[] | EvaluationResponseScalarFieldEnum
    having?: EvaluationResponseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EvaluationResponseCountAggregateInputType | true
    _avg?: EvaluationResponseAvgAggregateInputType
    _sum?: EvaluationResponseSumAggregateInputType
    _min?: EvaluationResponseMinAggregateInputType
    _max?: EvaluationResponseMaxAggregateInputType
  }

  export type EvaluationResponseGroupByOutputType = {
    id: number
    evaluationId: number
    evaluatorStudentId: number
    evaluatedStudentId: number
    criterionId: number
    score: number
    _count: EvaluationResponseCountAggregateOutputType | null
    _avg: EvaluationResponseAvgAggregateOutputType | null
    _sum: EvaluationResponseSumAggregateOutputType | null
    _min: EvaluationResponseMinAggregateOutputType | null
    _max: EvaluationResponseMaxAggregateOutputType | null
  }

  type GetEvaluationResponseGroupByPayload<T extends EvaluationResponseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EvaluationResponseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EvaluationResponseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EvaluationResponseGroupByOutputType[P]>
            : GetScalarType<T[P], EvaluationResponseGroupByOutputType[P]>
        }
      >
    >


  export type EvaluationResponseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    evaluationId?: boolean
    evaluatorStudentId?: boolean
    evaluatedStudentId?: boolean
    criterionId?: boolean
    score?: boolean
    evaluation?: boolean | EvaluationDefaultArgs<ExtArgs>
    evaluatorStudent?: boolean | StudentDefaultArgs<ExtArgs>
    evaluatedStudent?: boolean | StudentDefaultArgs<ExtArgs>
    criterion?: boolean | EvaluationCriteriaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["evaluationResponse"]>



  export type EvaluationResponseSelectScalar = {
    id?: boolean
    evaluationId?: boolean
    evaluatorStudentId?: boolean
    evaluatedStudentId?: boolean
    criterionId?: boolean
    score?: boolean
  }

  export type EvaluationResponseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "evaluationId" | "evaluatorStudentId" | "evaluatedStudentId" | "criterionId" | "score", ExtArgs["result"]["evaluationResponse"]>
  export type EvaluationResponseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    evaluation?: boolean | EvaluationDefaultArgs<ExtArgs>
    evaluatorStudent?: boolean | StudentDefaultArgs<ExtArgs>
    evaluatedStudent?: boolean | StudentDefaultArgs<ExtArgs>
    criterion?: boolean | EvaluationCriteriaDefaultArgs<ExtArgs>
  }

  export type $EvaluationResponsePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "EvaluationResponse"
    objects: {
      evaluation: Prisma.$EvaluationPayload<ExtArgs>
      evaluatorStudent: Prisma.$StudentPayload<ExtArgs>
      evaluatedStudent: Prisma.$StudentPayload<ExtArgs>
      criterion: Prisma.$EvaluationCriteriaPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      evaluationId: number
      evaluatorStudentId: number
      evaluatedStudentId: number
      criterionId: number
      score: number
    }, ExtArgs["result"]["evaluationResponse"]>
    composites: {}
  }

  type EvaluationResponseGetPayload<S extends boolean | null | undefined | EvaluationResponseDefaultArgs> = $Result.GetResult<Prisma.$EvaluationResponsePayload, S>

  type EvaluationResponseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EvaluationResponseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EvaluationResponseCountAggregateInputType | true
    }

  export interface EvaluationResponseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['EvaluationResponse'], meta: { name: 'EvaluationResponse' } }
    /**
     * Find zero or one EvaluationResponse that matches the filter.
     * @param {EvaluationResponseFindUniqueArgs} args - Arguments to find a EvaluationResponse
     * @example
     * // Get one EvaluationResponse
     * const evaluationResponse = await prisma.evaluationResponse.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EvaluationResponseFindUniqueArgs>(args: SelectSubset<T, EvaluationResponseFindUniqueArgs<ExtArgs>>): Prisma__EvaluationResponseClient<$Result.GetResult<Prisma.$EvaluationResponsePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EvaluationResponse that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EvaluationResponseFindUniqueOrThrowArgs} args - Arguments to find a EvaluationResponse
     * @example
     * // Get one EvaluationResponse
     * const evaluationResponse = await prisma.evaluationResponse.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EvaluationResponseFindUniqueOrThrowArgs>(args: SelectSubset<T, EvaluationResponseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EvaluationResponseClient<$Result.GetResult<Prisma.$EvaluationResponsePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EvaluationResponse that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluationResponseFindFirstArgs} args - Arguments to find a EvaluationResponse
     * @example
     * // Get one EvaluationResponse
     * const evaluationResponse = await prisma.evaluationResponse.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EvaluationResponseFindFirstArgs>(args?: SelectSubset<T, EvaluationResponseFindFirstArgs<ExtArgs>>): Prisma__EvaluationResponseClient<$Result.GetResult<Prisma.$EvaluationResponsePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EvaluationResponse that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluationResponseFindFirstOrThrowArgs} args - Arguments to find a EvaluationResponse
     * @example
     * // Get one EvaluationResponse
     * const evaluationResponse = await prisma.evaluationResponse.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EvaluationResponseFindFirstOrThrowArgs>(args?: SelectSubset<T, EvaluationResponseFindFirstOrThrowArgs<ExtArgs>>): Prisma__EvaluationResponseClient<$Result.GetResult<Prisma.$EvaluationResponsePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EvaluationResponses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluationResponseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EvaluationResponses
     * const evaluationResponses = await prisma.evaluationResponse.findMany()
     * 
     * // Get first 10 EvaluationResponses
     * const evaluationResponses = await prisma.evaluationResponse.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const evaluationResponseWithIdOnly = await prisma.evaluationResponse.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EvaluationResponseFindManyArgs>(args?: SelectSubset<T, EvaluationResponseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EvaluationResponsePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EvaluationResponse.
     * @param {EvaluationResponseCreateArgs} args - Arguments to create a EvaluationResponse.
     * @example
     * // Create one EvaluationResponse
     * const EvaluationResponse = await prisma.evaluationResponse.create({
     *   data: {
     *     // ... data to create a EvaluationResponse
     *   }
     * })
     * 
     */
    create<T extends EvaluationResponseCreateArgs>(args: SelectSubset<T, EvaluationResponseCreateArgs<ExtArgs>>): Prisma__EvaluationResponseClient<$Result.GetResult<Prisma.$EvaluationResponsePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EvaluationResponses.
     * @param {EvaluationResponseCreateManyArgs} args - Arguments to create many EvaluationResponses.
     * @example
     * // Create many EvaluationResponses
     * const evaluationResponse = await prisma.evaluationResponse.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EvaluationResponseCreateManyArgs>(args?: SelectSubset<T, EvaluationResponseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a EvaluationResponse.
     * @param {EvaluationResponseDeleteArgs} args - Arguments to delete one EvaluationResponse.
     * @example
     * // Delete one EvaluationResponse
     * const EvaluationResponse = await prisma.evaluationResponse.delete({
     *   where: {
     *     // ... filter to delete one EvaluationResponse
     *   }
     * })
     * 
     */
    delete<T extends EvaluationResponseDeleteArgs>(args: SelectSubset<T, EvaluationResponseDeleteArgs<ExtArgs>>): Prisma__EvaluationResponseClient<$Result.GetResult<Prisma.$EvaluationResponsePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EvaluationResponse.
     * @param {EvaluationResponseUpdateArgs} args - Arguments to update one EvaluationResponse.
     * @example
     * // Update one EvaluationResponse
     * const evaluationResponse = await prisma.evaluationResponse.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EvaluationResponseUpdateArgs>(args: SelectSubset<T, EvaluationResponseUpdateArgs<ExtArgs>>): Prisma__EvaluationResponseClient<$Result.GetResult<Prisma.$EvaluationResponsePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EvaluationResponses.
     * @param {EvaluationResponseDeleteManyArgs} args - Arguments to filter EvaluationResponses to delete.
     * @example
     * // Delete a few EvaluationResponses
     * const { count } = await prisma.evaluationResponse.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EvaluationResponseDeleteManyArgs>(args?: SelectSubset<T, EvaluationResponseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EvaluationResponses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluationResponseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EvaluationResponses
     * const evaluationResponse = await prisma.evaluationResponse.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EvaluationResponseUpdateManyArgs>(args: SelectSubset<T, EvaluationResponseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one EvaluationResponse.
     * @param {EvaluationResponseUpsertArgs} args - Arguments to update or create a EvaluationResponse.
     * @example
     * // Update or create a EvaluationResponse
     * const evaluationResponse = await prisma.evaluationResponse.upsert({
     *   create: {
     *     // ... data to create a EvaluationResponse
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EvaluationResponse we want to update
     *   }
     * })
     */
    upsert<T extends EvaluationResponseUpsertArgs>(args: SelectSubset<T, EvaluationResponseUpsertArgs<ExtArgs>>): Prisma__EvaluationResponseClient<$Result.GetResult<Prisma.$EvaluationResponsePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EvaluationResponses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluationResponseCountArgs} args - Arguments to filter EvaluationResponses to count.
     * @example
     * // Count the number of EvaluationResponses
     * const count = await prisma.evaluationResponse.count({
     *   where: {
     *     // ... the filter for the EvaluationResponses we want to count
     *   }
     * })
    **/
    count<T extends EvaluationResponseCountArgs>(
      args?: Subset<T, EvaluationResponseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EvaluationResponseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EvaluationResponse.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluationResponseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EvaluationResponseAggregateArgs>(args: Subset<T, EvaluationResponseAggregateArgs>): Prisma.PrismaPromise<GetEvaluationResponseAggregateType<T>>

    /**
     * Group by EvaluationResponse.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EvaluationResponseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EvaluationResponseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EvaluationResponseGroupByArgs['orderBy'] }
        : { orderBy?: EvaluationResponseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EvaluationResponseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEvaluationResponseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the EvaluationResponse model
   */
  readonly fields: EvaluationResponseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for EvaluationResponse.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EvaluationResponseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    evaluation<T extends EvaluationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EvaluationDefaultArgs<ExtArgs>>): Prisma__EvaluationClient<$Result.GetResult<Prisma.$EvaluationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    evaluatorStudent<T extends StudentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentDefaultArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    evaluatedStudent<T extends StudentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentDefaultArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    criterion<T extends EvaluationCriteriaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EvaluationCriteriaDefaultArgs<ExtArgs>>): Prisma__EvaluationCriteriaClient<$Result.GetResult<Prisma.$EvaluationCriteriaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the EvaluationResponse model
   */
  interface EvaluationResponseFieldRefs {
    readonly id: FieldRef<"EvaluationResponse", 'Int'>
    readonly evaluationId: FieldRef<"EvaluationResponse", 'Int'>
    readonly evaluatorStudentId: FieldRef<"EvaluationResponse", 'Int'>
    readonly evaluatedStudentId: FieldRef<"EvaluationResponse", 'Int'>
    readonly criterionId: FieldRef<"EvaluationResponse", 'Int'>
    readonly score: FieldRef<"EvaluationResponse", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * EvaluationResponse findUnique
   */
  export type EvaluationResponseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationResponse
     */
    select?: EvaluationResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvaluationResponse
     */
    omit?: EvaluationResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationResponseInclude<ExtArgs> | null
    /**
     * Filter, which EvaluationResponse to fetch.
     */
    where: EvaluationResponseWhereUniqueInput
  }

  /**
   * EvaluationResponse findUniqueOrThrow
   */
  export type EvaluationResponseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationResponse
     */
    select?: EvaluationResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvaluationResponse
     */
    omit?: EvaluationResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationResponseInclude<ExtArgs> | null
    /**
     * Filter, which EvaluationResponse to fetch.
     */
    where: EvaluationResponseWhereUniqueInput
  }

  /**
   * EvaluationResponse findFirst
   */
  export type EvaluationResponseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationResponse
     */
    select?: EvaluationResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvaluationResponse
     */
    omit?: EvaluationResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationResponseInclude<ExtArgs> | null
    /**
     * Filter, which EvaluationResponse to fetch.
     */
    where?: EvaluationResponseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EvaluationResponses to fetch.
     */
    orderBy?: EvaluationResponseOrderByWithRelationInput | EvaluationResponseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EvaluationResponses.
     */
    cursor?: EvaluationResponseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EvaluationResponses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EvaluationResponses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EvaluationResponses.
     */
    distinct?: EvaluationResponseScalarFieldEnum | EvaluationResponseScalarFieldEnum[]
  }

  /**
   * EvaluationResponse findFirstOrThrow
   */
  export type EvaluationResponseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationResponse
     */
    select?: EvaluationResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvaluationResponse
     */
    omit?: EvaluationResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationResponseInclude<ExtArgs> | null
    /**
     * Filter, which EvaluationResponse to fetch.
     */
    where?: EvaluationResponseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EvaluationResponses to fetch.
     */
    orderBy?: EvaluationResponseOrderByWithRelationInput | EvaluationResponseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for EvaluationResponses.
     */
    cursor?: EvaluationResponseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EvaluationResponses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EvaluationResponses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of EvaluationResponses.
     */
    distinct?: EvaluationResponseScalarFieldEnum | EvaluationResponseScalarFieldEnum[]
  }

  /**
   * EvaluationResponse findMany
   */
  export type EvaluationResponseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationResponse
     */
    select?: EvaluationResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvaluationResponse
     */
    omit?: EvaluationResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationResponseInclude<ExtArgs> | null
    /**
     * Filter, which EvaluationResponses to fetch.
     */
    where?: EvaluationResponseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of EvaluationResponses to fetch.
     */
    orderBy?: EvaluationResponseOrderByWithRelationInput | EvaluationResponseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing EvaluationResponses.
     */
    cursor?: EvaluationResponseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` EvaluationResponses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` EvaluationResponses.
     */
    skip?: number
    distinct?: EvaluationResponseScalarFieldEnum | EvaluationResponseScalarFieldEnum[]
  }

  /**
   * EvaluationResponse create
   */
  export type EvaluationResponseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationResponse
     */
    select?: EvaluationResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvaluationResponse
     */
    omit?: EvaluationResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationResponseInclude<ExtArgs> | null
    /**
     * The data needed to create a EvaluationResponse.
     */
    data: XOR<EvaluationResponseCreateInput, EvaluationResponseUncheckedCreateInput>
  }

  /**
   * EvaluationResponse createMany
   */
  export type EvaluationResponseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many EvaluationResponses.
     */
    data: EvaluationResponseCreateManyInput | EvaluationResponseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * EvaluationResponse update
   */
  export type EvaluationResponseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationResponse
     */
    select?: EvaluationResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvaluationResponse
     */
    omit?: EvaluationResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationResponseInclude<ExtArgs> | null
    /**
     * The data needed to update a EvaluationResponse.
     */
    data: XOR<EvaluationResponseUpdateInput, EvaluationResponseUncheckedUpdateInput>
    /**
     * Choose, which EvaluationResponse to update.
     */
    where: EvaluationResponseWhereUniqueInput
  }

  /**
   * EvaluationResponse updateMany
   */
  export type EvaluationResponseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update EvaluationResponses.
     */
    data: XOR<EvaluationResponseUpdateManyMutationInput, EvaluationResponseUncheckedUpdateManyInput>
    /**
     * Filter which EvaluationResponses to update
     */
    where?: EvaluationResponseWhereInput
    /**
     * Limit how many EvaluationResponses to update.
     */
    limit?: number
  }

  /**
   * EvaluationResponse upsert
   */
  export type EvaluationResponseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationResponse
     */
    select?: EvaluationResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvaluationResponse
     */
    omit?: EvaluationResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationResponseInclude<ExtArgs> | null
    /**
     * The filter to search for the EvaluationResponse to update in case it exists.
     */
    where: EvaluationResponseWhereUniqueInput
    /**
     * In case the EvaluationResponse found by the `where` argument doesn't exist, create a new EvaluationResponse with this data.
     */
    create: XOR<EvaluationResponseCreateInput, EvaluationResponseUncheckedCreateInput>
    /**
     * In case the EvaluationResponse was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EvaluationResponseUpdateInput, EvaluationResponseUncheckedUpdateInput>
  }

  /**
   * EvaluationResponse delete
   */
  export type EvaluationResponseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationResponse
     */
    select?: EvaluationResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvaluationResponse
     */
    omit?: EvaluationResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationResponseInclude<ExtArgs> | null
    /**
     * Filter which EvaluationResponse to delete.
     */
    where: EvaluationResponseWhereUniqueInput
  }

  /**
   * EvaluationResponse deleteMany
   */
  export type EvaluationResponseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which EvaluationResponses to delete
     */
    where?: EvaluationResponseWhereInput
    /**
     * Limit how many EvaluationResponses to delete.
     */
    limit?: number
  }

  /**
   * EvaluationResponse without action
   */
  export type EvaluationResponseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EvaluationResponse
     */
    select?: EvaluationResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the EvaluationResponse
     */
    omit?: EvaluationResponseOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EvaluationResponseInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password',
    role: 'role'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SectionScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    createdBy: 'createdBy',
    createdAt: 'createdAt'
  };

  export type SectionScalarFieldEnum = (typeof SectionScalarFieldEnum)[keyof typeof SectionScalarFieldEnum]


  export const StudentScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    studentId: 'studentId',
    sectionId: 'sectionId'
  };

  export type StudentScalarFieldEnum = (typeof StudentScalarFieldEnum)[keyof typeof StudentScalarFieldEnum]


  export const EvaluationScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    sectionId: 'sectionId'
  };

  export type EvaluationScalarFieldEnum = (typeof EvaluationScalarFieldEnum)[keyof typeof EvaluationScalarFieldEnum]


  export const EvaluationCriteriaScalarFieldEnum: {
    id: 'id',
    name: 'name',
    evaluationId: 'evaluationId'
  };

  export type EvaluationCriteriaScalarFieldEnum = (typeof EvaluationCriteriaScalarFieldEnum)[keyof typeof EvaluationCriteriaScalarFieldEnum]


  export const EvaluationResponseScalarFieldEnum: {
    id: 'id',
    evaluationId: 'evaluationId',
    evaluatorStudentId: 'evaluatorStudentId',
    evaluatedStudentId: 'evaluatedStudentId',
    criterionId: 'criterionId',
    score: 'score'
  };

  export type EvaluationResponseScalarFieldEnum = (typeof EvaluationResponseScalarFieldEnum)[keyof typeof EvaluationResponseScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const UserOrderByRelevanceFieldEnum: {
    name: 'name',
    email: 'email',
    password: 'password',
    role: 'role'
  };

  export type UserOrderByRelevanceFieldEnum = (typeof UserOrderByRelevanceFieldEnum)[keyof typeof UserOrderByRelevanceFieldEnum]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const SectionOrderByRelevanceFieldEnum: {
    name: 'name',
    description: 'description'
  };

  export type SectionOrderByRelevanceFieldEnum = (typeof SectionOrderByRelevanceFieldEnum)[keyof typeof SectionOrderByRelevanceFieldEnum]


  export const StudentOrderByRelevanceFieldEnum: {
    name: 'name',
    email: 'email',
    studentId: 'studentId'
  };

  export type StudentOrderByRelevanceFieldEnum = (typeof StudentOrderByRelevanceFieldEnum)[keyof typeof StudentOrderByRelevanceFieldEnum]


  export const EvaluationOrderByRelevanceFieldEnum: {
    title: 'title',
    description: 'description'
  };

  export type EvaluationOrderByRelevanceFieldEnum = (typeof EvaluationOrderByRelevanceFieldEnum)[keyof typeof EvaluationOrderByRelevanceFieldEnum]


  export const EvaluationCriteriaOrderByRelevanceFieldEnum: {
    name: 'name'
  };

  export type EvaluationCriteriaOrderByRelevanceFieldEnum = (typeof EvaluationCriteriaOrderByRelevanceFieldEnum)[keyof typeof EvaluationCriteriaOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    sections?: SectionListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    sections?: SectionOrderByRelationAggregateInput
    _relevance?: UserOrderByRelevanceInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    sections?: SectionListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: StringWithAggregatesFilter<"User"> | string
  }

  export type SectionWhereInput = {
    AND?: SectionWhereInput | SectionWhereInput[]
    OR?: SectionWhereInput[]
    NOT?: SectionWhereInput | SectionWhereInput[]
    id?: IntFilter<"Section"> | number
    name?: StringFilter<"Section"> | string
    description?: StringNullableFilter<"Section"> | string | null
    createdBy?: IntFilter<"Section"> | number
    createdAt?: DateTimeFilter<"Section"> | Date | string
    instructor?: XOR<UserScalarRelationFilter, UserWhereInput>
    students?: StudentListRelationFilter
    evaluations?: EvaluationListRelationFilter
  }

  export type SectionOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    instructor?: UserOrderByWithRelationInput
    students?: StudentOrderByRelationAggregateInput
    evaluations?: EvaluationOrderByRelationAggregateInput
    _relevance?: SectionOrderByRelevanceInput
  }

  export type SectionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SectionWhereInput | SectionWhereInput[]
    OR?: SectionWhereInput[]
    NOT?: SectionWhereInput | SectionWhereInput[]
    name?: StringFilter<"Section"> | string
    description?: StringNullableFilter<"Section"> | string | null
    createdBy?: IntFilter<"Section"> | number
    createdAt?: DateTimeFilter<"Section"> | Date | string
    instructor?: XOR<UserScalarRelationFilter, UserWhereInput>
    students?: StudentListRelationFilter
    evaluations?: EvaluationListRelationFilter
  }, "id">

  export type SectionOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    _count?: SectionCountOrderByAggregateInput
    _avg?: SectionAvgOrderByAggregateInput
    _max?: SectionMaxOrderByAggregateInput
    _min?: SectionMinOrderByAggregateInput
    _sum?: SectionSumOrderByAggregateInput
  }

  export type SectionScalarWhereWithAggregatesInput = {
    AND?: SectionScalarWhereWithAggregatesInput | SectionScalarWhereWithAggregatesInput[]
    OR?: SectionScalarWhereWithAggregatesInput[]
    NOT?: SectionScalarWhereWithAggregatesInput | SectionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Section"> | number
    name?: StringWithAggregatesFilter<"Section"> | string
    description?: StringNullableWithAggregatesFilter<"Section"> | string | null
    createdBy?: IntWithAggregatesFilter<"Section"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Section"> | Date | string
  }

  export type StudentWhereInput = {
    AND?: StudentWhereInput | StudentWhereInput[]
    OR?: StudentWhereInput[]
    NOT?: StudentWhereInput | StudentWhereInput[]
    id?: IntFilter<"Student"> | number
    name?: StringFilter<"Student"> | string
    email?: StringFilter<"Student"> | string
    studentId?: StringFilter<"Student"> | string
    sectionId?: IntFilter<"Student"> | number
    section?: XOR<SectionScalarRelationFilter, SectionWhereInput>
    evaluationsGiven?: EvaluationResponseListRelationFilter
    evaluationsReceived?: EvaluationResponseListRelationFilter
  }

  export type StudentOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    studentId?: SortOrder
    sectionId?: SortOrder
    section?: SectionOrderByWithRelationInput
    evaluationsGiven?: EvaluationResponseOrderByRelationAggregateInput
    evaluationsReceived?: EvaluationResponseOrderByRelationAggregateInput
    _relevance?: StudentOrderByRelevanceInput
  }

  export type StudentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: StudentWhereInput | StudentWhereInput[]
    OR?: StudentWhereInput[]
    NOT?: StudentWhereInput | StudentWhereInput[]
    name?: StringFilter<"Student"> | string
    email?: StringFilter<"Student"> | string
    studentId?: StringFilter<"Student"> | string
    sectionId?: IntFilter<"Student"> | number
    section?: XOR<SectionScalarRelationFilter, SectionWhereInput>
    evaluationsGiven?: EvaluationResponseListRelationFilter
    evaluationsReceived?: EvaluationResponseListRelationFilter
  }, "id">

  export type StudentOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    studentId?: SortOrder
    sectionId?: SortOrder
    _count?: StudentCountOrderByAggregateInput
    _avg?: StudentAvgOrderByAggregateInput
    _max?: StudentMaxOrderByAggregateInput
    _min?: StudentMinOrderByAggregateInput
    _sum?: StudentSumOrderByAggregateInput
  }

  export type StudentScalarWhereWithAggregatesInput = {
    AND?: StudentScalarWhereWithAggregatesInput | StudentScalarWhereWithAggregatesInput[]
    OR?: StudentScalarWhereWithAggregatesInput[]
    NOT?: StudentScalarWhereWithAggregatesInput | StudentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Student"> | number
    name?: StringWithAggregatesFilter<"Student"> | string
    email?: StringWithAggregatesFilter<"Student"> | string
    studentId?: StringWithAggregatesFilter<"Student"> | string
    sectionId?: IntWithAggregatesFilter<"Student"> | number
  }

  export type EvaluationWhereInput = {
    AND?: EvaluationWhereInput | EvaluationWhereInput[]
    OR?: EvaluationWhereInput[]
    NOT?: EvaluationWhereInput | EvaluationWhereInput[]
    id?: IntFilter<"Evaluation"> | number
    title?: StringFilter<"Evaluation"> | string
    description?: StringNullableFilter<"Evaluation"> | string | null
    sectionId?: IntFilter<"Evaluation"> | number
    section?: XOR<SectionScalarRelationFilter, SectionWhereInput>
    criteria?: EvaluationCriteriaListRelationFilter
    responses?: EvaluationResponseListRelationFilter
  }

  export type EvaluationOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    sectionId?: SortOrder
    section?: SectionOrderByWithRelationInput
    criteria?: EvaluationCriteriaOrderByRelationAggregateInput
    responses?: EvaluationResponseOrderByRelationAggregateInput
    _relevance?: EvaluationOrderByRelevanceInput
  }

  export type EvaluationWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: EvaluationWhereInput | EvaluationWhereInput[]
    OR?: EvaluationWhereInput[]
    NOT?: EvaluationWhereInput | EvaluationWhereInput[]
    title?: StringFilter<"Evaluation"> | string
    description?: StringNullableFilter<"Evaluation"> | string | null
    sectionId?: IntFilter<"Evaluation"> | number
    section?: XOR<SectionScalarRelationFilter, SectionWhereInput>
    criteria?: EvaluationCriteriaListRelationFilter
    responses?: EvaluationResponseListRelationFilter
  }, "id">

  export type EvaluationOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    sectionId?: SortOrder
    _count?: EvaluationCountOrderByAggregateInput
    _avg?: EvaluationAvgOrderByAggregateInput
    _max?: EvaluationMaxOrderByAggregateInput
    _min?: EvaluationMinOrderByAggregateInput
    _sum?: EvaluationSumOrderByAggregateInput
  }

  export type EvaluationScalarWhereWithAggregatesInput = {
    AND?: EvaluationScalarWhereWithAggregatesInput | EvaluationScalarWhereWithAggregatesInput[]
    OR?: EvaluationScalarWhereWithAggregatesInput[]
    NOT?: EvaluationScalarWhereWithAggregatesInput | EvaluationScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Evaluation"> | number
    title?: StringWithAggregatesFilter<"Evaluation"> | string
    description?: StringNullableWithAggregatesFilter<"Evaluation"> | string | null
    sectionId?: IntWithAggregatesFilter<"Evaluation"> | number
  }

  export type EvaluationCriteriaWhereInput = {
    AND?: EvaluationCriteriaWhereInput | EvaluationCriteriaWhereInput[]
    OR?: EvaluationCriteriaWhereInput[]
    NOT?: EvaluationCriteriaWhereInput | EvaluationCriteriaWhereInput[]
    id?: IntFilter<"EvaluationCriteria"> | number
    name?: StringFilter<"EvaluationCriteria"> | string
    evaluationId?: IntFilter<"EvaluationCriteria"> | number
    evaluation?: XOR<EvaluationScalarRelationFilter, EvaluationWhereInput>
    responses?: EvaluationResponseListRelationFilter
  }

  export type EvaluationCriteriaOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    evaluationId?: SortOrder
    evaluation?: EvaluationOrderByWithRelationInput
    responses?: EvaluationResponseOrderByRelationAggregateInput
    _relevance?: EvaluationCriteriaOrderByRelevanceInput
  }

  export type EvaluationCriteriaWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: EvaluationCriteriaWhereInput | EvaluationCriteriaWhereInput[]
    OR?: EvaluationCriteriaWhereInput[]
    NOT?: EvaluationCriteriaWhereInput | EvaluationCriteriaWhereInput[]
    name?: StringFilter<"EvaluationCriteria"> | string
    evaluationId?: IntFilter<"EvaluationCriteria"> | number
    evaluation?: XOR<EvaluationScalarRelationFilter, EvaluationWhereInput>
    responses?: EvaluationResponseListRelationFilter
  }, "id">

  export type EvaluationCriteriaOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    evaluationId?: SortOrder
    _count?: EvaluationCriteriaCountOrderByAggregateInput
    _avg?: EvaluationCriteriaAvgOrderByAggregateInput
    _max?: EvaluationCriteriaMaxOrderByAggregateInput
    _min?: EvaluationCriteriaMinOrderByAggregateInput
    _sum?: EvaluationCriteriaSumOrderByAggregateInput
  }

  export type EvaluationCriteriaScalarWhereWithAggregatesInput = {
    AND?: EvaluationCriteriaScalarWhereWithAggregatesInput | EvaluationCriteriaScalarWhereWithAggregatesInput[]
    OR?: EvaluationCriteriaScalarWhereWithAggregatesInput[]
    NOT?: EvaluationCriteriaScalarWhereWithAggregatesInput | EvaluationCriteriaScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"EvaluationCriteria"> | number
    name?: StringWithAggregatesFilter<"EvaluationCriteria"> | string
    evaluationId?: IntWithAggregatesFilter<"EvaluationCriteria"> | number
  }

  export type EvaluationResponseWhereInput = {
    AND?: EvaluationResponseWhereInput | EvaluationResponseWhereInput[]
    OR?: EvaluationResponseWhereInput[]
    NOT?: EvaluationResponseWhereInput | EvaluationResponseWhereInput[]
    id?: IntFilter<"EvaluationResponse"> | number
    evaluationId?: IntFilter<"EvaluationResponse"> | number
    evaluatorStudentId?: IntFilter<"EvaluationResponse"> | number
    evaluatedStudentId?: IntFilter<"EvaluationResponse"> | number
    criterionId?: IntFilter<"EvaluationResponse"> | number
    score?: IntFilter<"EvaluationResponse"> | number
    evaluation?: XOR<EvaluationScalarRelationFilter, EvaluationWhereInput>
    evaluatorStudent?: XOR<StudentScalarRelationFilter, StudentWhereInput>
    evaluatedStudent?: XOR<StudentScalarRelationFilter, StudentWhereInput>
    criterion?: XOR<EvaluationCriteriaScalarRelationFilter, EvaluationCriteriaWhereInput>
  }

  export type EvaluationResponseOrderByWithRelationInput = {
    id?: SortOrder
    evaluationId?: SortOrder
    evaluatorStudentId?: SortOrder
    evaluatedStudentId?: SortOrder
    criterionId?: SortOrder
    score?: SortOrder
    evaluation?: EvaluationOrderByWithRelationInput
    evaluatorStudent?: StudentOrderByWithRelationInput
    evaluatedStudent?: StudentOrderByWithRelationInput
    criterion?: EvaluationCriteriaOrderByWithRelationInput
  }

  export type EvaluationResponseWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: EvaluationResponseWhereInput | EvaluationResponseWhereInput[]
    OR?: EvaluationResponseWhereInput[]
    NOT?: EvaluationResponseWhereInput | EvaluationResponseWhereInput[]
    evaluationId?: IntFilter<"EvaluationResponse"> | number
    evaluatorStudentId?: IntFilter<"EvaluationResponse"> | number
    evaluatedStudentId?: IntFilter<"EvaluationResponse"> | number
    criterionId?: IntFilter<"EvaluationResponse"> | number
    score?: IntFilter<"EvaluationResponse"> | number
    evaluation?: XOR<EvaluationScalarRelationFilter, EvaluationWhereInput>
    evaluatorStudent?: XOR<StudentScalarRelationFilter, StudentWhereInput>
    evaluatedStudent?: XOR<StudentScalarRelationFilter, StudentWhereInput>
    criterion?: XOR<EvaluationCriteriaScalarRelationFilter, EvaluationCriteriaWhereInput>
  }, "id">

  export type EvaluationResponseOrderByWithAggregationInput = {
    id?: SortOrder
    evaluationId?: SortOrder
    evaluatorStudentId?: SortOrder
    evaluatedStudentId?: SortOrder
    criterionId?: SortOrder
    score?: SortOrder
    _count?: EvaluationResponseCountOrderByAggregateInput
    _avg?: EvaluationResponseAvgOrderByAggregateInput
    _max?: EvaluationResponseMaxOrderByAggregateInput
    _min?: EvaluationResponseMinOrderByAggregateInput
    _sum?: EvaluationResponseSumOrderByAggregateInput
  }

  export type EvaluationResponseScalarWhereWithAggregatesInput = {
    AND?: EvaluationResponseScalarWhereWithAggregatesInput | EvaluationResponseScalarWhereWithAggregatesInput[]
    OR?: EvaluationResponseScalarWhereWithAggregatesInput[]
    NOT?: EvaluationResponseScalarWhereWithAggregatesInput | EvaluationResponseScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"EvaluationResponse"> | number
    evaluationId?: IntWithAggregatesFilter<"EvaluationResponse"> | number
    evaluatorStudentId?: IntWithAggregatesFilter<"EvaluationResponse"> | number
    evaluatedStudentId?: IntWithAggregatesFilter<"EvaluationResponse"> | number
    criterionId?: IntWithAggregatesFilter<"EvaluationResponse"> | number
    score?: IntWithAggregatesFilter<"EvaluationResponse"> | number
  }

  export type UserCreateInput = {
    name: string
    email: string
    password: string
    role: string
    sections?: SectionCreateNestedManyWithoutInstructorInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    name: string
    email: string
    password: string
    role: string
    sections?: SectionUncheckedCreateNestedManyWithoutInstructorInput
  }

  export type UserUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    sections?: SectionUpdateManyWithoutInstructorNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    sections?: SectionUncheckedUpdateManyWithoutInstructorNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    name: string
    email: string
    password: string
    role: string
  }

  export type UserUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
  }

  export type SectionCreateInput = {
    name: string
    description?: string | null
    createdAt?: Date | string
    instructor: UserCreateNestedOneWithoutSectionsInput
    students?: StudentCreateNestedManyWithoutSectionInput
    evaluations?: EvaluationCreateNestedManyWithoutSectionInput
  }

  export type SectionUncheckedCreateInput = {
    id?: number
    name: string
    description?: string | null
    createdBy: number
    createdAt?: Date | string
    students?: StudentUncheckedCreateNestedManyWithoutSectionInput
    evaluations?: EvaluationUncheckedCreateNestedManyWithoutSectionInput
  }

  export type SectionUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    instructor?: UserUpdateOneRequiredWithoutSectionsNestedInput
    students?: StudentUpdateManyWithoutSectionNestedInput
    evaluations?: EvaluationUpdateManyWithoutSectionNestedInput
  }

  export type SectionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    students?: StudentUncheckedUpdateManyWithoutSectionNestedInput
    evaluations?: EvaluationUncheckedUpdateManyWithoutSectionNestedInput
  }

  export type SectionCreateManyInput = {
    id?: number
    name: string
    description?: string | null
    createdBy: number
    createdAt?: Date | string
  }

  export type SectionUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SectionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentCreateInput = {
    name: string
    email: string
    studentId: string
    section: SectionCreateNestedOneWithoutStudentsInput
    evaluationsGiven?: EvaluationResponseCreateNestedManyWithoutEvaluatorStudentInput
    evaluationsReceived?: EvaluationResponseCreateNestedManyWithoutEvaluatedStudentInput
  }

  export type StudentUncheckedCreateInput = {
    id?: number
    name: string
    email: string
    studentId: string
    sectionId: number
    evaluationsGiven?: EvaluationResponseUncheckedCreateNestedManyWithoutEvaluatorStudentInput
    evaluationsReceived?: EvaluationResponseUncheckedCreateNestedManyWithoutEvaluatedStudentInput
  }

  export type StudentUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    section?: SectionUpdateOneRequiredWithoutStudentsNestedInput
    evaluationsGiven?: EvaluationResponseUpdateManyWithoutEvaluatorStudentNestedInput
    evaluationsReceived?: EvaluationResponseUpdateManyWithoutEvaluatedStudentNestedInput
  }

  export type StudentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    sectionId?: IntFieldUpdateOperationsInput | number
    evaluationsGiven?: EvaluationResponseUncheckedUpdateManyWithoutEvaluatorStudentNestedInput
    evaluationsReceived?: EvaluationResponseUncheckedUpdateManyWithoutEvaluatedStudentNestedInput
  }

  export type StudentCreateManyInput = {
    id?: number
    name: string
    email: string
    studentId: string
    sectionId: number
  }

  export type StudentUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
  }

  export type StudentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    sectionId?: IntFieldUpdateOperationsInput | number
  }

  export type EvaluationCreateInput = {
    title: string
    description?: string | null
    section: SectionCreateNestedOneWithoutEvaluationsInput
    criteria?: EvaluationCriteriaCreateNestedManyWithoutEvaluationInput
    responses?: EvaluationResponseCreateNestedManyWithoutEvaluationInput
  }

  export type EvaluationUncheckedCreateInput = {
    id?: number
    title: string
    description?: string | null
    sectionId: number
    criteria?: EvaluationCriteriaUncheckedCreateNestedManyWithoutEvaluationInput
    responses?: EvaluationResponseUncheckedCreateNestedManyWithoutEvaluationInput
  }

  export type EvaluationUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    section?: SectionUpdateOneRequiredWithoutEvaluationsNestedInput
    criteria?: EvaluationCriteriaUpdateManyWithoutEvaluationNestedInput
    responses?: EvaluationResponseUpdateManyWithoutEvaluationNestedInput
  }

  export type EvaluationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sectionId?: IntFieldUpdateOperationsInput | number
    criteria?: EvaluationCriteriaUncheckedUpdateManyWithoutEvaluationNestedInput
    responses?: EvaluationResponseUncheckedUpdateManyWithoutEvaluationNestedInput
  }

  export type EvaluationCreateManyInput = {
    id?: number
    title: string
    description?: string | null
    sectionId: number
  }

  export type EvaluationUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EvaluationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sectionId?: IntFieldUpdateOperationsInput | number
  }

  export type EvaluationCriteriaCreateInput = {
    name: string
    evaluation: EvaluationCreateNestedOneWithoutCriteriaInput
    responses?: EvaluationResponseCreateNestedManyWithoutCriterionInput
  }

  export type EvaluationCriteriaUncheckedCreateInput = {
    id?: number
    name: string
    evaluationId: number
    responses?: EvaluationResponseUncheckedCreateNestedManyWithoutCriterionInput
  }

  export type EvaluationCriteriaUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    evaluation?: EvaluationUpdateOneRequiredWithoutCriteriaNestedInput
    responses?: EvaluationResponseUpdateManyWithoutCriterionNestedInput
  }

  export type EvaluationCriteriaUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    evaluationId?: IntFieldUpdateOperationsInput | number
    responses?: EvaluationResponseUncheckedUpdateManyWithoutCriterionNestedInput
  }

  export type EvaluationCriteriaCreateManyInput = {
    id?: number
    name: string
    evaluationId: number
  }

  export type EvaluationCriteriaUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type EvaluationCriteriaUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    evaluationId?: IntFieldUpdateOperationsInput | number
  }

  export type EvaluationResponseCreateInput = {
    score: number
    evaluation: EvaluationCreateNestedOneWithoutResponsesInput
    evaluatorStudent: StudentCreateNestedOneWithoutEvaluationsGivenInput
    evaluatedStudent: StudentCreateNestedOneWithoutEvaluationsReceivedInput
    criterion: EvaluationCriteriaCreateNestedOneWithoutResponsesInput
  }

  export type EvaluationResponseUncheckedCreateInput = {
    id?: number
    evaluationId: number
    evaluatorStudentId: number
    evaluatedStudentId: number
    criterionId: number
    score: number
  }

  export type EvaluationResponseUpdateInput = {
    score?: IntFieldUpdateOperationsInput | number
    evaluation?: EvaluationUpdateOneRequiredWithoutResponsesNestedInput
    evaluatorStudent?: StudentUpdateOneRequiredWithoutEvaluationsGivenNestedInput
    evaluatedStudent?: StudentUpdateOneRequiredWithoutEvaluationsReceivedNestedInput
    criterion?: EvaluationCriteriaUpdateOneRequiredWithoutResponsesNestedInput
  }

  export type EvaluationResponseUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    evaluationId?: IntFieldUpdateOperationsInput | number
    evaluatorStudentId?: IntFieldUpdateOperationsInput | number
    evaluatedStudentId?: IntFieldUpdateOperationsInput | number
    criterionId?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
  }

  export type EvaluationResponseCreateManyInput = {
    id?: number
    evaluationId: number
    evaluatorStudentId: number
    evaluatedStudentId: number
    criterionId: number
    score: number
  }

  export type EvaluationResponseUpdateManyMutationInput = {
    score?: IntFieldUpdateOperationsInput | number
  }

  export type EvaluationResponseUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    evaluationId?: IntFieldUpdateOperationsInput | number
    evaluatorStudentId?: IntFieldUpdateOperationsInput | number
    evaluatedStudentId?: IntFieldUpdateOperationsInput | number
    criterionId?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type SectionListRelationFilter = {
    every?: SectionWhereInput
    some?: SectionWhereInput
    none?: SectionWhereInput
  }

  export type SectionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOrderByRelevanceInput = {
    fields: UserOrderByRelevanceFieldEnum | UserOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    role?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type StudentListRelationFilter = {
    every?: StudentWhereInput
    some?: StudentWhereInput
    none?: StudentWhereInput
  }

  export type EvaluationListRelationFilter = {
    every?: EvaluationWhereInput
    some?: EvaluationWhereInput
    none?: EvaluationWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type StudentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EvaluationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SectionOrderByRelevanceInput = {
    fields: SectionOrderByRelevanceFieldEnum | SectionOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type SectionCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
  }

  export type SectionAvgOrderByAggregateInput = {
    id?: SortOrder
    createdBy?: SortOrder
  }

  export type SectionMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
  }

  export type SectionMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
  }

  export type SectionSumOrderByAggregateInput = {
    id?: SortOrder
    createdBy?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type SectionScalarRelationFilter = {
    is?: SectionWhereInput
    isNot?: SectionWhereInput
  }

  export type EvaluationResponseListRelationFilter = {
    every?: EvaluationResponseWhereInput
    some?: EvaluationResponseWhereInput
    none?: EvaluationResponseWhereInput
  }

  export type EvaluationResponseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StudentOrderByRelevanceInput = {
    fields: StudentOrderByRelevanceFieldEnum | StudentOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type StudentCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    studentId?: SortOrder
    sectionId?: SortOrder
  }

  export type StudentAvgOrderByAggregateInput = {
    id?: SortOrder
    sectionId?: SortOrder
  }

  export type StudentMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    studentId?: SortOrder
    sectionId?: SortOrder
  }

  export type StudentMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    studentId?: SortOrder
    sectionId?: SortOrder
  }

  export type StudentSumOrderByAggregateInput = {
    id?: SortOrder
    sectionId?: SortOrder
  }

  export type EvaluationCriteriaListRelationFilter = {
    every?: EvaluationCriteriaWhereInput
    some?: EvaluationCriteriaWhereInput
    none?: EvaluationCriteriaWhereInput
  }

  export type EvaluationCriteriaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EvaluationOrderByRelevanceInput = {
    fields: EvaluationOrderByRelevanceFieldEnum | EvaluationOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type EvaluationCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    sectionId?: SortOrder
  }

  export type EvaluationAvgOrderByAggregateInput = {
    id?: SortOrder
    sectionId?: SortOrder
  }

  export type EvaluationMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    sectionId?: SortOrder
  }

  export type EvaluationMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    sectionId?: SortOrder
  }

  export type EvaluationSumOrderByAggregateInput = {
    id?: SortOrder
    sectionId?: SortOrder
  }

  export type EvaluationScalarRelationFilter = {
    is?: EvaluationWhereInput
    isNot?: EvaluationWhereInput
  }

  export type EvaluationCriteriaOrderByRelevanceInput = {
    fields: EvaluationCriteriaOrderByRelevanceFieldEnum | EvaluationCriteriaOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type EvaluationCriteriaCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    evaluationId?: SortOrder
  }

  export type EvaluationCriteriaAvgOrderByAggregateInput = {
    id?: SortOrder
    evaluationId?: SortOrder
  }

  export type EvaluationCriteriaMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    evaluationId?: SortOrder
  }

  export type EvaluationCriteriaMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    evaluationId?: SortOrder
  }

  export type EvaluationCriteriaSumOrderByAggregateInput = {
    id?: SortOrder
    evaluationId?: SortOrder
  }

  export type StudentScalarRelationFilter = {
    is?: StudentWhereInput
    isNot?: StudentWhereInput
  }

  export type EvaluationCriteriaScalarRelationFilter = {
    is?: EvaluationCriteriaWhereInput
    isNot?: EvaluationCriteriaWhereInput
  }

  export type EvaluationResponseCountOrderByAggregateInput = {
    id?: SortOrder
    evaluationId?: SortOrder
    evaluatorStudentId?: SortOrder
    evaluatedStudentId?: SortOrder
    criterionId?: SortOrder
    score?: SortOrder
  }

  export type EvaluationResponseAvgOrderByAggregateInput = {
    id?: SortOrder
    evaluationId?: SortOrder
    evaluatorStudentId?: SortOrder
    evaluatedStudentId?: SortOrder
    criterionId?: SortOrder
    score?: SortOrder
  }

  export type EvaluationResponseMaxOrderByAggregateInput = {
    id?: SortOrder
    evaluationId?: SortOrder
    evaluatorStudentId?: SortOrder
    evaluatedStudentId?: SortOrder
    criterionId?: SortOrder
    score?: SortOrder
  }

  export type EvaluationResponseMinOrderByAggregateInput = {
    id?: SortOrder
    evaluationId?: SortOrder
    evaluatorStudentId?: SortOrder
    evaluatedStudentId?: SortOrder
    criterionId?: SortOrder
    score?: SortOrder
  }

  export type EvaluationResponseSumOrderByAggregateInput = {
    id?: SortOrder
    evaluationId?: SortOrder
    evaluatorStudentId?: SortOrder
    evaluatedStudentId?: SortOrder
    criterionId?: SortOrder
    score?: SortOrder
  }

  export type SectionCreateNestedManyWithoutInstructorInput = {
    create?: XOR<SectionCreateWithoutInstructorInput, SectionUncheckedCreateWithoutInstructorInput> | SectionCreateWithoutInstructorInput[] | SectionUncheckedCreateWithoutInstructorInput[]
    connectOrCreate?: SectionCreateOrConnectWithoutInstructorInput | SectionCreateOrConnectWithoutInstructorInput[]
    createMany?: SectionCreateManyInstructorInputEnvelope
    connect?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
  }

  export type SectionUncheckedCreateNestedManyWithoutInstructorInput = {
    create?: XOR<SectionCreateWithoutInstructorInput, SectionUncheckedCreateWithoutInstructorInput> | SectionCreateWithoutInstructorInput[] | SectionUncheckedCreateWithoutInstructorInput[]
    connectOrCreate?: SectionCreateOrConnectWithoutInstructorInput | SectionCreateOrConnectWithoutInstructorInput[]
    createMany?: SectionCreateManyInstructorInputEnvelope
    connect?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type SectionUpdateManyWithoutInstructorNestedInput = {
    create?: XOR<SectionCreateWithoutInstructorInput, SectionUncheckedCreateWithoutInstructorInput> | SectionCreateWithoutInstructorInput[] | SectionUncheckedCreateWithoutInstructorInput[]
    connectOrCreate?: SectionCreateOrConnectWithoutInstructorInput | SectionCreateOrConnectWithoutInstructorInput[]
    upsert?: SectionUpsertWithWhereUniqueWithoutInstructorInput | SectionUpsertWithWhereUniqueWithoutInstructorInput[]
    createMany?: SectionCreateManyInstructorInputEnvelope
    set?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    disconnect?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    delete?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    connect?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    update?: SectionUpdateWithWhereUniqueWithoutInstructorInput | SectionUpdateWithWhereUniqueWithoutInstructorInput[]
    updateMany?: SectionUpdateManyWithWhereWithoutInstructorInput | SectionUpdateManyWithWhereWithoutInstructorInput[]
    deleteMany?: SectionScalarWhereInput | SectionScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type SectionUncheckedUpdateManyWithoutInstructorNestedInput = {
    create?: XOR<SectionCreateWithoutInstructorInput, SectionUncheckedCreateWithoutInstructorInput> | SectionCreateWithoutInstructorInput[] | SectionUncheckedCreateWithoutInstructorInput[]
    connectOrCreate?: SectionCreateOrConnectWithoutInstructorInput | SectionCreateOrConnectWithoutInstructorInput[]
    upsert?: SectionUpsertWithWhereUniqueWithoutInstructorInput | SectionUpsertWithWhereUniqueWithoutInstructorInput[]
    createMany?: SectionCreateManyInstructorInputEnvelope
    set?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    disconnect?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    delete?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    connect?: SectionWhereUniqueInput | SectionWhereUniqueInput[]
    update?: SectionUpdateWithWhereUniqueWithoutInstructorInput | SectionUpdateWithWhereUniqueWithoutInstructorInput[]
    updateMany?: SectionUpdateManyWithWhereWithoutInstructorInput | SectionUpdateManyWithWhereWithoutInstructorInput[]
    deleteMany?: SectionScalarWhereInput | SectionScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutSectionsInput = {
    create?: XOR<UserCreateWithoutSectionsInput, UserUncheckedCreateWithoutSectionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSectionsInput
    connect?: UserWhereUniqueInput
  }

  export type StudentCreateNestedManyWithoutSectionInput = {
    create?: XOR<StudentCreateWithoutSectionInput, StudentUncheckedCreateWithoutSectionInput> | StudentCreateWithoutSectionInput[] | StudentUncheckedCreateWithoutSectionInput[]
    connectOrCreate?: StudentCreateOrConnectWithoutSectionInput | StudentCreateOrConnectWithoutSectionInput[]
    createMany?: StudentCreateManySectionInputEnvelope
    connect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
  }

  export type EvaluationCreateNestedManyWithoutSectionInput = {
    create?: XOR<EvaluationCreateWithoutSectionInput, EvaluationUncheckedCreateWithoutSectionInput> | EvaluationCreateWithoutSectionInput[] | EvaluationUncheckedCreateWithoutSectionInput[]
    connectOrCreate?: EvaluationCreateOrConnectWithoutSectionInput | EvaluationCreateOrConnectWithoutSectionInput[]
    createMany?: EvaluationCreateManySectionInputEnvelope
    connect?: EvaluationWhereUniqueInput | EvaluationWhereUniqueInput[]
  }

  export type StudentUncheckedCreateNestedManyWithoutSectionInput = {
    create?: XOR<StudentCreateWithoutSectionInput, StudentUncheckedCreateWithoutSectionInput> | StudentCreateWithoutSectionInput[] | StudentUncheckedCreateWithoutSectionInput[]
    connectOrCreate?: StudentCreateOrConnectWithoutSectionInput | StudentCreateOrConnectWithoutSectionInput[]
    createMany?: StudentCreateManySectionInputEnvelope
    connect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
  }

  export type EvaluationUncheckedCreateNestedManyWithoutSectionInput = {
    create?: XOR<EvaluationCreateWithoutSectionInput, EvaluationUncheckedCreateWithoutSectionInput> | EvaluationCreateWithoutSectionInput[] | EvaluationUncheckedCreateWithoutSectionInput[]
    connectOrCreate?: EvaluationCreateOrConnectWithoutSectionInput | EvaluationCreateOrConnectWithoutSectionInput[]
    createMany?: EvaluationCreateManySectionInputEnvelope
    connect?: EvaluationWhereUniqueInput | EvaluationWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateOneRequiredWithoutSectionsNestedInput = {
    create?: XOR<UserCreateWithoutSectionsInput, UserUncheckedCreateWithoutSectionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSectionsInput
    upsert?: UserUpsertWithoutSectionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSectionsInput, UserUpdateWithoutSectionsInput>, UserUncheckedUpdateWithoutSectionsInput>
  }

  export type StudentUpdateManyWithoutSectionNestedInput = {
    create?: XOR<StudentCreateWithoutSectionInput, StudentUncheckedCreateWithoutSectionInput> | StudentCreateWithoutSectionInput[] | StudentUncheckedCreateWithoutSectionInput[]
    connectOrCreate?: StudentCreateOrConnectWithoutSectionInput | StudentCreateOrConnectWithoutSectionInput[]
    upsert?: StudentUpsertWithWhereUniqueWithoutSectionInput | StudentUpsertWithWhereUniqueWithoutSectionInput[]
    createMany?: StudentCreateManySectionInputEnvelope
    set?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    disconnect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    delete?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    connect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    update?: StudentUpdateWithWhereUniqueWithoutSectionInput | StudentUpdateWithWhereUniqueWithoutSectionInput[]
    updateMany?: StudentUpdateManyWithWhereWithoutSectionInput | StudentUpdateManyWithWhereWithoutSectionInput[]
    deleteMany?: StudentScalarWhereInput | StudentScalarWhereInput[]
  }

  export type EvaluationUpdateManyWithoutSectionNestedInput = {
    create?: XOR<EvaluationCreateWithoutSectionInput, EvaluationUncheckedCreateWithoutSectionInput> | EvaluationCreateWithoutSectionInput[] | EvaluationUncheckedCreateWithoutSectionInput[]
    connectOrCreate?: EvaluationCreateOrConnectWithoutSectionInput | EvaluationCreateOrConnectWithoutSectionInput[]
    upsert?: EvaluationUpsertWithWhereUniqueWithoutSectionInput | EvaluationUpsertWithWhereUniqueWithoutSectionInput[]
    createMany?: EvaluationCreateManySectionInputEnvelope
    set?: EvaluationWhereUniqueInput | EvaluationWhereUniqueInput[]
    disconnect?: EvaluationWhereUniqueInput | EvaluationWhereUniqueInput[]
    delete?: EvaluationWhereUniqueInput | EvaluationWhereUniqueInput[]
    connect?: EvaluationWhereUniqueInput | EvaluationWhereUniqueInput[]
    update?: EvaluationUpdateWithWhereUniqueWithoutSectionInput | EvaluationUpdateWithWhereUniqueWithoutSectionInput[]
    updateMany?: EvaluationUpdateManyWithWhereWithoutSectionInput | EvaluationUpdateManyWithWhereWithoutSectionInput[]
    deleteMany?: EvaluationScalarWhereInput | EvaluationScalarWhereInput[]
  }

  export type StudentUncheckedUpdateManyWithoutSectionNestedInput = {
    create?: XOR<StudentCreateWithoutSectionInput, StudentUncheckedCreateWithoutSectionInput> | StudentCreateWithoutSectionInput[] | StudentUncheckedCreateWithoutSectionInput[]
    connectOrCreate?: StudentCreateOrConnectWithoutSectionInput | StudentCreateOrConnectWithoutSectionInput[]
    upsert?: StudentUpsertWithWhereUniqueWithoutSectionInput | StudentUpsertWithWhereUniqueWithoutSectionInput[]
    createMany?: StudentCreateManySectionInputEnvelope
    set?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    disconnect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    delete?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    connect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    update?: StudentUpdateWithWhereUniqueWithoutSectionInput | StudentUpdateWithWhereUniqueWithoutSectionInput[]
    updateMany?: StudentUpdateManyWithWhereWithoutSectionInput | StudentUpdateManyWithWhereWithoutSectionInput[]
    deleteMany?: StudentScalarWhereInput | StudentScalarWhereInput[]
  }

  export type EvaluationUncheckedUpdateManyWithoutSectionNestedInput = {
    create?: XOR<EvaluationCreateWithoutSectionInput, EvaluationUncheckedCreateWithoutSectionInput> | EvaluationCreateWithoutSectionInput[] | EvaluationUncheckedCreateWithoutSectionInput[]
    connectOrCreate?: EvaluationCreateOrConnectWithoutSectionInput | EvaluationCreateOrConnectWithoutSectionInput[]
    upsert?: EvaluationUpsertWithWhereUniqueWithoutSectionInput | EvaluationUpsertWithWhereUniqueWithoutSectionInput[]
    createMany?: EvaluationCreateManySectionInputEnvelope
    set?: EvaluationWhereUniqueInput | EvaluationWhereUniqueInput[]
    disconnect?: EvaluationWhereUniqueInput | EvaluationWhereUniqueInput[]
    delete?: EvaluationWhereUniqueInput | EvaluationWhereUniqueInput[]
    connect?: EvaluationWhereUniqueInput | EvaluationWhereUniqueInput[]
    update?: EvaluationUpdateWithWhereUniqueWithoutSectionInput | EvaluationUpdateWithWhereUniqueWithoutSectionInput[]
    updateMany?: EvaluationUpdateManyWithWhereWithoutSectionInput | EvaluationUpdateManyWithWhereWithoutSectionInput[]
    deleteMany?: EvaluationScalarWhereInput | EvaluationScalarWhereInput[]
  }

  export type SectionCreateNestedOneWithoutStudentsInput = {
    create?: XOR<SectionCreateWithoutStudentsInput, SectionUncheckedCreateWithoutStudentsInput>
    connectOrCreate?: SectionCreateOrConnectWithoutStudentsInput
    connect?: SectionWhereUniqueInput
  }

  export type EvaluationResponseCreateNestedManyWithoutEvaluatorStudentInput = {
    create?: XOR<EvaluationResponseCreateWithoutEvaluatorStudentInput, EvaluationResponseUncheckedCreateWithoutEvaluatorStudentInput> | EvaluationResponseCreateWithoutEvaluatorStudentInput[] | EvaluationResponseUncheckedCreateWithoutEvaluatorStudentInput[]
    connectOrCreate?: EvaluationResponseCreateOrConnectWithoutEvaluatorStudentInput | EvaluationResponseCreateOrConnectWithoutEvaluatorStudentInput[]
    createMany?: EvaluationResponseCreateManyEvaluatorStudentInputEnvelope
    connect?: EvaluationResponseWhereUniqueInput | EvaluationResponseWhereUniqueInput[]
  }

  export type EvaluationResponseCreateNestedManyWithoutEvaluatedStudentInput = {
    create?: XOR<EvaluationResponseCreateWithoutEvaluatedStudentInput, EvaluationResponseUncheckedCreateWithoutEvaluatedStudentInput> | EvaluationResponseCreateWithoutEvaluatedStudentInput[] | EvaluationResponseUncheckedCreateWithoutEvaluatedStudentInput[]
    connectOrCreate?: EvaluationResponseCreateOrConnectWithoutEvaluatedStudentInput | EvaluationResponseCreateOrConnectWithoutEvaluatedStudentInput[]
    createMany?: EvaluationResponseCreateManyEvaluatedStudentInputEnvelope
    connect?: EvaluationResponseWhereUniqueInput | EvaluationResponseWhereUniqueInput[]
  }

  export type EvaluationResponseUncheckedCreateNestedManyWithoutEvaluatorStudentInput = {
    create?: XOR<EvaluationResponseCreateWithoutEvaluatorStudentInput, EvaluationResponseUncheckedCreateWithoutEvaluatorStudentInput> | EvaluationResponseCreateWithoutEvaluatorStudentInput[] | EvaluationResponseUncheckedCreateWithoutEvaluatorStudentInput[]
    connectOrCreate?: EvaluationResponseCreateOrConnectWithoutEvaluatorStudentInput | EvaluationResponseCreateOrConnectWithoutEvaluatorStudentInput[]
    createMany?: EvaluationResponseCreateManyEvaluatorStudentInputEnvelope
    connect?: EvaluationResponseWhereUniqueInput | EvaluationResponseWhereUniqueInput[]
  }

  export type EvaluationResponseUncheckedCreateNestedManyWithoutEvaluatedStudentInput = {
    create?: XOR<EvaluationResponseCreateWithoutEvaluatedStudentInput, EvaluationResponseUncheckedCreateWithoutEvaluatedStudentInput> | EvaluationResponseCreateWithoutEvaluatedStudentInput[] | EvaluationResponseUncheckedCreateWithoutEvaluatedStudentInput[]
    connectOrCreate?: EvaluationResponseCreateOrConnectWithoutEvaluatedStudentInput | EvaluationResponseCreateOrConnectWithoutEvaluatedStudentInput[]
    createMany?: EvaluationResponseCreateManyEvaluatedStudentInputEnvelope
    connect?: EvaluationResponseWhereUniqueInput | EvaluationResponseWhereUniqueInput[]
  }

  export type SectionUpdateOneRequiredWithoutStudentsNestedInput = {
    create?: XOR<SectionCreateWithoutStudentsInput, SectionUncheckedCreateWithoutStudentsInput>
    connectOrCreate?: SectionCreateOrConnectWithoutStudentsInput
    upsert?: SectionUpsertWithoutStudentsInput
    connect?: SectionWhereUniqueInput
    update?: XOR<XOR<SectionUpdateToOneWithWhereWithoutStudentsInput, SectionUpdateWithoutStudentsInput>, SectionUncheckedUpdateWithoutStudentsInput>
  }

  export type EvaluationResponseUpdateManyWithoutEvaluatorStudentNestedInput = {
    create?: XOR<EvaluationResponseCreateWithoutEvaluatorStudentInput, EvaluationResponseUncheckedCreateWithoutEvaluatorStudentInput> | EvaluationResponseCreateWithoutEvaluatorStudentInput[] | EvaluationResponseUncheckedCreateWithoutEvaluatorStudentInput[]
    connectOrCreate?: EvaluationResponseCreateOrConnectWithoutEvaluatorStudentInput | EvaluationResponseCreateOrConnectWithoutEvaluatorStudentInput[]
    upsert?: EvaluationResponseUpsertWithWhereUniqueWithoutEvaluatorStudentInput | EvaluationResponseUpsertWithWhereUniqueWithoutEvaluatorStudentInput[]
    createMany?: EvaluationResponseCreateManyEvaluatorStudentInputEnvelope
    set?: EvaluationResponseWhereUniqueInput | EvaluationResponseWhereUniqueInput[]
    disconnect?: EvaluationResponseWhereUniqueInput | EvaluationResponseWhereUniqueInput[]
    delete?: EvaluationResponseWhereUniqueInput | EvaluationResponseWhereUniqueInput[]
    connect?: EvaluationResponseWhereUniqueInput | EvaluationResponseWhereUniqueInput[]
    update?: EvaluationResponseUpdateWithWhereUniqueWithoutEvaluatorStudentInput | EvaluationResponseUpdateWithWhereUniqueWithoutEvaluatorStudentInput[]
    updateMany?: EvaluationResponseUpdateManyWithWhereWithoutEvaluatorStudentInput | EvaluationResponseUpdateManyWithWhereWithoutEvaluatorStudentInput[]
    deleteMany?: EvaluationResponseScalarWhereInput | EvaluationResponseScalarWhereInput[]
  }

  export type EvaluationResponseUpdateManyWithoutEvaluatedStudentNestedInput = {
    create?: XOR<EvaluationResponseCreateWithoutEvaluatedStudentInput, EvaluationResponseUncheckedCreateWithoutEvaluatedStudentInput> | EvaluationResponseCreateWithoutEvaluatedStudentInput[] | EvaluationResponseUncheckedCreateWithoutEvaluatedStudentInput[]
    connectOrCreate?: EvaluationResponseCreateOrConnectWithoutEvaluatedStudentInput | EvaluationResponseCreateOrConnectWithoutEvaluatedStudentInput[]
    upsert?: EvaluationResponseUpsertWithWhereUniqueWithoutEvaluatedStudentInput | EvaluationResponseUpsertWithWhereUniqueWithoutEvaluatedStudentInput[]
    createMany?: EvaluationResponseCreateManyEvaluatedStudentInputEnvelope
    set?: EvaluationResponseWhereUniqueInput | EvaluationResponseWhereUniqueInput[]
    disconnect?: EvaluationResponseWhereUniqueInput | EvaluationResponseWhereUniqueInput[]
    delete?: EvaluationResponseWhereUniqueInput | EvaluationResponseWhereUniqueInput[]
    connect?: EvaluationResponseWhereUniqueInput | EvaluationResponseWhereUniqueInput[]
    update?: EvaluationResponseUpdateWithWhereUniqueWithoutEvaluatedStudentInput | EvaluationResponseUpdateWithWhereUniqueWithoutEvaluatedStudentInput[]
    updateMany?: EvaluationResponseUpdateManyWithWhereWithoutEvaluatedStudentInput | EvaluationResponseUpdateManyWithWhereWithoutEvaluatedStudentInput[]
    deleteMany?: EvaluationResponseScalarWhereInput | EvaluationResponseScalarWhereInput[]
  }

  export type EvaluationResponseUncheckedUpdateManyWithoutEvaluatorStudentNestedInput = {
    create?: XOR<EvaluationResponseCreateWithoutEvaluatorStudentInput, EvaluationResponseUncheckedCreateWithoutEvaluatorStudentInput> | EvaluationResponseCreateWithoutEvaluatorStudentInput[] | EvaluationResponseUncheckedCreateWithoutEvaluatorStudentInput[]
    connectOrCreate?: EvaluationResponseCreateOrConnectWithoutEvaluatorStudentInput | EvaluationResponseCreateOrConnectWithoutEvaluatorStudentInput[]
    upsert?: EvaluationResponseUpsertWithWhereUniqueWithoutEvaluatorStudentInput | EvaluationResponseUpsertWithWhereUniqueWithoutEvaluatorStudentInput[]
    createMany?: EvaluationResponseCreateManyEvaluatorStudentInputEnvelope
    set?: EvaluationResponseWhereUniqueInput | EvaluationResponseWhereUniqueInput[]
    disconnect?: EvaluationResponseWhereUniqueInput | EvaluationResponseWhereUniqueInput[]
    delete?: EvaluationResponseWhereUniqueInput | EvaluationResponseWhereUniqueInput[]
    connect?: EvaluationResponseWhereUniqueInput | EvaluationResponseWhereUniqueInput[]
    update?: EvaluationResponseUpdateWithWhereUniqueWithoutEvaluatorStudentInput | EvaluationResponseUpdateWithWhereUniqueWithoutEvaluatorStudentInput[]
    updateMany?: EvaluationResponseUpdateManyWithWhereWithoutEvaluatorStudentInput | EvaluationResponseUpdateManyWithWhereWithoutEvaluatorStudentInput[]
    deleteMany?: EvaluationResponseScalarWhereInput | EvaluationResponseScalarWhereInput[]
  }

  export type EvaluationResponseUncheckedUpdateManyWithoutEvaluatedStudentNestedInput = {
    create?: XOR<EvaluationResponseCreateWithoutEvaluatedStudentInput, EvaluationResponseUncheckedCreateWithoutEvaluatedStudentInput> | EvaluationResponseCreateWithoutEvaluatedStudentInput[] | EvaluationResponseUncheckedCreateWithoutEvaluatedStudentInput[]
    connectOrCreate?: EvaluationResponseCreateOrConnectWithoutEvaluatedStudentInput | EvaluationResponseCreateOrConnectWithoutEvaluatedStudentInput[]
    upsert?: EvaluationResponseUpsertWithWhereUniqueWithoutEvaluatedStudentInput | EvaluationResponseUpsertWithWhereUniqueWithoutEvaluatedStudentInput[]
    createMany?: EvaluationResponseCreateManyEvaluatedStudentInputEnvelope
    set?: EvaluationResponseWhereUniqueInput | EvaluationResponseWhereUniqueInput[]
    disconnect?: EvaluationResponseWhereUniqueInput | EvaluationResponseWhereUniqueInput[]
    delete?: EvaluationResponseWhereUniqueInput | EvaluationResponseWhereUniqueInput[]
    connect?: EvaluationResponseWhereUniqueInput | EvaluationResponseWhereUniqueInput[]
    update?: EvaluationResponseUpdateWithWhereUniqueWithoutEvaluatedStudentInput | EvaluationResponseUpdateWithWhereUniqueWithoutEvaluatedStudentInput[]
    updateMany?: EvaluationResponseUpdateManyWithWhereWithoutEvaluatedStudentInput | EvaluationResponseUpdateManyWithWhereWithoutEvaluatedStudentInput[]
    deleteMany?: EvaluationResponseScalarWhereInput | EvaluationResponseScalarWhereInput[]
  }

  export type SectionCreateNestedOneWithoutEvaluationsInput = {
    create?: XOR<SectionCreateWithoutEvaluationsInput, SectionUncheckedCreateWithoutEvaluationsInput>
    connectOrCreate?: SectionCreateOrConnectWithoutEvaluationsInput
    connect?: SectionWhereUniqueInput
  }

  export type EvaluationCriteriaCreateNestedManyWithoutEvaluationInput = {
    create?: XOR<EvaluationCriteriaCreateWithoutEvaluationInput, EvaluationCriteriaUncheckedCreateWithoutEvaluationInput> | EvaluationCriteriaCreateWithoutEvaluationInput[] | EvaluationCriteriaUncheckedCreateWithoutEvaluationInput[]
    connectOrCreate?: EvaluationCriteriaCreateOrConnectWithoutEvaluationInput | EvaluationCriteriaCreateOrConnectWithoutEvaluationInput[]
    createMany?: EvaluationCriteriaCreateManyEvaluationInputEnvelope
    connect?: EvaluationCriteriaWhereUniqueInput | EvaluationCriteriaWhereUniqueInput[]
  }

  export type EvaluationResponseCreateNestedManyWithoutEvaluationInput = {
    create?: XOR<EvaluationResponseCreateWithoutEvaluationInput, EvaluationResponseUncheckedCreateWithoutEvaluationInput> | EvaluationResponseCreateWithoutEvaluationInput[] | EvaluationResponseUncheckedCreateWithoutEvaluationInput[]
    connectOrCreate?: EvaluationResponseCreateOrConnectWithoutEvaluationInput | EvaluationResponseCreateOrConnectWithoutEvaluationInput[]
    createMany?: EvaluationResponseCreateManyEvaluationInputEnvelope
    connect?: EvaluationResponseWhereUniqueInput | EvaluationResponseWhereUniqueInput[]
  }

  export type EvaluationCriteriaUncheckedCreateNestedManyWithoutEvaluationInput = {
    create?: XOR<EvaluationCriteriaCreateWithoutEvaluationInput, EvaluationCriteriaUncheckedCreateWithoutEvaluationInput> | EvaluationCriteriaCreateWithoutEvaluationInput[] | EvaluationCriteriaUncheckedCreateWithoutEvaluationInput[]
    connectOrCreate?: EvaluationCriteriaCreateOrConnectWithoutEvaluationInput | EvaluationCriteriaCreateOrConnectWithoutEvaluationInput[]
    createMany?: EvaluationCriteriaCreateManyEvaluationInputEnvelope
    connect?: EvaluationCriteriaWhereUniqueInput | EvaluationCriteriaWhereUniqueInput[]
  }

  export type EvaluationResponseUncheckedCreateNestedManyWithoutEvaluationInput = {
    create?: XOR<EvaluationResponseCreateWithoutEvaluationInput, EvaluationResponseUncheckedCreateWithoutEvaluationInput> | EvaluationResponseCreateWithoutEvaluationInput[] | EvaluationResponseUncheckedCreateWithoutEvaluationInput[]
    connectOrCreate?: EvaluationResponseCreateOrConnectWithoutEvaluationInput | EvaluationResponseCreateOrConnectWithoutEvaluationInput[]
    createMany?: EvaluationResponseCreateManyEvaluationInputEnvelope
    connect?: EvaluationResponseWhereUniqueInput | EvaluationResponseWhereUniqueInput[]
  }

  export type SectionUpdateOneRequiredWithoutEvaluationsNestedInput = {
    create?: XOR<SectionCreateWithoutEvaluationsInput, SectionUncheckedCreateWithoutEvaluationsInput>
    connectOrCreate?: SectionCreateOrConnectWithoutEvaluationsInput
    upsert?: SectionUpsertWithoutEvaluationsInput
    connect?: SectionWhereUniqueInput
    update?: XOR<XOR<SectionUpdateToOneWithWhereWithoutEvaluationsInput, SectionUpdateWithoutEvaluationsInput>, SectionUncheckedUpdateWithoutEvaluationsInput>
  }

  export type EvaluationCriteriaUpdateManyWithoutEvaluationNestedInput = {
    create?: XOR<EvaluationCriteriaCreateWithoutEvaluationInput, EvaluationCriteriaUncheckedCreateWithoutEvaluationInput> | EvaluationCriteriaCreateWithoutEvaluationInput[] | EvaluationCriteriaUncheckedCreateWithoutEvaluationInput[]
    connectOrCreate?: EvaluationCriteriaCreateOrConnectWithoutEvaluationInput | EvaluationCriteriaCreateOrConnectWithoutEvaluationInput[]
    upsert?: EvaluationCriteriaUpsertWithWhereUniqueWithoutEvaluationInput | EvaluationCriteriaUpsertWithWhereUniqueWithoutEvaluationInput[]
    createMany?: EvaluationCriteriaCreateManyEvaluationInputEnvelope
    set?: EvaluationCriteriaWhereUniqueInput | EvaluationCriteriaWhereUniqueInput[]
    disconnect?: EvaluationCriteriaWhereUniqueInput | EvaluationCriteriaWhereUniqueInput[]
    delete?: EvaluationCriteriaWhereUniqueInput | EvaluationCriteriaWhereUniqueInput[]
    connect?: EvaluationCriteriaWhereUniqueInput | EvaluationCriteriaWhereUniqueInput[]
    update?: EvaluationCriteriaUpdateWithWhereUniqueWithoutEvaluationInput | EvaluationCriteriaUpdateWithWhereUniqueWithoutEvaluationInput[]
    updateMany?: EvaluationCriteriaUpdateManyWithWhereWithoutEvaluationInput | EvaluationCriteriaUpdateManyWithWhereWithoutEvaluationInput[]
    deleteMany?: EvaluationCriteriaScalarWhereInput | EvaluationCriteriaScalarWhereInput[]
  }

  export type EvaluationResponseUpdateManyWithoutEvaluationNestedInput = {
    create?: XOR<EvaluationResponseCreateWithoutEvaluationInput, EvaluationResponseUncheckedCreateWithoutEvaluationInput> | EvaluationResponseCreateWithoutEvaluationInput[] | EvaluationResponseUncheckedCreateWithoutEvaluationInput[]
    connectOrCreate?: EvaluationResponseCreateOrConnectWithoutEvaluationInput | EvaluationResponseCreateOrConnectWithoutEvaluationInput[]
    upsert?: EvaluationResponseUpsertWithWhereUniqueWithoutEvaluationInput | EvaluationResponseUpsertWithWhereUniqueWithoutEvaluationInput[]
    createMany?: EvaluationResponseCreateManyEvaluationInputEnvelope
    set?: EvaluationResponseWhereUniqueInput | EvaluationResponseWhereUniqueInput[]
    disconnect?: EvaluationResponseWhereUniqueInput | EvaluationResponseWhereUniqueInput[]
    delete?: EvaluationResponseWhereUniqueInput | EvaluationResponseWhereUniqueInput[]
    connect?: EvaluationResponseWhereUniqueInput | EvaluationResponseWhereUniqueInput[]
    update?: EvaluationResponseUpdateWithWhereUniqueWithoutEvaluationInput | EvaluationResponseUpdateWithWhereUniqueWithoutEvaluationInput[]
    updateMany?: EvaluationResponseUpdateManyWithWhereWithoutEvaluationInput | EvaluationResponseUpdateManyWithWhereWithoutEvaluationInput[]
    deleteMany?: EvaluationResponseScalarWhereInput | EvaluationResponseScalarWhereInput[]
  }

  export type EvaluationCriteriaUncheckedUpdateManyWithoutEvaluationNestedInput = {
    create?: XOR<EvaluationCriteriaCreateWithoutEvaluationInput, EvaluationCriteriaUncheckedCreateWithoutEvaluationInput> | EvaluationCriteriaCreateWithoutEvaluationInput[] | EvaluationCriteriaUncheckedCreateWithoutEvaluationInput[]
    connectOrCreate?: EvaluationCriteriaCreateOrConnectWithoutEvaluationInput | EvaluationCriteriaCreateOrConnectWithoutEvaluationInput[]
    upsert?: EvaluationCriteriaUpsertWithWhereUniqueWithoutEvaluationInput | EvaluationCriteriaUpsertWithWhereUniqueWithoutEvaluationInput[]
    createMany?: EvaluationCriteriaCreateManyEvaluationInputEnvelope
    set?: EvaluationCriteriaWhereUniqueInput | EvaluationCriteriaWhereUniqueInput[]
    disconnect?: EvaluationCriteriaWhereUniqueInput | EvaluationCriteriaWhereUniqueInput[]
    delete?: EvaluationCriteriaWhereUniqueInput | EvaluationCriteriaWhereUniqueInput[]
    connect?: EvaluationCriteriaWhereUniqueInput | EvaluationCriteriaWhereUniqueInput[]
    update?: EvaluationCriteriaUpdateWithWhereUniqueWithoutEvaluationInput | EvaluationCriteriaUpdateWithWhereUniqueWithoutEvaluationInput[]
    updateMany?: EvaluationCriteriaUpdateManyWithWhereWithoutEvaluationInput | EvaluationCriteriaUpdateManyWithWhereWithoutEvaluationInput[]
    deleteMany?: EvaluationCriteriaScalarWhereInput | EvaluationCriteriaScalarWhereInput[]
  }

  export type EvaluationResponseUncheckedUpdateManyWithoutEvaluationNestedInput = {
    create?: XOR<EvaluationResponseCreateWithoutEvaluationInput, EvaluationResponseUncheckedCreateWithoutEvaluationInput> | EvaluationResponseCreateWithoutEvaluationInput[] | EvaluationResponseUncheckedCreateWithoutEvaluationInput[]
    connectOrCreate?: EvaluationResponseCreateOrConnectWithoutEvaluationInput | EvaluationResponseCreateOrConnectWithoutEvaluationInput[]
    upsert?: EvaluationResponseUpsertWithWhereUniqueWithoutEvaluationInput | EvaluationResponseUpsertWithWhereUniqueWithoutEvaluationInput[]
    createMany?: EvaluationResponseCreateManyEvaluationInputEnvelope
    set?: EvaluationResponseWhereUniqueInput | EvaluationResponseWhereUniqueInput[]
    disconnect?: EvaluationResponseWhereUniqueInput | EvaluationResponseWhereUniqueInput[]
    delete?: EvaluationResponseWhereUniqueInput | EvaluationResponseWhereUniqueInput[]
    connect?: EvaluationResponseWhereUniqueInput | EvaluationResponseWhereUniqueInput[]
    update?: EvaluationResponseUpdateWithWhereUniqueWithoutEvaluationInput | EvaluationResponseUpdateWithWhereUniqueWithoutEvaluationInput[]
    updateMany?: EvaluationResponseUpdateManyWithWhereWithoutEvaluationInput | EvaluationResponseUpdateManyWithWhereWithoutEvaluationInput[]
    deleteMany?: EvaluationResponseScalarWhereInput | EvaluationResponseScalarWhereInput[]
  }

  export type EvaluationCreateNestedOneWithoutCriteriaInput = {
    create?: XOR<EvaluationCreateWithoutCriteriaInput, EvaluationUncheckedCreateWithoutCriteriaInput>
    connectOrCreate?: EvaluationCreateOrConnectWithoutCriteriaInput
    connect?: EvaluationWhereUniqueInput
  }

  export type EvaluationResponseCreateNestedManyWithoutCriterionInput = {
    create?: XOR<EvaluationResponseCreateWithoutCriterionInput, EvaluationResponseUncheckedCreateWithoutCriterionInput> | EvaluationResponseCreateWithoutCriterionInput[] | EvaluationResponseUncheckedCreateWithoutCriterionInput[]
    connectOrCreate?: EvaluationResponseCreateOrConnectWithoutCriterionInput | EvaluationResponseCreateOrConnectWithoutCriterionInput[]
    createMany?: EvaluationResponseCreateManyCriterionInputEnvelope
    connect?: EvaluationResponseWhereUniqueInput | EvaluationResponseWhereUniqueInput[]
  }

  export type EvaluationResponseUncheckedCreateNestedManyWithoutCriterionInput = {
    create?: XOR<EvaluationResponseCreateWithoutCriterionInput, EvaluationResponseUncheckedCreateWithoutCriterionInput> | EvaluationResponseCreateWithoutCriterionInput[] | EvaluationResponseUncheckedCreateWithoutCriterionInput[]
    connectOrCreate?: EvaluationResponseCreateOrConnectWithoutCriterionInput | EvaluationResponseCreateOrConnectWithoutCriterionInput[]
    createMany?: EvaluationResponseCreateManyCriterionInputEnvelope
    connect?: EvaluationResponseWhereUniqueInput | EvaluationResponseWhereUniqueInput[]
  }

  export type EvaluationUpdateOneRequiredWithoutCriteriaNestedInput = {
    create?: XOR<EvaluationCreateWithoutCriteriaInput, EvaluationUncheckedCreateWithoutCriteriaInput>
    connectOrCreate?: EvaluationCreateOrConnectWithoutCriteriaInput
    upsert?: EvaluationUpsertWithoutCriteriaInput
    connect?: EvaluationWhereUniqueInput
    update?: XOR<XOR<EvaluationUpdateToOneWithWhereWithoutCriteriaInput, EvaluationUpdateWithoutCriteriaInput>, EvaluationUncheckedUpdateWithoutCriteriaInput>
  }

  export type EvaluationResponseUpdateManyWithoutCriterionNestedInput = {
    create?: XOR<EvaluationResponseCreateWithoutCriterionInput, EvaluationResponseUncheckedCreateWithoutCriterionInput> | EvaluationResponseCreateWithoutCriterionInput[] | EvaluationResponseUncheckedCreateWithoutCriterionInput[]
    connectOrCreate?: EvaluationResponseCreateOrConnectWithoutCriterionInput | EvaluationResponseCreateOrConnectWithoutCriterionInput[]
    upsert?: EvaluationResponseUpsertWithWhereUniqueWithoutCriterionInput | EvaluationResponseUpsertWithWhereUniqueWithoutCriterionInput[]
    createMany?: EvaluationResponseCreateManyCriterionInputEnvelope
    set?: EvaluationResponseWhereUniqueInput | EvaluationResponseWhereUniqueInput[]
    disconnect?: EvaluationResponseWhereUniqueInput | EvaluationResponseWhereUniqueInput[]
    delete?: EvaluationResponseWhereUniqueInput | EvaluationResponseWhereUniqueInput[]
    connect?: EvaluationResponseWhereUniqueInput | EvaluationResponseWhereUniqueInput[]
    update?: EvaluationResponseUpdateWithWhereUniqueWithoutCriterionInput | EvaluationResponseUpdateWithWhereUniqueWithoutCriterionInput[]
    updateMany?: EvaluationResponseUpdateManyWithWhereWithoutCriterionInput | EvaluationResponseUpdateManyWithWhereWithoutCriterionInput[]
    deleteMany?: EvaluationResponseScalarWhereInput | EvaluationResponseScalarWhereInput[]
  }

  export type EvaluationResponseUncheckedUpdateManyWithoutCriterionNestedInput = {
    create?: XOR<EvaluationResponseCreateWithoutCriterionInput, EvaluationResponseUncheckedCreateWithoutCriterionInput> | EvaluationResponseCreateWithoutCriterionInput[] | EvaluationResponseUncheckedCreateWithoutCriterionInput[]
    connectOrCreate?: EvaluationResponseCreateOrConnectWithoutCriterionInput | EvaluationResponseCreateOrConnectWithoutCriterionInput[]
    upsert?: EvaluationResponseUpsertWithWhereUniqueWithoutCriterionInput | EvaluationResponseUpsertWithWhereUniqueWithoutCriterionInput[]
    createMany?: EvaluationResponseCreateManyCriterionInputEnvelope
    set?: EvaluationResponseWhereUniqueInput | EvaluationResponseWhereUniqueInput[]
    disconnect?: EvaluationResponseWhereUniqueInput | EvaluationResponseWhereUniqueInput[]
    delete?: EvaluationResponseWhereUniqueInput | EvaluationResponseWhereUniqueInput[]
    connect?: EvaluationResponseWhereUniqueInput | EvaluationResponseWhereUniqueInput[]
    update?: EvaluationResponseUpdateWithWhereUniqueWithoutCriterionInput | EvaluationResponseUpdateWithWhereUniqueWithoutCriterionInput[]
    updateMany?: EvaluationResponseUpdateManyWithWhereWithoutCriterionInput | EvaluationResponseUpdateManyWithWhereWithoutCriterionInput[]
    deleteMany?: EvaluationResponseScalarWhereInput | EvaluationResponseScalarWhereInput[]
  }

  export type EvaluationCreateNestedOneWithoutResponsesInput = {
    create?: XOR<EvaluationCreateWithoutResponsesInput, EvaluationUncheckedCreateWithoutResponsesInput>
    connectOrCreate?: EvaluationCreateOrConnectWithoutResponsesInput
    connect?: EvaluationWhereUniqueInput
  }

  export type StudentCreateNestedOneWithoutEvaluationsGivenInput = {
    create?: XOR<StudentCreateWithoutEvaluationsGivenInput, StudentUncheckedCreateWithoutEvaluationsGivenInput>
    connectOrCreate?: StudentCreateOrConnectWithoutEvaluationsGivenInput
    connect?: StudentWhereUniqueInput
  }

  export type StudentCreateNestedOneWithoutEvaluationsReceivedInput = {
    create?: XOR<StudentCreateWithoutEvaluationsReceivedInput, StudentUncheckedCreateWithoutEvaluationsReceivedInput>
    connectOrCreate?: StudentCreateOrConnectWithoutEvaluationsReceivedInput
    connect?: StudentWhereUniqueInput
  }

  export type EvaluationCriteriaCreateNestedOneWithoutResponsesInput = {
    create?: XOR<EvaluationCriteriaCreateWithoutResponsesInput, EvaluationCriteriaUncheckedCreateWithoutResponsesInput>
    connectOrCreate?: EvaluationCriteriaCreateOrConnectWithoutResponsesInput
    connect?: EvaluationCriteriaWhereUniqueInput
  }

  export type EvaluationUpdateOneRequiredWithoutResponsesNestedInput = {
    create?: XOR<EvaluationCreateWithoutResponsesInput, EvaluationUncheckedCreateWithoutResponsesInput>
    connectOrCreate?: EvaluationCreateOrConnectWithoutResponsesInput
    upsert?: EvaluationUpsertWithoutResponsesInput
    connect?: EvaluationWhereUniqueInput
    update?: XOR<XOR<EvaluationUpdateToOneWithWhereWithoutResponsesInput, EvaluationUpdateWithoutResponsesInput>, EvaluationUncheckedUpdateWithoutResponsesInput>
  }

  export type StudentUpdateOneRequiredWithoutEvaluationsGivenNestedInput = {
    create?: XOR<StudentCreateWithoutEvaluationsGivenInput, StudentUncheckedCreateWithoutEvaluationsGivenInput>
    connectOrCreate?: StudentCreateOrConnectWithoutEvaluationsGivenInput
    upsert?: StudentUpsertWithoutEvaluationsGivenInput
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutEvaluationsGivenInput, StudentUpdateWithoutEvaluationsGivenInput>, StudentUncheckedUpdateWithoutEvaluationsGivenInput>
  }

  export type StudentUpdateOneRequiredWithoutEvaluationsReceivedNestedInput = {
    create?: XOR<StudentCreateWithoutEvaluationsReceivedInput, StudentUncheckedCreateWithoutEvaluationsReceivedInput>
    connectOrCreate?: StudentCreateOrConnectWithoutEvaluationsReceivedInput
    upsert?: StudentUpsertWithoutEvaluationsReceivedInput
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutEvaluationsReceivedInput, StudentUpdateWithoutEvaluationsReceivedInput>, StudentUncheckedUpdateWithoutEvaluationsReceivedInput>
  }

  export type EvaluationCriteriaUpdateOneRequiredWithoutResponsesNestedInput = {
    create?: XOR<EvaluationCriteriaCreateWithoutResponsesInput, EvaluationCriteriaUncheckedCreateWithoutResponsesInput>
    connectOrCreate?: EvaluationCriteriaCreateOrConnectWithoutResponsesInput
    upsert?: EvaluationCriteriaUpsertWithoutResponsesInput
    connect?: EvaluationCriteriaWhereUniqueInput
    update?: XOR<XOR<EvaluationCriteriaUpdateToOneWithWhereWithoutResponsesInput, EvaluationCriteriaUpdateWithoutResponsesInput>, EvaluationCriteriaUncheckedUpdateWithoutResponsesInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type SectionCreateWithoutInstructorInput = {
    name: string
    description?: string | null
    createdAt?: Date | string
    students?: StudentCreateNestedManyWithoutSectionInput
    evaluations?: EvaluationCreateNestedManyWithoutSectionInput
  }

  export type SectionUncheckedCreateWithoutInstructorInput = {
    id?: number
    name: string
    description?: string | null
    createdAt?: Date | string
    students?: StudentUncheckedCreateNestedManyWithoutSectionInput
    evaluations?: EvaluationUncheckedCreateNestedManyWithoutSectionInput
  }

  export type SectionCreateOrConnectWithoutInstructorInput = {
    where: SectionWhereUniqueInput
    create: XOR<SectionCreateWithoutInstructorInput, SectionUncheckedCreateWithoutInstructorInput>
  }

  export type SectionCreateManyInstructorInputEnvelope = {
    data: SectionCreateManyInstructorInput | SectionCreateManyInstructorInput[]
    skipDuplicates?: boolean
  }

  export type SectionUpsertWithWhereUniqueWithoutInstructorInput = {
    where: SectionWhereUniqueInput
    update: XOR<SectionUpdateWithoutInstructorInput, SectionUncheckedUpdateWithoutInstructorInput>
    create: XOR<SectionCreateWithoutInstructorInput, SectionUncheckedCreateWithoutInstructorInput>
  }

  export type SectionUpdateWithWhereUniqueWithoutInstructorInput = {
    where: SectionWhereUniqueInput
    data: XOR<SectionUpdateWithoutInstructorInput, SectionUncheckedUpdateWithoutInstructorInput>
  }

  export type SectionUpdateManyWithWhereWithoutInstructorInput = {
    where: SectionScalarWhereInput
    data: XOR<SectionUpdateManyMutationInput, SectionUncheckedUpdateManyWithoutInstructorInput>
  }

  export type SectionScalarWhereInput = {
    AND?: SectionScalarWhereInput | SectionScalarWhereInput[]
    OR?: SectionScalarWhereInput[]
    NOT?: SectionScalarWhereInput | SectionScalarWhereInput[]
    id?: IntFilter<"Section"> | number
    name?: StringFilter<"Section"> | string
    description?: StringNullableFilter<"Section"> | string | null
    createdBy?: IntFilter<"Section"> | number
    createdAt?: DateTimeFilter<"Section"> | Date | string
  }

  export type UserCreateWithoutSectionsInput = {
    name: string
    email: string
    password: string
    role: string
  }

  export type UserUncheckedCreateWithoutSectionsInput = {
    id?: number
    name: string
    email: string
    password: string
    role: string
  }

  export type UserCreateOrConnectWithoutSectionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSectionsInput, UserUncheckedCreateWithoutSectionsInput>
  }

  export type StudentCreateWithoutSectionInput = {
    name: string
    email: string
    studentId: string
    evaluationsGiven?: EvaluationResponseCreateNestedManyWithoutEvaluatorStudentInput
    evaluationsReceived?: EvaluationResponseCreateNestedManyWithoutEvaluatedStudentInput
  }

  export type StudentUncheckedCreateWithoutSectionInput = {
    id?: number
    name: string
    email: string
    studentId: string
    evaluationsGiven?: EvaluationResponseUncheckedCreateNestedManyWithoutEvaluatorStudentInput
    evaluationsReceived?: EvaluationResponseUncheckedCreateNestedManyWithoutEvaluatedStudentInput
  }

  export type StudentCreateOrConnectWithoutSectionInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutSectionInput, StudentUncheckedCreateWithoutSectionInput>
  }

  export type StudentCreateManySectionInputEnvelope = {
    data: StudentCreateManySectionInput | StudentCreateManySectionInput[]
    skipDuplicates?: boolean
  }

  export type EvaluationCreateWithoutSectionInput = {
    title: string
    description?: string | null
    criteria?: EvaluationCriteriaCreateNestedManyWithoutEvaluationInput
    responses?: EvaluationResponseCreateNestedManyWithoutEvaluationInput
  }

  export type EvaluationUncheckedCreateWithoutSectionInput = {
    id?: number
    title: string
    description?: string | null
    criteria?: EvaluationCriteriaUncheckedCreateNestedManyWithoutEvaluationInput
    responses?: EvaluationResponseUncheckedCreateNestedManyWithoutEvaluationInput
  }

  export type EvaluationCreateOrConnectWithoutSectionInput = {
    where: EvaluationWhereUniqueInput
    create: XOR<EvaluationCreateWithoutSectionInput, EvaluationUncheckedCreateWithoutSectionInput>
  }

  export type EvaluationCreateManySectionInputEnvelope = {
    data: EvaluationCreateManySectionInput | EvaluationCreateManySectionInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutSectionsInput = {
    update: XOR<UserUpdateWithoutSectionsInput, UserUncheckedUpdateWithoutSectionsInput>
    create: XOR<UserCreateWithoutSectionsInput, UserUncheckedCreateWithoutSectionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSectionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSectionsInput, UserUncheckedUpdateWithoutSectionsInput>
  }

  export type UserUpdateWithoutSectionsInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateWithoutSectionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
  }

  export type StudentUpsertWithWhereUniqueWithoutSectionInput = {
    where: StudentWhereUniqueInput
    update: XOR<StudentUpdateWithoutSectionInput, StudentUncheckedUpdateWithoutSectionInput>
    create: XOR<StudentCreateWithoutSectionInput, StudentUncheckedCreateWithoutSectionInput>
  }

  export type StudentUpdateWithWhereUniqueWithoutSectionInput = {
    where: StudentWhereUniqueInput
    data: XOR<StudentUpdateWithoutSectionInput, StudentUncheckedUpdateWithoutSectionInput>
  }

  export type StudentUpdateManyWithWhereWithoutSectionInput = {
    where: StudentScalarWhereInput
    data: XOR<StudentUpdateManyMutationInput, StudentUncheckedUpdateManyWithoutSectionInput>
  }

  export type StudentScalarWhereInput = {
    AND?: StudentScalarWhereInput | StudentScalarWhereInput[]
    OR?: StudentScalarWhereInput[]
    NOT?: StudentScalarWhereInput | StudentScalarWhereInput[]
    id?: IntFilter<"Student"> | number
    name?: StringFilter<"Student"> | string
    email?: StringFilter<"Student"> | string
    studentId?: StringFilter<"Student"> | string
    sectionId?: IntFilter<"Student"> | number
  }

  export type EvaluationUpsertWithWhereUniqueWithoutSectionInput = {
    where: EvaluationWhereUniqueInput
    update: XOR<EvaluationUpdateWithoutSectionInput, EvaluationUncheckedUpdateWithoutSectionInput>
    create: XOR<EvaluationCreateWithoutSectionInput, EvaluationUncheckedCreateWithoutSectionInput>
  }

  export type EvaluationUpdateWithWhereUniqueWithoutSectionInput = {
    where: EvaluationWhereUniqueInput
    data: XOR<EvaluationUpdateWithoutSectionInput, EvaluationUncheckedUpdateWithoutSectionInput>
  }

  export type EvaluationUpdateManyWithWhereWithoutSectionInput = {
    where: EvaluationScalarWhereInput
    data: XOR<EvaluationUpdateManyMutationInput, EvaluationUncheckedUpdateManyWithoutSectionInput>
  }

  export type EvaluationScalarWhereInput = {
    AND?: EvaluationScalarWhereInput | EvaluationScalarWhereInput[]
    OR?: EvaluationScalarWhereInput[]
    NOT?: EvaluationScalarWhereInput | EvaluationScalarWhereInput[]
    id?: IntFilter<"Evaluation"> | number
    title?: StringFilter<"Evaluation"> | string
    description?: StringNullableFilter<"Evaluation"> | string | null
    sectionId?: IntFilter<"Evaluation"> | number
  }

  export type SectionCreateWithoutStudentsInput = {
    name: string
    description?: string | null
    createdAt?: Date | string
    instructor: UserCreateNestedOneWithoutSectionsInput
    evaluations?: EvaluationCreateNestedManyWithoutSectionInput
  }

  export type SectionUncheckedCreateWithoutStudentsInput = {
    id?: number
    name: string
    description?: string | null
    createdBy: number
    createdAt?: Date | string
    evaluations?: EvaluationUncheckedCreateNestedManyWithoutSectionInput
  }

  export type SectionCreateOrConnectWithoutStudentsInput = {
    where: SectionWhereUniqueInput
    create: XOR<SectionCreateWithoutStudentsInput, SectionUncheckedCreateWithoutStudentsInput>
  }

  export type EvaluationResponseCreateWithoutEvaluatorStudentInput = {
    score: number
    evaluation: EvaluationCreateNestedOneWithoutResponsesInput
    evaluatedStudent: StudentCreateNestedOneWithoutEvaluationsReceivedInput
    criterion: EvaluationCriteriaCreateNestedOneWithoutResponsesInput
  }

  export type EvaluationResponseUncheckedCreateWithoutEvaluatorStudentInput = {
    id?: number
    evaluationId: number
    evaluatedStudentId: number
    criterionId: number
    score: number
  }

  export type EvaluationResponseCreateOrConnectWithoutEvaluatorStudentInput = {
    where: EvaluationResponseWhereUniqueInput
    create: XOR<EvaluationResponseCreateWithoutEvaluatorStudentInput, EvaluationResponseUncheckedCreateWithoutEvaluatorStudentInput>
  }

  export type EvaluationResponseCreateManyEvaluatorStudentInputEnvelope = {
    data: EvaluationResponseCreateManyEvaluatorStudentInput | EvaluationResponseCreateManyEvaluatorStudentInput[]
    skipDuplicates?: boolean
  }

  export type EvaluationResponseCreateWithoutEvaluatedStudentInput = {
    score: number
    evaluation: EvaluationCreateNestedOneWithoutResponsesInput
    evaluatorStudent: StudentCreateNestedOneWithoutEvaluationsGivenInput
    criterion: EvaluationCriteriaCreateNestedOneWithoutResponsesInput
  }

  export type EvaluationResponseUncheckedCreateWithoutEvaluatedStudentInput = {
    id?: number
    evaluationId: number
    evaluatorStudentId: number
    criterionId: number
    score: number
  }

  export type EvaluationResponseCreateOrConnectWithoutEvaluatedStudentInput = {
    where: EvaluationResponseWhereUniqueInput
    create: XOR<EvaluationResponseCreateWithoutEvaluatedStudentInput, EvaluationResponseUncheckedCreateWithoutEvaluatedStudentInput>
  }

  export type EvaluationResponseCreateManyEvaluatedStudentInputEnvelope = {
    data: EvaluationResponseCreateManyEvaluatedStudentInput | EvaluationResponseCreateManyEvaluatedStudentInput[]
    skipDuplicates?: boolean
  }

  export type SectionUpsertWithoutStudentsInput = {
    update: XOR<SectionUpdateWithoutStudentsInput, SectionUncheckedUpdateWithoutStudentsInput>
    create: XOR<SectionCreateWithoutStudentsInput, SectionUncheckedCreateWithoutStudentsInput>
    where?: SectionWhereInput
  }

  export type SectionUpdateToOneWithWhereWithoutStudentsInput = {
    where?: SectionWhereInput
    data: XOR<SectionUpdateWithoutStudentsInput, SectionUncheckedUpdateWithoutStudentsInput>
  }

  export type SectionUpdateWithoutStudentsInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    instructor?: UserUpdateOneRequiredWithoutSectionsNestedInput
    evaluations?: EvaluationUpdateManyWithoutSectionNestedInput
  }

  export type SectionUncheckedUpdateWithoutStudentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    evaluations?: EvaluationUncheckedUpdateManyWithoutSectionNestedInput
  }

  export type EvaluationResponseUpsertWithWhereUniqueWithoutEvaluatorStudentInput = {
    where: EvaluationResponseWhereUniqueInput
    update: XOR<EvaluationResponseUpdateWithoutEvaluatorStudentInput, EvaluationResponseUncheckedUpdateWithoutEvaluatorStudentInput>
    create: XOR<EvaluationResponseCreateWithoutEvaluatorStudentInput, EvaluationResponseUncheckedCreateWithoutEvaluatorStudentInput>
  }

  export type EvaluationResponseUpdateWithWhereUniqueWithoutEvaluatorStudentInput = {
    where: EvaluationResponseWhereUniqueInput
    data: XOR<EvaluationResponseUpdateWithoutEvaluatorStudentInput, EvaluationResponseUncheckedUpdateWithoutEvaluatorStudentInput>
  }

  export type EvaluationResponseUpdateManyWithWhereWithoutEvaluatorStudentInput = {
    where: EvaluationResponseScalarWhereInput
    data: XOR<EvaluationResponseUpdateManyMutationInput, EvaluationResponseUncheckedUpdateManyWithoutEvaluatorStudentInput>
  }

  export type EvaluationResponseScalarWhereInput = {
    AND?: EvaluationResponseScalarWhereInput | EvaluationResponseScalarWhereInput[]
    OR?: EvaluationResponseScalarWhereInput[]
    NOT?: EvaluationResponseScalarWhereInput | EvaluationResponseScalarWhereInput[]
    id?: IntFilter<"EvaluationResponse"> | number
    evaluationId?: IntFilter<"EvaluationResponse"> | number
    evaluatorStudentId?: IntFilter<"EvaluationResponse"> | number
    evaluatedStudentId?: IntFilter<"EvaluationResponse"> | number
    criterionId?: IntFilter<"EvaluationResponse"> | number
    score?: IntFilter<"EvaluationResponse"> | number
  }

  export type EvaluationResponseUpsertWithWhereUniqueWithoutEvaluatedStudentInput = {
    where: EvaluationResponseWhereUniqueInput
    update: XOR<EvaluationResponseUpdateWithoutEvaluatedStudentInput, EvaluationResponseUncheckedUpdateWithoutEvaluatedStudentInput>
    create: XOR<EvaluationResponseCreateWithoutEvaluatedStudentInput, EvaluationResponseUncheckedCreateWithoutEvaluatedStudentInput>
  }

  export type EvaluationResponseUpdateWithWhereUniqueWithoutEvaluatedStudentInput = {
    where: EvaluationResponseWhereUniqueInput
    data: XOR<EvaluationResponseUpdateWithoutEvaluatedStudentInput, EvaluationResponseUncheckedUpdateWithoutEvaluatedStudentInput>
  }

  export type EvaluationResponseUpdateManyWithWhereWithoutEvaluatedStudentInput = {
    where: EvaluationResponseScalarWhereInput
    data: XOR<EvaluationResponseUpdateManyMutationInput, EvaluationResponseUncheckedUpdateManyWithoutEvaluatedStudentInput>
  }

  export type SectionCreateWithoutEvaluationsInput = {
    name: string
    description?: string | null
    createdAt?: Date | string
    instructor: UserCreateNestedOneWithoutSectionsInput
    students?: StudentCreateNestedManyWithoutSectionInput
  }

  export type SectionUncheckedCreateWithoutEvaluationsInput = {
    id?: number
    name: string
    description?: string | null
    createdBy: number
    createdAt?: Date | string
    students?: StudentUncheckedCreateNestedManyWithoutSectionInput
  }

  export type SectionCreateOrConnectWithoutEvaluationsInput = {
    where: SectionWhereUniqueInput
    create: XOR<SectionCreateWithoutEvaluationsInput, SectionUncheckedCreateWithoutEvaluationsInput>
  }

  export type EvaluationCriteriaCreateWithoutEvaluationInput = {
    name: string
    responses?: EvaluationResponseCreateNestedManyWithoutCriterionInput
  }

  export type EvaluationCriteriaUncheckedCreateWithoutEvaluationInput = {
    id?: number
    name: string
    responses?: EvaluationResponseUncheckedCreateNestedManyWithoutCriterionInput
  }

  export type EvaluationCriteriaCreateOrConnectWithoutEvaluationInput = {
    where: EvaluationCriteriaWhereUniqueInput
    create: XOR<EvaluationCriteriaCreateWithoutEvaluationInput, EvaluationCriteriaUncheckedCreateWithoutEvaluationInput>
  }

  export type EvaluationCriteriaCreateManyEvaluationInputEnvelope = {
    data: EvaluationCriteriaCreateManyEvaluationInput | EvaluationCriteriaCreateManyEvaluationInput[]
    skipDuplicates?: boolean
  }

  export type EvaluationResponseCreateWithoutEvaluationInput = {
    score: number
    evaluatorStudent: StudentCreateNestedOneWithoutEvaluationsGivenInput
    evaluatedStudent: StudentCreateNestedOneWithoutEvaluationsReceivedInput
    criterion: EvaluationCriteriaCreateNestedOneWithoutResponsesInput
  }

  export type EvaluationResponseUncheckedCreateWithoutEvaluationInput = {
    id?: number
    evaluatorStudentId: number
    evaluatedStudentId: number
    criterionId: number
    score: number
  }

  export type EvaluationResponseCreateOrConnectWithoutEvaluationInput = {
    where: EvaluationResponseWhereUniqueInput
    create: XOR<EvaluationResponseCreateWithoutEvaluationInput, EvaluationResponseUncheckedCreateWithoutEvaluationInput>
  }

  export type EvaluationResponseCreateManyEvaluationInputEnvelope = {
    data: EvaluationResponseCreateManyEvaluationInput | EvaluationResponseCreateManyEvaluationInput[]
    skipDuplicates?: boolean
  }

  export type SectionUpsertWithoutEvaluationsInput = {
    update: XOR<SectionUpdateWithoutEvaluationsInput, SectionUncheckedUpdateWithoutEvaluationsInput>
    create: XOR<SectionCreateWithoutEvaluationsInput, SectionUncheckedCreateWithoutEvaluationsInput>
    where?: SectionWhereInput
  }

  export type SectionUpdateToOneWithWhereWithoutEvaluationsInput = {
    where?: SectionWhereInput
    data: XOR<SectionUpdateWithoutEvaluationsInput, SectionUncheckedUpdateWithoutEvaluationsInput>
  }

  export type SectionUpdateWithoutEvaluationsInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    instructor?: UserUpdateOneRequiredWithoutSectionsNestedInput
    students?: StudentUpdateManyWithoutSectionNestedInput
  }

  export type SectionUncheckedUpdateWithoutEvaluationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    students?: StudentUncheckedUpdateManyWithoutSectionNestedInput
  }

  export type EvaluationCriteriaUpsertWithWhereUniqueWithoutEvaluationInput = {
    where: EvaluationCriteriaWhereUniqueInput
    update: XOR<EvaluationCriteriaUpdateWithoutEvaluationInput, EvaluationCriteriaUncheckedUpdateWithoutEvaluationInput>
    create: XOR<EvaluationCriteriaCreateWithoutEvaluationInput, EvaluationCriteriaUncheckedCreateWithoutEvaluationInput>
  }

  export type EvaluationCriteriaUpdateWithWhereUniqueWithoutEvaluationInput = {
    where: EvaluationCriteriaWhereUniqueInput
    data: XOR<EvaluationCriteriaUpdateWithoutEvaluationInput, EvaluationCriteriaUncheckedUpdateWithoutEvaluationInput>
  }

  export type EvaluationCriteriaUpdateManyWithWhereWithoutEvaluationInput = {
    where: EvaluationCriteriaScalarWhereInput
    data: XOR<EvaluationCriteriaUpdateManyMutationInput, EvaluationCriteriaUncheckedUpdateManyWithoutEvaluationInput>
  }

  export type EvaluationCriteriaScalarWhereInput = {
    AND?: EvaluationCriteriaScalarWhereInput | EvaluationCriteriaScalarWhereInput[]
    OR?: EvaluationCriteriaScalarWhereInput[]
    NOT?: EvaluationCriteriaScalarWhereInput | EvaluationCriteriaScalarWhereInput[]
    id?: IntFilter<"EvaluationCriteria"> | number
    name?: StringFilter<"EvaluationCriteria"> | string
    evaluationId?: IntFilter<"EvaluationCriteria"> | number
  }

  export type EvaluationResponseUpsertWithWhereUniqueWithoutEvaluationInput = {
    where: EvaluationResponseWhereUniqueInput
    update: XOR<EvaluationResponseUpdateWithoutEvaluationInput, EvaluationResponseUncheckedUpdateWithoutEvaluationInput>
    create: XOR<EvaluationResponseCreateWithoutEvaluationInput, EvaluationResponseUncheckedCreateWithoutEvaluationInput>
  }

  export type EvaluationResponseUpdateWithWhereUniqueWithoutEvaluationInput = {
    where: EvaluationResponseWhereUniqueInput
    data: XOR<EvaluationResponseUpdateWithoutEvaluationInput, EvaluationResponseUncheckedUpdateWithoutEvaluationInput>
  }

  export type EvaluationResponseUpdateManyWithWhereWithoutEvaluationInput = {
    where: EvaluationResponseScalarWhereInput
    data: XOR<EvaluationResponseUpdateManyMutationInput, EvaluationResponseUncheckedUpdateManyWithoutEvaluationInput>
  }

  export type EvaluationCreateWithoutCriteriaInput = {
    title: string
    description?: string | null
    section: SectionCreateNestedOneWithoutEvaluationsInput
    responses?: EvaluationResponseCreateNestedManyWithoutEvaluationInput
  }

  export type EvaluationUncheckedCreateWithoutCriteriaInput = {
    id?: number
    title: string
    description?: string | null
    sectionId: number
    responses?: EvaluationResponseUncheckedCreateNestedManyWithoutEvaluationInput
  }

  export type EvaluationCreateOrConnectWithoutCriteriaInput = {
    where: EvaluationWhereUniqueInput
    create: XOR<EvaluationCreateWithoutCriteriaInput, EvaluationUncheckedCreateWithoutCriteriaInput>
  }

  export type EvaluationResponseCreateWithoutCriterionInput = {
    score: number
    evaluation: EvaluationCreateNestedOneWithoutResponsesInput
    evaluatorStudent: StudentCreateNestedOneWithoutEvaluationsGivenInput
    evaluatedStudent: StudentCreateNestedOneWithoutEvaluationsReceivedInput
  }

  export type EvaluationResponseUncheckedCreateWithoutCriterionInput = {
    id?: number
    evaluationId: number
    evaluatorStudentId: number
    evaluatedStudentId: number
    score: number
  }

  export type EvaluationResponseCreateOrConnectWithoutCriterionInput = {
    where: EvaluationResponseWhereUniqueInput
    create: XOR<EvaluationResponseCreateWithoutCriterionInput, EvaluationResponseUncheckedCreateWithoutCriterionInput>
  }

  export type EvaluationResponseCreateManyCriterionInputEnvelope = {
    data: EvaluationResponseCreateManyCriterionInput | EvaluationResponseCreateManyCriterionInput[]
    skipDuplicates?: boolean
  }

  export type EvaluationUpsertWithoutCriteriaInput = {
    update: XOR<EvaluationUpdateWithoutCriteriaInput, EvaluationUncheckedUpdateWithoutCriteriaInput>
    create: XOR<EvaluationCreateWithoutCriteriaInput, EvaluationUncheckedCreateWithoutCriteriaInput>
    where?: EvaluationWhereInput
  }

  export type EvaluationUpdateToOneWithWhereWithoutCriteriaInput = {
    where?: EvaluationWhereInput
    data: XOR<EvaluationUpdateWithoutCriteriaInput, EvaluationUncheckedUpdateWithoutCriteriaInput>
  }

  export type EvaluationUpdateWithoutCriteriaInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    section?: SectionUpdateOneRequiredWithoutEvaluationsNestedInput
    responses?: EvaluationResponseUpdateManyWithoutEvaluationNestedInput
  }

  export type EvaluationUncheckedUpdateWithoutCriteriaInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sectionId?: IntFieldUpdateOperationsInput | number
    responses?: EvaluationResponseUncheckedUpdateManyWithoutEvaluationNestedInput
  }

  export type EvaluationResponseUpsertWithWhereUniqueWithoutCriterionInput = {
    where: EvaluationResponseWhereUniqueInput
    update: XOR<EvaluationResponseUpdateWithoutCriterionInput, EvaluationResponseUncheckedUpdateWithoutCriterionInput>
    create: XOR<EvaluationResponseCreateWithoutCriterionInput, EvaluationResponseUncheckedCreateWithoutCriterionInput>
  }

  export type EvaluationResponseUpdateWithWhereUniqueWithoutCriterionInput = {
    where: EvaluationResponseWhereUniqueInput
    data: XOR<EvaluationResponseUpdateWithoutCriterionInput, EvaluationResponseUncheckedUpdateWithoutCriterionInput>
  }

  export type EvaluationResponseUpdateManyWithWhereWithoutCriterionInput = {
    where: EvaluationResponseScalarWhereInput
    data: XOR<EvaluationResponseUpdateManyMutationInput, EvaluationResponseUncheckedUpdateManyWithoutCriterionInput>
  }

  export type EvaluationCreateWithoutResponsesInput = {
    title: string
    description?: string | null
    section: SectionCreateNestedOneWithoutEvaluationsInput
    criteria?: EvaluationCriteriaCreateNestedManyWithoutEvaluationInput
  }

  export type EvaluationUncheckedCreateWithoutResponsesInput = {
    id?: number
    title: string
    description?: string | null
    sectionId: number
    criteria?: EvaluationCriteriaUncheckedCreateNestedManyWithoutEvaluationInput
  }

  export type EvaluationCreateOrConnectWithoutResponsesInput = {
    where: EvaluationWhereUniqueInput
    create: XOR<EvaluationCreateWithoutResponsesInput, EvaluationUncheckedCreateWithoutResponsesInput>
  }

  export type StudentCreateWithoutEvaluationsGivenInput = {
    name: string
    email: string
    studentId: string
    section: SectionCreateNestedOneWithoutStudentsInput
    evaluationsReceived?: EvaluationResponseCreateNestedManyWithoutEvaluatedStudentInput
  }

  export type StudentUncheckedCreateWithoutEvaluationsGivenInput = {
    id?: number
    name: string
    email: string
    studentId: string
    sectionId: number
    evaluationsReceived?: EvaluationResponseUncheckedCreateNestedManyWithoutEvaluatedStudentInput
  }

  export type StudentCreateOrConnectWithoutEvaluationsGivenInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutEvaluationsGivenInput, StudentUncheckedCreateWithoutEvaluationsGivenInput>
  }

  export type StudentCreateWithoutEvaluationsReceivedInput = {
    name: string
    email: string
    studentId: string
    section: SectionCreateNestedOneWithoutStudentsInput
    evaluationsGiven?: EvaluationResponseCreateNestedManyWithoutEvaluatorStudentInput
  }

  export type StudentUncheckedCreateWithoutEvaluationsReceivedInput = {
    id?: number
    name: string
    email: string
    studentId: string
    sectionId: number
    evaluationsGiven?: EvaluationResponseUncheckedCreateNestedManyWithoutEvaluatorStudentInput
  }

  export type StudentCreateOrConnectWithoutEvaluationsReceivedInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutEvaluationsReceivedInput, StudentUncheckedCreateWithoutEvaluationsReceivedInput>
  }

  export type EvaluationCriteriaCreateWithoutResponsesInput = {
    name: string
    evaluation: EvaluationCreateNestedOneWithoutCriteriaInput
  }

  export type EvaluationCriteriaUncheckedCreateWithoutResponsesInput = {
    id?: number
    name: string
    evaluationId: number
  }

  export type EvaluationCriteriaCreateOrConnectWithoutResponsesInput = {
    where: EvaluationCriteriaWhereUniqueInput
    create: XOR<EvaluationCriteriaCreateWithoutResponsesInput, EvaluationCriteriaUncheckedCreateWithoutResponsesInput>
  }

  export type EvaluationUpsertWithoutResponsesInput = {
    update: XOR<EvaluationUpdateWithoutResponsesInput, EvaluationUncheckedUpdateWithoutResponsesInput>
    create: XOR<EvaluationCreateWithoutResponsesInput, EvaluationUncheckedCreateWithoutResponsesInput>
    where?: EvaluationWhereInput
  }

  export type EvaluationUpdateToOneWithWhereWithoutResponsesInput = {
    where?: EvaluationWhereInput
    data: XOR<EvaluationUpdateWithoutResponsesInput, EvaluationUncheckedUpdateWithoutResponsesInput>
  }

  export type EvaluationUpdateWithoutResponsesInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    section?: SectionUpdateOneRequiredWithoutEvaluationsNestedInput
    criteria?: EvaluationCriteriaUpdateManyWithoutEvaluationNestedInput
  }

  export type EvaluationUncheckedUpdateWithoutResponsesInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    sectionId?: IntFieldUpdateOperationsInput | number
    criteria?: EvaluationCriteriaUncheckedUpdateManyWithoutEvaluationNestedInput
  }

  export type StudentUpsertWithoutEvaluationsGivenInput = {
    update: XOR<StudentUpdateWithoutEvaluationsGivenInput, StudentUncheckedUpdateWithoutEvaluationsGivenInput>
    create: XOR<StudentCreateWithoutEvaluationsGivenInput, StudentUncheckedCreateWithoutEvaluationsGivenInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutEvaluationsGivenInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutEvaluationsGivenInput, StudentUncheckedUpdateWithoutEvaluationsGivenInput>
  }

  export type StudentUpdateWithoutEvaluationsGivenInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    section?: SectionUpdateOneRequiredWithoutStudentsNestedInput
    evaluationsReceived?: EvaluationResponseUpdateManyWithoutEvaluatedStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutEvaluationsGivenInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    sectionId?: IntFieldUpdateOperationsInput | number
    evaluationsReceived?: EvaluationResponseUncheckedUpdateManyWithoutEvaluatedStudentNestedInput
  }

  export type StudentUpsertWithoutEvaluationsReceivedInput = {
    update: XOR<StudentUpdateWithoutEvaluationsReceivedInput, StudentUncheckedUpdateWithoutEvaluationsReceivedInput>
    create: XOR<StudentCreateWithoutEvaluationsReceivedInput, StudentUncheckedCreateWithoutEvaluationsReceivedInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutEvaluationsReceivedInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutEvaluationsReceivedInput, StudentUncheckedUpdateWithoutEvaluationsReceivedInput>
  }

  export type StudentUpdateWithoutEvaluationsReceivedInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    section?: SectionUpdateOneRequiredWithoutStudentsNestedInput
    evaluationsGiven?: EvaluationResponseUpdateManyWithoutEvaluatorStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutEvaluationsReceivedInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    sectionId?: IntFieldUpdateOperationsInput | number
    evaluationsGiven?: EvaluationResponseUncheckedUpdateManyWithoutEvaluatorStudentNestedInput
  }

  export type EvaluationCriteriaUpsertWithoutResponsesInput = {
    update: XOR<EvaluationCriteriaUpdateWithoutResponsesInput, EvaluationCriteriaUncheckedUpdateWithoutResponsesInput>
    create: XOR<EvaluationCriteriaCreateWithoutResponsesInput, EvaluationCriteriaUncheckedCreateWithoutResponsesInput>
    where?: EvaluationCriteriaWhereInput
  }

  export type EvaluationCriteriaUpdateToOneWithWhereWithoutResponsesInput = {
    where?: EvaluationCriteriaWhereInput
    data: XOR<EvaluationCriteriaUpdateWithoutResponsesInput, EvaluationCriteriaUncheckedUpdateWithoutResponsesInput>
  }

  export type EvaluationCriteriaUpdateWithoutResponsesInput = {
    name?: StringFieldUpdateOperationsInput | string
    evaluation?: EvaluationUpdateOneRequiredWithoutCriteriaNestedInput
  }

  export type EvaluationCriteriaUncheckedUpdateWithoutResponsesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    evaluationId?: IntFieldUpdateOperationsInput | number
  }

  export type SectionCreateManyInstructorInput = {
    id?: number
    name: string
    description?: string | null
    createdAt?: Date | string
  }

  export type SectionUpdateWithoutInstructorInput = {
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    students?: StudentUpdateManyWithoutSectionNestedInput
    evaluations?: EvaluationUpdateManyWithoutSectionNestedInput
  }

  export type SectionUncheckedUpdateWithoutInstructorInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    students?: StudentUncheckedUpdateManyWithoutSectionNestedInput
    evaluations?: EvaluationUncheckedUpdateManyWithoutSectionNestedInput
  }

  export type SectionUncheckedUpdateManyWithoutInstructorInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentCreateManySectionInput = {
    id?: number
    name: string
    email: string
    studentId: string
  }

  export type EvaluationCreateManySectionInput = {
    id?: number
    title: string
    description?: string | null
  }

  export type StudentUpdateWithoutSectionInput = {
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    evaluationsGiven?: EvaluationResponseUpdateManyWithoutEvaluatorStudentNestedInput
    evaluationsReceived?: EvaluationResponseUpdateManyWithoutEvaluatedStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutSectionInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
    evaluationsGiven?: EvaluationResponseUncheckedUpdateManyWithoutEvaluatorStudentNestedInput
    evaluationsReceived?: EvaluationResponseUncheckedUpdateManyWithoutEvaluatedStudentNestedInput
  }

  export type StudentUncheckedUpdateManyWithoutSectionInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    studentId?: StringFieldUpdateOperationsInput | string
  }

  export type EvaluationUpdateWithoutSectionInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    criteria?: EvaluationCriteriaUpdateManyWithoutEvaluationNestedInput
    responses?: EvaluationResponseUpdateManyWithoutEvaluationNestedInput
  }

  export type EvaluationUncheckedUpdateWithoutSectionInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    criteria?: EvaluationCriteriaUncheckedUpdateManyWithoutEvaluationNestedInput
    responses?: EvaluationResponseUncheckedUpdateManyWithoutEvaluationNestedInput
  }

  export type EvaluationUncheckedUpdateManyWithoutSectionInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EvaluationResponseCreateManyEvaluatorStudentInput = {
    id?: number
    evaluationId: number
    evaluatedStudentId: number
    criterionId: number
    score: number
  }

  export type EvaluationResponseCreateManyEvaluatedStudentInput = {
    id?: number
    evaluationId: number
    evaluatorStudentId: number
    criterionId: number
    score: number
  }

  export type EvaluationResponseUpdateWithoutEvaluatorStudentInput = {
    score?: IntFieldUpdateOperationsInput | number
    evaluation?: EvaluationUpdateOneRequiredWithoutResponsesNestedInput
    evaluatedStudent?: StudentUpdateOneRequiredWithoutEvaluationsReceivedNestedInput
    criterion?: EvaluationCriteriaUpdateOneRequiredWithoutResponsesNestedInput
  }

  export type EvaluationResponseUncheckedUpdateWithoutEvaluatorStudentInput = {
    id?: IntFieldUpdateOperationsInput | number
    evaluationId?: IntFieldUpdateOperationsInput | number
    evaluatedStudentId?: IntFieldUpdateOperationsInput | number
    criterionId?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
  }

  export type EvaluationResponseUncheckedUpdateManyWithoutEvaluatorStudentInput = {
    id?: IntFieldUpdateOperationsInput | number
    evaluationId?: IntFieldUpdateOperationsInput | number
    evaluatedStudentId?: IntFieldUpdateOperationsInput | number
    criterionId?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
  }

  export type EvaluationResponseUpdateWithoutEvaluatedStudentInput = {
    score?: IntFieldUpdateOperationsInput | number
    evaluation?: EvaluationUpdateOneRequiredWithoutResponsesNestedInput
    evaluatorStudent?: StudentUpdateOneRequiredWithoutEvaluationsGivenNestedInput
    criterion?: EvaluationCriteriaUpdateOneRequiredWithoutResponsesNestedInput
  }

  export type EvaluationResponseUncheckedUpdateWithoutEvaluatedStudentInput = {
    id?: IntFieldUpdateOperationsInput | number
    evaluationId?: IntFieldUpdateOperationsInput | number
    evaluatorStudentId?: IntFieldUpdateOperationsInput | number
    criterionId?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
  }

  export type EvaluationResponseUncheckedUpdateManyWithoutEvaluatedStudentInput = {
    id?: IntFieldUpdateOperationsInput | number
    evaluationId?: IntFieldUpdateOperationsInput | number
    evaluatorStudentId?: IntFieldUpdateOperationsInput | number
    criterionId?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
  }

  export type EvaluationCriteriaCreateManyEvaluationInput = {
    id?: number
    name: string
  }

  export type EvaluationResponseCreateManyEvaluationInput = {
    id?: number
    evaluatorStudentId: number
    evaluatedStudentId: number
    criterionId: number
    score: number
  }

  export type EvaluationCriteriaUpdateWithoutEvaluationInput = {
    name?: StringFieldUpdateOperationsInput | string
    responses?: EvaluationResponseUpdateManyWithoutCriterionNestedInput
  }

  export type EvaluationCriteriaUncheckedUpdateWithoutEvaluationInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    responses?: EvaluationResponseUncheckedUpdateManyWithoutCriterionNestedInput
  }

  export type EvaluationCriteriaUncheckedUpdateManyWithoutEvaluationInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type EvaluationResponseUpdateWithoutEvaluationInput = {
    score?: IntFieldUpdateOperationsInput | number
    evaluatorStudent?: StudentUpdateOneRequiredWithoutEvaluationsGivenNestedInput
    evaluatedStudent?: StudentUpdateOneRequiredWithoutEvaluationsReceivedNestedInput
    criterion?: EvaluationCriteriaUpdateOneRequiredWithoutResponsesNestedInput
  }

  export type EvaluationResponseUncheckedUpdateWithoutEvaluationInput = {
    id?: IntFieldUpdateOperationsInput | number
    evaluatorStudentId?: IntFieldUpdateOperationsInput | number
    evaluatedStudentId?: IntFieldUpdateOperationsInput | number
    criterionId?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
  }

  export type EvaluationResponseUncheckedUpdateManyWithoutEvaluationInput = {
    id?: IntFieldUpdateOperationsInput | number
    evaluatorStudentId?: IntFieldUpdateOperationsInput | number
    evaluatedStudentId?: IntFieldUpdateOperationsInput | number
    criterionId?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
  }

  export type EvaluationResponseCreateManyCriterionInput = {
    id?: number
    evaluationId: number
    evaluatorStudentId: number
    evaluatedStudentId: number
    score: number
  }

  export type EvaluationResponseUpdateWithoutCriterionInput = {
    score?: IntFieldUpdateOperationsInput | number
    evaluation?: EvaluationUpdateOneRequiredWithoutResponsesNestedInput
    evaluatorStudent?: StudentUpdateOneRequiredWithoutEvaluationsGivenNestedInput
    evaluatedStudent?: StudentUpdateOneRequiredWithoutEvaluationsReceivedNestedInput
  }

  export type EvaluationResponseUncheckedUpdateWithoutCriterionInput = {
    id?: IntFieldUpdateOperationsInput | number
    evaluationId?: IntFieldUpdateOperationsInput | number
    evaluatorStudentId?: IntFieldUpdateOperationsInput | number
    evaluatedStudentId?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
  }

  export type EvaluationResponseUncheckedUpdateManyWithoutCriterionInput = {
    id?: IntFieldUpdateOperationsInput | number
    evaluationId?: IntFieldUpdateOperationsInput | number
    evaluatorStudentId?: IntFieldUpdateOperationsInput | number
    evaluatedStudentId?: IntFieldUpdateOperationsInput | number
    score?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}