import employeeRepository from "../data/employeeRepository.js";
import staffAssignedItemRepository from "../data/staffAssignedItemRepository.js";
import { AppError } from "../utils/appError.js";
import attendanceRepository from "../data/attendanceRepository.js";
import salaryAdvanceRepository from "../data/salaryAdvanceRepository.js";

const hrService = {
  async getEmployees({ page = 1, limit = 10 }) {
    const offset = (page - 1) * limit;
    const { rows, count } = await Employee.findAndCountAll({
      offset,
      limit,
      attributes: { exclude: ["password"] },
      order: [["createdAt", "DESC"]],
    });
    return { employees: rows, total: count };
  },
  async createEmployee(data) {
    return Employee.create(data);
  },
  async updateEmployee(id, data) {
    const [updated] = await Employee.update(data, { where: { id } });
    if (!updated) throw new AppError("Employee not found", 404);
    return Employee.findByPk(id);
  },
  async deleteEmployee(id) {
    const deleted = await Employee.destroy({ where: { id } });
    if (!deleted) throw new AppError("Employee not found", 404);
    return true;
  },
  // Attendance
  async createAttendance(data) {
    return Attendance.create(data);
  },
  async getAttendance() {
    return Attendance.findAll();
  },
  async updateAttendance(id, data) {
    const attendance = await Attendance.findByPk(id);
    if (!attendance) throw new AppError("Attendance not found", 404);
    await attendance.update(data);
    return attendance;
  },
  async deleteAttendance(id) {
    const attendance = await Attendance.findByPk(id);
    if (!attendance) throw new AppError("Attendance not found", 404);
    await attendance.destroy();
    return true;
  },
  // Salary Advances
  async createAdvance(data) {
    return SalaryAdvance.create(data);
  },
  async getAdvances() {
    return SalaryAdvance.findAll();
  },
  async updateAdvance(id, data) {
    const advance = await SalaryAdvance.findByPk(id);
    if (!advance) throw new AppError("Advance not found", 404);
    await advance.update(data);
    return advance;
  },
  async deleteAdvance(id) {
    const advance = await SalaryAdvance.findByPk(id);
    if (!advance) throw new AppError("Advance not found", 404);
    await advance.destroy();
    return true;
  },
  async uploadPhoto(id, filename) {
    // Optionally update employee record with photo filename
    return Employee.update({ photo: filename }, { where: { id } });
  },
};

export default hrService;
