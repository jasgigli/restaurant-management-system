const { Employee, Attendance, SalaryAdvance } = require("../models");
const hrService = require("../services/hrService");
const AppError = require("../utils/AppError");

// Employees
exports.createEmployee = async (req, res, next) => {
  try {
    const employee = await hrService.createEmployee(req.body);
    res.status(201).json(employee);
  } catch (error) {
    next(error);
  }
};

exports.getEmployees = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const result = await hrService.getEmployees({
      page: Number(page),
      limit: Number(limit),
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
};

exports.updateEmployee = async (req, res, next) => {
  try {
    const employee = await hrService.updateEmployee(req.params.id, req.body);
    res.json(employee);
  } catch (error) {
    next(error);
  }
};

exports.deleteEmployee = async (req, res, next) => {
  try {
    await hrService.deleteEmployee(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// Attendance
exports.createAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.create(req.body);
    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findAll();
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByPk(req.params.id);
    if (!attendance)
      return res.status(404).json({ message: "Attendance not found" });
    await attendance.update(req.body);
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteAttendance = async (req, res) => {
  try {
    const attendance = await Attendance.findByPk(req.params.id);
    if (!attendance)
      return res.status(404).json({ message: "Attendance not found" });
    await attendance.destroy();
    res.json({ message: "Attendance deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Salary Advances
exports.createAdvance = async (req, res) => {
  try {
    const advance = await SalaryAdvance.create(req.body);
    res.status(201).json(advance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAdvances = async (req, res) => {
  try {
    const advances = await SalaryAdvance.findAll();
    res.json(advances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateAdvance = async (req, res) => {
  try {
    const advance = await SalaryAdvance.findByPk(req.params.id);
    if (!advance) return res.status(404).json({ message: "Advance not found" });
    await advance.update(req.body);
    res.json(advance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteAdvance = async (req, res) => {
  try {
    const advance = await SalaryAdvance.findByPk(req.params.id);
    if (!advance) return res.status(404).json({ message: "Advance not found" });
    await advance.destroy();
    res.json({ message: "Advance deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.uploadPhoto = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    await hrService.uploadPhoto(req.params.id, req.file.filename);
    res.json({
      message: "Photo uploaded successfully",
      filename: req.file.filename,
    });
  } catch (error) {
    next(error);
  }
};
