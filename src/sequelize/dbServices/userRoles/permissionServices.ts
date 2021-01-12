// import AdminPermissionServices from "./adminPermissionsServices";
// import UserDbServices from "../users";
// import RoleDbService from "./roleServices";
// import GroupMemberDbServices from "../groupMembers";
// import Errors from "../../../errors";
// import BusinessDbServices from "../business";

// import StoreDbModel from "../stores";

// async function checkIfUserHasPermission(
//   uid: string,
//   permissionCode: number
// ): Promise<boolean> {
//   try {
//     var user = await UserDbServices.getUserByUid(uid);
//     if (user) {
//       if (user.roleCodes) {
//         if (user.roleCodes.length > 0) {
//           for (var i = 0; i < user.roleCodes.length; i++) {
//             var isRoleHasPermission = await RoleDbService.checkIfRoleHasPermission(
//               user.roleCodes[i],
//               permissionCode
//             );

//             if (isRoleHasPermission == true) {
//               return true;
//             }
//           }
//         }
//       }
//     }

//     return false;
//   } catch (error) {
//     throw error;
//   }
// }

// /// 检查该用户是否business member
// /// 从business member提取role
// /// 通过roleCode检查是否有permission
// async function checkIfUserHasPermissionInBusiness(
//   uid: string,
//   businessId: string,
//   permissionCode: number,
//   flag: number | null = null
// ): Promise<boolean> {
//   try {
//     var bus = await BusinessDbServices.getBusinessByBusinessId(businessId, flag);

//     if (!bus) {
//       throw Errors.BusinessError.BUSINESS_NOT_EXIST;
//     }

//     var groupMemberInfo = await GroupMemberDbServices.getUserOneGroupMember(
//       uid,
//       businessId,
//       1
//     );

//     if (!groupMemberInfo) {
//       throw Errors.RolePermissionError.NOT_GROUP_MEMBER;
//     }

//     var roleCode = groupMemberInfo["roleCode"];

//     var isRoleHasPermission = await RoleDbService.checkIfRoleHasPermission(
//       roleCode,
//       permissionCode,
//       1
//     );

//     if (isRoleHasPermission == true) {
//       return true;
//     }

//     return false;
//   } catch (error) {
//     throw error;
//   }
// }

// /// 检查该用户是否store member
// /// 从store member提取role
// /// 通过roleCode检查是否有permission
// /// flag:store 的 flag
// async function checkIfUserHasPermissionInStore(
//   uid: string,
//   storeId: string,
//   permissionCode: number,
//   flag: number | null = null
// ): Promise<boolean> {
//   try {
//     var storeDoc = await StoreDbModel.getStoreByStoreId(storeId, flag);

//     if (!storeDoc) {
//       throw Errors.StoreError.STORE_NOT_EXIST;
//     }

//     var groupMemberInfo = await GroupMemberDbServices.getUserOneGroupMember(
//       uid,
//       storeId,
//       1
//     );

//     if (!groupMemberInfo) {
//       throw Errors.RolePermissionError.NOT_GROUP_MEMBER;
//     }

//     var roleCode = groupMemberInfo["roleCode"];

//     var isRoleHasPermission = await RoleDbService.checkIfRoleHasPermission(
//       roleCode,
//       permissionCode,
//       1
//     );

//     if (isRoleHasPermission == true) {
//       return true;
//     }

//     return false;
//   } catch (error) {
//     throw error;
//   }
// }

// export default {
//   checkIfUserHasPermission,
//   checkIfUserHasPermissionInBusiness,
//   checkIfUserHasPermissionInStore,
// };
