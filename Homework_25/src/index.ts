import * as dotenv from 'dotenv';
import * as express from 'express';
import * as mongoose from 'mongoose';

import { categories } from './app/category/category.controller';
import { posts } from './app/post/post.controller';
import { comments } from './app/comment/comment.controller';
import { userMiddleware } from './middlewares/user.middleware';
import { errorHandlingMiddleware } from './middlewares/error-handling.middleware';

dotenv.config();

const connect = async () => {
	const DB_NAME = process.env.DB_NAME;
	const DB_USER = process.env.DB_USER;
	const DB_PASSWORD = process.env.DB_PASSWORD;

	await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster1.prdyz.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`);
};

connect();

const app = express();

app.use(express.json());
app.use(userMiddleware);


app.use('/categories', categories);
app.use('/categories/:categoryId/posts', posts);
app.use('/categories/:categoryId/posts/:postId/comments', comments);


app.use(errorHandlingMiddleware);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
});