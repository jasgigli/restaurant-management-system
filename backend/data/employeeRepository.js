import Employee from '../models/employee.js';
import { AppError } from '../utils/appError.js';

class EmployeeRepository {
  async create(data) {
    try {
      return await Employee.create(data);
    } catch (error) {
      throw new AppError('Failed to create employee', 500);
    }
  }
  async findById(id) {
    const employee = await Employee.findByPk(id);
    if (!employee) throw new AppError('Employee not found', 404);
    return employee;
  }
  async findAll() {
    return await Employee.findAll();
  }
  async update(id, data) {
    const [updated] = await Employee.update(data, { where: { id } });
    if (!updated) throw new AppError('Employee not found', 404);
    return Employee.findByPk(id);
  }
  async delete(id) {
    const deleted = await Employee.destroy({ where: { id } });
    if (!deleted) throw new AppError('Employee not found', 404);
    return true;
  }
}

export default new EmployeeRepository();
