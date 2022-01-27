import { model, Schema, Document } from 'mongoose';

const TOKEN = 'Category';

export interface ICategory extends Document {
	name: string;
	
};

const schema = new Schema<ICategory>({
	name: {
		type: String,
		required: true
	},
	
});

export const Category = model<ICategory>(TOKEN, schema);