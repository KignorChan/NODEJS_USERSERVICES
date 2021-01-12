import sequelize from "../sequelize";
import { Model, DataTypes, UUIDV4, UUIDV1 } from "sequelize";
import PermissionModel from "./permissions";

class RolePermission extends Model {}

RolePermission.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      unique: "id",
    },
    roleCode: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    permissionCode: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
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
    tableName: "role_permissions",
    timestamps: true,
    underscored: true,
    charset: "utf8",
    collate: "utf8_unicode_ci",
  }
);

RolePermission.sync({ force: false, alter: true });

RolePermission.belongsTo(PermissionModel, {
  foreignKey: "permissionCode",
  as: "permissions",
});

export default RolePermission;
