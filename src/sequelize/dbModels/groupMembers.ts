// import sequelize from "../sequelize";
// import { Model, DataTypes, UUIDV4, UUIDV1 } from "sequelize";

// class GroupMember extends Model {}

// GroupMember.init(
//   {
//     groupId: {
//       type: DataTypes.UUID,
//       allowNull: false,
//     },
//     uid: {
//       type: DataTypes.UUID,
//       allowNull: false,
//     },
//     roleCode: {
//       type: DataTypes.INTEGER.UNSIGNED,
//     },
//     type: {
//       type: DataTypes.INTEGER.UNSIGNED,
//       allowNull: false,
//     },
//     flag: {
//       type: DataTypes.INTEGER.UNSIGNED,
//       allowNull: false,
//       // defaultValue: 0,
//       set(v: number | null) {
//         if (v) {
//           this.setDataValue("flag", v);
//         } else {
//           this.setDataValue("flag", 0);
//         }
//       },
//     },
//   },
//   {
//     sequelize,
//     tableName: "group_members",
//     timestamps: true,
//     underscored: true,
//     charset: "utf8",
//     collate: "utf8_unicode_ci",
//   }
// );

// GroupMember.sync({ force: false, alter: true });

// export default GroupMember;
