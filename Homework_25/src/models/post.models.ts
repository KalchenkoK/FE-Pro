import { Document, model, Schema, Types } from 'mongoose';
import { Category } from './category.models';



const TOKEN = 'Post';

export interface IPost extends Document {
	title: string;
	body: string;
	userId: string;
	category: Types.ObjectId;
}

const schema = new Schema<IPost>({
	title: {
		type: String,
		required: true,
		maxLength: 60
	},
	body: {
		type: String,
		maxLength: 250
	},
	userId: {
		type: String,
		required: true
		
	},
	category: {
		type: Schema.Types.ObjectId,
		ref: Category
	}
});

export const Post = model<IPost>(TOKEN, schema);