const { Employee, Attendance, SalaryAdvance } = require("../models");
const AppError = require("../utils/AppError");

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
  // Add similar methods for attendance, advances, etc.
  async uploadPhoto(id, filename) {
    // Optionally update employee record with photo filename
    return Employee.update({ photo: filename }, { where: { id } });
  },
};

module.exports = hrService;
