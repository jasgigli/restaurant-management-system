import MenuItemIngredient from '../models/menuItemIngredient.js';
import { AppError } from '../utils/appError.js';

class MenuItemIngredientRepository {
  async create(data) {
    try {
      return await MenuItemIngredient.create(data);
    } catch (error) {
      throw new AppError('Failed to create menu item ingredient', 500);
    }
  }
  async findById(id) {
    const ingredient = await MenuItemIngredient.findByPk(id);
    if (!ingredient) throw new AppError('Menu item ingredient not found', 404);
    return ingredient;
  }
  async findAll() {
    return await MenuItemIngredient.findAll();
  }
  async update(id, data) {
    const [updated] = await MenuItemIngredient.update(data, { where: { id } });
    if (!updated) throw new AppError('Menu item ingredient not found', 404);
    return MenuItemIngredient.findByPk(id);
  }
  async delete(id) {
    const deleted = await MenuItemIngredient.destroy({ where: { id } });
    if (!deleted) throw new AppError('Menu item ingredient not found', 404);
    return true;
  }
}

export default new MenuItemIngredientRepository();
