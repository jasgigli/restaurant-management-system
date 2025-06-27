import StaffAssignedItem from '../models/staffAssignedItem.js';
import { AppError } from '../utils/appError.js';

class StaffAssignedItemRepository {
  async create(data) {
    try {
      return await StaffAssignedItem.create(data);
    } catch (error) {
      throw new AppError('Failed to create assigned item', 500);
    }
  }
  async findById(id) {
    const item = await StaffAssignedItem.findByPk(id);
    if (!item) throw new AppError('Assigned item not found', 404);
    return item;
  }
  async findAll() {
    return await StaffAssignedItem.findAll();
  }
  async update(id, data) {
    const [updated] = await StaffAssignedItem.update(data, { where: { id } });
    if (!updated) throw new AppError('Assigned item not found', 404);
    return StaffAssignedItem.findByPk(id);
  }
  async delete(id) {
    const deleted = await StaffAssignedItem.destroy({ where: { id } });
    if (!deleted) throw new AppError('Assigned item not found', 404);
    return true;
  }
}

export default new StaffAssignedItemRepository();
