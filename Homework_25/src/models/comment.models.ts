import { model, Schema, Types, Document } from "mongoose";
import { Post } from "./post.models";

const TOKEN = 'Сomment';

export interface IСomment extends Document {
	userId: string;
	body: string;
	post: Types.ObjectId;
}

const schema = new Schema<IСomment>({
	userId: {
		type: String,
		required: true
	},
	body: {
		type: String,
		required: true, 
		maxLength: 120
	},
	post: {
		type: Schema.Types.ObjectId,
		ref: Post
	}
});

export const Сomment = model<IСomment>(TOKEN, schema);