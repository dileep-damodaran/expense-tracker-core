import { ITag as ITag } from "./tag";
import * as mongoose from "mongoose";

export interface ITagDocument extends mongoose.Document, ITag {
}

