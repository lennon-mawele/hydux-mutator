import { IImmutableSetable } from '../types';
import * as List from '@funkia/list';
export { List };
export default class ImmuList<T> implements IImmutableSetable<number, T, ImmuList<T>> {
    readonly length: number;
    private _list;
    constructor(values?: T[]);
    toString(): string;
    toLocaleString(): string;
    get(i: number): T;
    set(i: number, val: T): ImmuList<T>;
    remove(from: number, amount?: number): ImmuList<T>;
    includes(item: T): boolean;
    append(item: T): ImmuList<T>;
    prepend(item: T): ImmuList<T>;
    first(): T | undefined;
    last(): T | undefined;
    tail(): ImmuList<T>;
    edit(cb: (list: List.List<T>, ListModule: typeof List) => List.List<T>): ImmuList<T>;
    editWithAny<U>(cb: (list: List.List<T>, ListModule: typeof List) => U): U;
    toArray(): T[];
    toJSON(): {
        class: string;
        data: T[];
    };
    concat(...items: (ImmuList<T> | Array<T> | T)[]): ImmuList<T>;
    join(separator?: string | undefined): string;
    slice(start?: number | undefined, end?: number | undefined): ImmuList<T>;
    indexOf(searchElement: T, fromIndex?: number | undefined): number;
    every(callbackfn: (value: T, index: number, array: this) => boolean, thisArg?: any): boolean;
    some(callbackfn: (value: T, index: number, array: this) => boolean, thisArg?: any): boolean;
    forEach(callbackfn: (value: T, index: number, array: this) => void, thisArg?: any): void;
    map<U>(callbackfn: (value: T, index: number, array: this) => U, thisArg?: any): ImmuList<U>;
    filter(callbackfn: (value: T, index: number, array: this) => boolean, thisArg?: any): ImmuList<T>;
    reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: this) => U, initialValue: U, thisArg?: any): U;
    reduceRight<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: this) => U, initialValue: U, thisArg?: any): U;
    [Symbol.iterator](): IterableIterator<T>;
    entries(): IterableIterator<[number, T]>;
    keys(): IterableIterator<number>;
    values(): IterableIterator<T>;
    find(predicate: (value: T, index: number, obj: this) => boolean, thisArg?: any): T | undefined;
    findIndex(predicate: (value: T, index: number, obj: this) => boolean, thisArg?: any): number;
    private _new<T>(list);
}
