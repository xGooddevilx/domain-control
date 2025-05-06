type Brand<T, B extends string> = T & { __brand: B };

export namespace Identifiers {
    export type DomainId = Brand<string, 'DomainId'>;
}