// import GroupMemberModel from "../../models/groupMembers";

// async function createGroupMember(
//   groupId: string,
//   uid: string,
//   roleCode: number,
//   type: number,
//   flag: number = 1
// ): Promise<any> {
//   try {
//     return await GroupMemberModel.create({
//       groupId,
//       uid,
//       roleCode,
//       type,
//       flag,
//     });
//   } catch (error) {
//     throw error;
//   }
// }

// async function getGroupMembers(
//   groupId: string,
//   roleCode: number | null = null,
//   flag: number | null = null
// ): Promise<GroupMemberModel[] | null> {
//   try {
//     var filter = { groupId };
//     if (roleCode != null) {
//       filter["roleCode"] = roleCode;
//     }
//     if (flag != null) {
//       filter["flag"] = flag;
//     }

//     return await GroupMemberModel.findAll({ where: filter });
//   } catch (error) {
//     throw error;
//   }
// }

// async function getUserGroups(
//   uid: string,
//   type: number,
//   flag: number | null
// ): Promise<GroupMemberModel[] | null> {
//   try {
//     var filter = { uid };
//     if (type != null) {
//       filter["type"] = type;
//     }
//     if (flag != null) {
//       filter["flag"] = flag;
//     }
//     return await GroupMemberModel.findAll({ where: filter });
//   } catch (error) {
//     throw error;
//   }
// }

// async function getUserOneGroupMember(
//   uid: string,
//   groupId: string,
//   flag: number | null = null
// ): Promise<GroupMemberModel | null> {
//   try {
//     var filter = { uid, groupId };
//     if (flag != null) {
//       filter["flag"] = flag;
//     }

//     return await GroupMemberModel.findOne({ where: filter });
//   } catch (error) {
//     throw error;
//   }
// }

// export default {
//   createGroupMember,
//   getGroupMembers,
//   getUserGroups,
//   getUserOneGroupMember,
// };
