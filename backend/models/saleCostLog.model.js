module.exports = (sequelize, DataTypes) => {
  const SaleCostLog = sequelize.define(
    "SaleCostLog",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      saleDetailId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      storeItemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity_used: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      cost_at_time_of_sale: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      indexes: [{ fields: ["saleDetailId"] }, { fields: ["storeItemId"] }],
    }
  );
  return SaleCostLog;
};
