import { userStore } from "@/stores/userStore";

/**
 * check if user has permission
 * @param {String} permission
 * @returns {boolean}
 */
export const hasPermission = (acl) => {
  const store = userStore();
  return [...store.permissions]
    .map((e) => e.toLowerCase())
    .includes(acl.toLowerCase());
};
