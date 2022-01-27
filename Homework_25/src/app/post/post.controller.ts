import * as express from "express";
import type { Request } from "express";
import { PostService } from "./post.service";
import {
  PostCreateBody,
  PostCreateParams,
  PostListParams,
  PostFindParams,
  PostDeleteParams,
  PostUpdateParams,
  PostUpdateBody,
} from "./post.definition";
import { withHandler } from "../../decorators/with-handler.decorator";
import { UnauthorizedError } from "../../definitions/error.definition";

const posts = express.Router({ mergeParams: true });

const postService = new PostService();

posts.post(
  "/",
  withHandler<Request<PostCreateParams, any, PostCreateBody>>(
    async (req, res) => {
      const userId = req.user;

      if (!userId) {
        throw new UnauthorizedError();
      }
      const { categoryId } = req.params;
      const { title, body } = req.body;

      const response = await postService.create(
        categoryId,
        title,
        body,
        userId
      );

      res.json(response);
    }
  )
);

posts.get(
  "/",
  withHandler<Request<PostListParams>>(async (req, res) => {
    const userId = req.user;

    if (!userId) {
      throw new UnauthorizedError();
    }

    const { categoryId } = req.params;

    const response = await postService.list(userId, categoryId);

    res.json(response);
  })
);

posts.get(
  "/:postId",
  withHandler<Request<PostFindParams>>(async (req, res) => {
    const userId = req.user;

    if (!userId) {
      throw new UnauthorizedError();
    }

    const { categoryId, postId } = req.params;

    const response = await postService.find(userId, categoryId, postId);

    res.json(response);
  })
);

posts.delete(
  "/:postId",
  withHandler<Request<PostDeleteParams>>(async (req, res) => {
    const userId = req.user;

    if (!userId) {
      throw new UnauthorizedError();
    }

    const { categoryId, postId } = req.params;

    const response = await postService.delete(userId, categoryId, postId);
    res.status(200);
    res.json(response);
  })
);

posts.put(
  "/:postId",
  withHandler<Request<PostUpdateParams, any, PostUpdateBody>>(
    async (req, res) => {
      const userId = req.user;

      if (!userId) {
        throw new UnauthorizedError();
      }

      const { categoryId, postId } = req.params;
      const { body } = req.body;

      const response = await postService.update(
        userId,
        categoryId,
        postId,
        body
      );

      res.json(response);
    }
  )
);

export { posts };
