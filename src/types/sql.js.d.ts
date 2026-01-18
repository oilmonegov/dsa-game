declare module 'sql.js' {
  interface SqlJsStatic {
    Database: new (data?: ArrayLike<number>) => Database;
  }

  interface Database {
    run(sql: string, params?: BindParams): void;
    exec(sql: string, params?: BindParams): QueryExecResult[];
    export(): Uint8Array;
    close(): void;
  }

  interface QueryExecResult {
    columns: string[];
    values: SqlValue[][];
  }

  type SqlValue = string | number | Uint8Array | null;
  type BindParams = SqlValue[] | Record<string, SqlValue>;

  interface InitSqlJsOptions {
    locateFile?: (file: string) => string;
  }

  function initSqlJs(options?: InitSqlJsOptions): Promise<SqlJsStatic>;
  export default initSqlJs;
  export { Database, SqlJsStatic, QueryExecResult, SqlValue, BindParams, InitSqlJsOptions };
}
