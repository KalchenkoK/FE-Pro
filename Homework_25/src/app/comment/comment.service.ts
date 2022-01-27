import { NotFoundError } from "../../definitions/error.definition";
import { Сomment } from "../../models/comment.models";
import { Post } from "../../models/post.models";

export class CommentService {
  async create(
    userId: string,
    categoryId: string,
    postId: string,
    body: string
  ) {
    const post = await Post.findOne({
      _id: postId,
      category: categoryId,
    }).exec();

    if (!post) {
      throw new NotFoundError();
    }

    const сomment = new Сomment({
      userId,
      body,
      post,
    });

    const result = await сomment.save();

    return result.populate({
      path: "post",
      populate: { path: "category" },
    });
  }

  async find(
    userId: string,
    categoryId: string,
    postId: string,
    commentId: string
  ) {
    const post = await Post.findOne({
      _id: postId,
      category: categoryId,
    }).exec();

    if (!post) {
      throw new NotFoundError();
    }

    const comment = await Сomment.findById({
      _id: commentId,
      userId,
      post: post.id,
    });

    if (!comment) {
      throw new NotFoundError();
    }

    return comment.populate({
      path: "post",
      populate: { path: "category" },
    });
  }

  async delete(
    userId: string,
    categoryId: string,
    postId: string,
    сommentId: string
  ) {
    const post = await Post.findOne({ _id: postId, categoryId }).exec();

    if (!post) {
      throw new NotFoundError();
    }

    const comment = await Сomment.findOne({
      _id: сommentId,
      post: post.id,
    });

    if (!comment) {
      throw new NotFoundError();
    }

    const result = await Сomment
      .findByIdAndDelete({
        _id: сommentId,
        userId,
      })
      .populate({
        path: "post",
        populate: { path: "category" },
      });
    return result;
  }

  async update(
    userId: string,
    categoryId: string,
    postId: string,
    сommentId: string,
    body: string
  ) {
    const post = await Post.findOne({
      _id: postId,
      category: categoryId,
    }).exec();

    if (!post) {
      throw new NotFoundError();
    }

    const сomment = await Сomment.findOne({
      _id: сommentId,
      user: userId,
      post: post.id,
    });

    if (!сomment) {
      throw new NotFoundError();
    }

    const result = await Сomment.findByIdAndUpdate(
      сomment.id,
      { body },
      { new: true }
    );

    if (!result) {
      throw new NotFoundError();
    }

    return result.populate({
      path: "post",
      populate: { path: "category" },
    });
  }

  async list(_userId: string, categoryId: string, postId: string) {
    const post = await Post.findOne({ _id: postId, categoryId });

    if (!post) {
      throw new NotFoundError();
    }

    const comments = await Сomment
      .find({ postId, categoryId, _userId })
      .populate({
        path: "post",
        populate: { path: "category" },
      });

    return comments;
  }
}
