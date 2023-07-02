import { DataTypes, Sequelize } from "sequelize";
import { sequelize } from "../database/database.js";
import { SesionActiva } from "./SesionActiva.js";

export const User = sequelize.define(
  "users",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: true,
    freezeTableName: true,
  }
);

User.hasOne(SesionActiva, {
  foreignKey: "userId",
  sourceKey: "id",
  allowNull: false,
});

SesionActiva.belongsTo(User, {
  foreignKey: "userId",
  targetId: "id",
  allowNull: false,
});
