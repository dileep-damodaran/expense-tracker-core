import { ICategory as ICategory } from "./category";
import * as mongoose from "mongoose";

export interface ICategoryDocument extends mongoose.Document, ICategory {
}

