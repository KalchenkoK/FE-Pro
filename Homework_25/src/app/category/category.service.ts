import { NotFoundError } from "../../definitions/error.definition";
import { Category } from "../../models/category.models";

export class CategoryService {
  async create(name: string) {
    const category = new Category({
      name,
    });

    return category.save();
  }

  async find(categoryId: string) {
    const category = await Category.findById(categoryId).exec();

    if (!category) {
      throw new NotFoundError();
    }

    return category;
  }

  async list() {
    const categories = await Category.find().exec();

    return categories;
  }

  async delete(userId: string, categoryId: string) {
    const category = await Category.findOne({ _id: categoryId, userId }).exec();

    if (!category) {
      throw new NotFoundError();
    }
    const result = await Category.findByIdAndDelete({
      _id: categoryId,
      userId,
    });

    return result;
  }

  async update(userId: string, categoryId: string, name: string) {
    const category = await Category.findOne({ _id: categoryId, userId }).exec();

    if (!category) {
      throw new NotFoundError();
    }

    const result = await Category.findByIdAndUpdate(
      category.id,
      { name },
      { new: true }
    );

    if (!result) {
      throw new NotFoundError();
    }

    return result;
  }
}
