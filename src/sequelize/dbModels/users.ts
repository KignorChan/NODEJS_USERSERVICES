import sequelize from "../sequelize";
import { Model, DataTypes, UUIDV4 } from "sequelize";
import UserRoleModel from "./userRoles";

class User extends Model {}

User.init(
  {
    uid: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
      unique: "uid",
    },
    username: {
      type: DataTypes.STRING(15),
      allowNull: true,
      unique: "username",
    },
    nickname: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    firstName: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    avatarUrl: {
      type: DataTypes.STRING(120),
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: true,
      // defaultValue: Date.now(),
    },
    gender: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      // defaultValue: 0,
      set(v: number | null) {
        if (v) {
          this.setDataValue("gender", v);
        } else {
          this.setDataValue("gender", 0);
        }
      },
    },
    phoneArea: {
      type: DataTypes.STRING(8),
      allowNull: true,
    },
    fullPhone: {
      type: DataTypes.STRING(15),
      allowNull: true,
      unique: "fullPhone",
    },
    email: {
      type: DataTypes.STRING(30),
      allowNull: true,
      unique: "email",
    },
    password: {
      type: DataTypes.STRING(32),
      allowNull: true,
    },
    createIp: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    lastLoginIp: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    lastLoginTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    refreshToken: {
      type: DataTypes.STRING(300),
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
    tableName: "users",
    sequelize,
    timestamps: true,
    underscored: true,
    charset: "utf8",
    collate: "utf8_unicode_ci",
    // indexes: [
    //   {
    //     name: "uid_idx",
    //     fields: ["uid"],
    //   },
    // ],
  }
);

User.sync({ force: false, alter: true });

User.hasMany(UserRoleModel, { foreignKey: "uid", as: "userRoles" });

export default User;
