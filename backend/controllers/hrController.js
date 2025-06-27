import { Attendance, SalaryAdvance } from "../models/index.js";
import hrService from "../services/hrService.js";
import User from "../models/user.js";

// Employees

// Get all staff users
export async function getStaff(req, res, next) {
  try {
    const staff = await User.findAll({
      where: { role: 'staff' },
      attributes: { exclude: ['password'] }
    });
    res.json(staff);
  } catch (error) {
    next(error);
  }
}
export async function createEmployee(req, res, next) {
  try {
    const employee = await hrService.createEmployee(req.body);
    res.status(201).json(employee);
  } catch (error) {
    next(error);
  }
}

export async function getEmployees(req, res, next) {
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
}

export async function updateEmployee(req, res, next) {
  try {
    const employee = await hrService.updateEmployee(req.params.id, req.body);
    res.json(employee);
  } catch (error) {
    next(error);
  }
}

export async function deleteEmployee(req, res, next) {
  try {
    await hrService.deleteEmployee(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

// Attendance
export async function createAttendance(req, res, next) {
  try {
    const attendance = await hrService.createAttendance(req.body);
    res.status(201).json(attendance);
  } catch (error) {
    next(error);
  }
}

export async function getAttendance(req, res, next) {
  try {
    const attendance = await hrService.getAttendance();
    res.json(attendance);
  } catch (error) {
    next(error);
  }
}

export async function updateAttendance(req, res, next) {
  try {
    const attendance = await hrService.updateAttendance(req.params.id, req.body);
    res.json(attendance);
  } catch (error) {
    next(error);
  }
}

export async function deleteAttendance(req, res, next) {
  try {
    await hrService.deleteAttendance(req.params.id);
    res.json({ message: "Attendance deleted" });
  } catch (error) {
    next(error);
  }
}

// Salary Advances
export async function createAdvance(req, res, next) {
  try {
    const advance = await hrService.createAdvance(req.body);
    res.status(201).json(advance);
  } catch (error) {
    next(error);
  }
}

export async function getAdvances(req, res, next) {
  try {
    const advances = await hrService.getAdvances();
    res.json(advances);
  } catch (error) {
    next(error);
  }
}

export async function updateAdvance(req, res, next) {
  try {
    const advance = await hrService.updateAdvance(req.params.id, req.body);
    res.json(advance);
  } catch (error) {
    next(error);
  }
}

export async function deleteAdvance(req, res, next) {
  try {
    await hrService.deleteAdvance(req.params.id);
    res.json({ message: "Advance deleted" });
  } catch (error) {
    next(error);
  }
}

export async function uploadPhoto(req, res, next) {
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
}
