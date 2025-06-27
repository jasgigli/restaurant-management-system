import SalaryAdvance from '../models/salaryAdvance.js';
import { AppError } from '../utils/appError.js';

class SalaryAdvanceRepository {
  async create(data) {
    try {
      return await SalaryAdvance.create(data);
    } catch (error) {
      throw new AppError('Failed to create salary advance', 500);
    }
  }
  async findById(id) {
    const advance = await SalaryAdvance.findByPk(id);
    if (!advance) throw new AppError('Salary advance not found', 404);
    return advance;
  }
  async findAll() {
    return await SalaryAdvance.findAll();
  }
  async update(id, data) {
    const [updated] = await SalaryAdvance.update(data, { where: { id } });
    if (!updated) throw new AppError('Salary advance not found', 404);
    return SalaryAdvance.findByPk(id);
  }
  async delete(id) {
    const deleted = await SalaryAdvance.destroy({ where: { id } });
    if (!deleted) throw new AppError('Salary advance not found', 404);
    return true;
  }
}

export default new SalaryAdvanceRepository();
