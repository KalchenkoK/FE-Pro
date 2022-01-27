import { NotFoundError } from "../../definitions/error.definition";
import { Post } from "../../models/post.models";
import { Category } from "../../models/category.models";

export class PostService {
  async create(
    categoryId: string,
    title: string,
    body: string,
    userId: string
  ) {
    const category = await Category.findById(categoryId).exec();

    if (!category) {
      throw new NotFoundError();
    }

    const post = new Post({
      title,
      body,
      userId,
      category,
    });

    const result = await post.save();

    return result.populate("category");
  }

  async list(userId: string, categoryId: string) {
    const category = await Category.findOne({ _id: categoryId, userId });

    if (!category) {
      throw new NotFoundError();
    }

    const posts = await Post.find().populate("category").exec();

    return posts;
  }

  async find(userId: string, categoryId: string, postId: string) {
    const category = await Category.findOne({ _id: categoryId }).exec();

    if (!category) {
      throw new NotFoundError();
    }

    const post = await Post.findById({
      _id: postId,
      userId,
      category: category.id,
    });

    if (!post) {
      throw new NotFoundError();
    }

    return post.populate("category");
  }

  async delete(userId: string, categoryId: string, postId: string) {
    const category = await Post.findOne({ _id: postId, categoryId }).exec();

    if (!category) {
      throw new NotFoundError();
    }

    const result = await Post.findByIdAndDelete({
      _id: postId,
      userId,
    }).populate("category");

    return result;
  }

  async update(
    userId: string,
    categoryId: string,
    postId: string,
    body: string
  ) {
    const category = await Category.findOne({ _id: categoryId }).exec();

    if (!category) {
      throw new NotFoundError();
    }

    const post = await Post.findOne({
      _id: postId,
      user: userId,
      category: category.id,
    }).exec();

    if (!post) {
      throw new NotFoundError();
    }

    const result = await Post.findByIdAndUpdate(
      post.id,
      { body },
      { new: true }
    );

    if (!result) {
      throw new NotFoundError();
    }

    return result.populate("category");
  }
}
