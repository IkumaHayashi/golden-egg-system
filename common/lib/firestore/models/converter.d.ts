interface SnapshotOptions {
    readonly serverTimestamps?: "estimate" | "previous" | "none";
}
interface DocumentData {
    [key: string]: any;
}
interface QueryDocumentSnapshot {
    data(option?: SnapshotOptions): DocumentData;
}
export declare type Converter<T> = {
    fromFirestore(snapshot: QueryDocumentSnapshot, op?: SnapshotOptions): T;
    toFirestore(model: Partial<T>): DocumentData;
};
export {};
