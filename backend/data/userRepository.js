import User from "../models/user.js";
import { AppError } from "../utils/appError.js";

/**
 * Repository for User model. All DB logic for User goes here.
 * Returns plain JS objects, not Sequelize instances.
 */
class UserRepository {
  async findByEmail(email, options = { raw: false }) {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) return null;
      if (options.raw) {
        const plainUser = user.get({ plain: true });
        delete plainUser.password;
        return plainUser;
      }
      return user;
    } catch (err) {
      throw AppError.db(err, "Failed to fetch user by email");
    }
  }

  async createUser({ name, email, password, role }) {
    try {
      const user = await User.create({ name, email, password, role });
      const plainUser = user.get({ plain: true });
      delete plainUser.password;
      return plainUser;
    } catch (err) {
      if (err.name === "SequelizeUniqueConstraintError") {
        throw AppError.conflict("User already exists");
      }
      throw AppError.db(err, "Failed to create user");
    }
  }

  async getUserSafe(user) {
    if (!user) return null;
    const plainUser = user.get({ plain: true });
    delete plainUser.password;
    return plainUser;
  }
}

export default new UserRepository();
