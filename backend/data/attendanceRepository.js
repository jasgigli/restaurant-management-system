import Attendance from '../models/attendance.js';
import { AppError } from '../utils/appError.js';

class AttendanceRepository {
  async create(data) {
    try {
      return await Attendance.create(data);
    } catch (error) {
      throw new AppError('Failed to create attendance record', 500);
    }
  }
  async findById(id) {
    const record = await Attendance.findByPk(id);
    if (!record) throw new AppError('Attendance record not found', 404);
    return record;
  }
  async findAll() {
    return await Attendance.findAll();
  }
  async update(id, data) {
    const [updated] = await Attendance.update(data, { where: { id } });
    if (!updated) throw new AppError('Attendance record not found', 404);
    return Attendance.findByPk(id);
  }
  async delete(id) {
    const deleted = await Attendance.destroy({ where: { id } });
    if (!deleted) throw new AppError('Attendance record not found', 404);
    return true;
  }
}

export default new AttendanceRepository();
