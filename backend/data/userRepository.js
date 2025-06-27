import User from "../models/user.js";
import { AppError } from "../utils/appError.js";

/**
 * Repository for User model. All DB logic for User goes here.
 * Returns plain JS objects, not Sequelize instances.
 */
class UserRepository {
  async findByEmail(email) {
    try {
      const user = await User.findOne({ where: { email } });
      return user ? user.get({ plain: true }) : null;
    } catch (err) {
      throw AppError.db(err, "Failed to fetch user by email");
    }
  }

  async createUser({ name, email, password, role }) {
    try {
      const user = await User.create({ name, email, password, role });
      return user.get({ plain: true });
    } catch (err) {
      if (err.name === "SequelizeUniqueConstraintError") {
        throw AppError.conflict("User already exists");
      }
      throw AppError.db(err, "Failed to create user");
    }
  }

  // Add more CRUD methods as needed
}

export default new UserRepository();
