import sequelize from "../sequelize";
import { Model, DataTypes, UUIDV4, UUIDV1 } from "sequelize";

import RolePermissionModel from "./rolePermissions";

class Role extends Model {}

Role.init(
  {
    // id: {
    //   type: DataTypes.INTEGER.UNSIGNED,
    //   autoIncrement: true,
    //   primaryKey: true,
    //   unique: "id",
    // },
    roleCode: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      unique: "roleCode",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nameCn: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    flag: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      // defaultValue: 0,
      set(v: number | null) {
        if (v) {
          this.setDataValue("flag", v);
        } else {
          this.setDataValue("flag", 0);
        }
      },
    },
  },
  {
    sequelize,
    tableName: "roles",
    timestamps: true,
    underscored: true,
    charset: "utf8",
    collate: "utf8_unicode_ci",
  }
);

Role.sync({ force: false, alter: true });
Role.hasMany(RolePermissionModel, { foreignKey: "roleCode", as: "permissions" });

export default Role;
