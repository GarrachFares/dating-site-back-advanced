/// <reference types="mongoose/types/PipelineStage" />
/// <reference types="mongoose" />
export declare type CatDocument = Cat & Document;
export declare class Cat {
    name: string;
    age: number;
    breed: string;
}
export declare const CatSchema: import("mongoose").Schema<import("mongoose").Document<Cat, any, any>, import("mongoose").Model<import("mongoose").Document<Cat, any, any>, any, any, any>, any, any>;
