import sequelize from "../sequelize";
import { Model, DataTypes, UUIDV4, UUIDV1 } from "sequelize";

class Permission extends Model {}

Permission.init(
  {
    permissionCode: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      unique: "permissionCode",
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
    tableName: "permissions",
    timestamps: true,
    underscored: true,
    charset: "utf8",
    collate: "utf8_unicode_ci",
  }
);

Permission.sync({ force: false, alter: true });

export default Permission;
