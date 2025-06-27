import SaleCostLog from '../models/saleCostLog.js';
import { AppError } from '../utils/appError.js';

class SaleCostLogRepository {
  async create(data) {
    try {
      return await SaleCostLog.create(data);
    } catch (error) {
      throw new AppError('Failed to create sale cost log', 500);
    }
  }
  async findById(id) {
    const log = await SaleCostLog.findByPk(id);
    if (!log) throw new AppError('Sale cost log not found', 404);
    return log;
  }
  async findAll() {
    return await SaleCostLog.findAll();
  }
  async update(id, data) {
    const [updated] = await SaleCostLog.update(data, { where: { id } });
    if (!updated) throw new AppError('Sale cost log not found', 404);
    return SaleCostLog.findByPk(id);
  }
  async delete(id) {
    const deleted = await SaleCostLog.destroy({ where: { id } });
    if (!deleted) throw new AppError('Sale cost log not found', 404);
    return true;
  }
}

export default new SaleCostLogRepository();
