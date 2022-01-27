import * as express from "express";
import type { Request, Response } from "express";
import { CategoryService } from "./category.service";
import {
  CategoryCreateBody,
  CategoryFindParams,
  CategoryDeleteParams,
  CategoryUpdateParams,
  CategoryUpdateBody,
} from "./category.definition";
import { withHandler } from "../../decorators/with-handler.decorator";
import { UnauthorizedError } from "../../definitions/error.definition";

const categories = express.Router();

const categoryService = new CategoryService();

categories.post(
  "/",
  withHandler<Request<any, any, CategoryCreateBody>>(async (req, res) => {
    const { name } = req.body;

    const response = await categoryService.create(name);

    res.json(response);
  })
);

categories.get(
  "/:categoryId",
  withHandler<Request<CategoryFindParams>>(async (req, res) => {
    const { categoryId } = req.params;

    const response = await categoryService.find(categoryId);

    res.json(response);
  })
);

categories.get(
  "/",
  withHandler<Request>(async (_req: Request, res: Response) => {
    const response = await categoryService.list();

    res.json(response);
  })
);

categories.put(
  "/:categoryId",
  withHandler<Request<CategoryUpdateParams, any, CategoryUpdateBody>>(
    async (req, res) => {
      const userId = req.user;

      if (!userId) {
        throw new UnauthorizedError();
      }

      const { categoryId } = req.params;
      const { name } = req.body;

      const response = await categoryService.update(userId, categoryId, name);

      res.json(response);
    }
  )
);

categories.delete(
  "/:categoryId",
  withHandler<Request<CategoryDeleteParams>>(async (req, res) => {
    const userId = req.user;
    if (!userId) {
      throw new UnauthorizedError();
    }
    const { categoryId } = req.params;
    const response = await categoryService.delete(userId, categoryId);

    res.status(200);
    res.json(response);
  })
);

export { categories };
