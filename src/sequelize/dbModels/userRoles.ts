import sequelize from "../sequelize";
import { Model, DataTypes, UUIDV4, UUIDV1 } from "sequelize";
import RoleModel from "./roles";

class UserRole extends Model {}

UserRole.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      unique: "id",
    },
    uid: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    roleCode: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      // defaultValue: 0,
      set(v: number | null) {
        if (v) {
          this.setDataValue("roleCode", v);
        } else {
          this.setDataValue("roleCode", 0);
        }
      },
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
    tableName: "user_roles",
    timestamps: true,
    underscored: true,
    charset: "utf8",
    collate: "utf8_unicode_ci",
  }
);

UserRole.sync({ force: false, alter: true });
// UserRole.hasOne(RoleModel, { foreignKey: "roleCode", as: "role" });

export default UserRole;
