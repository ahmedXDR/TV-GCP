import { GroupResponse } from "../api/group";
import { GROUP_NAMES } from "../utils/constants";

export const useRole = (groups: GroupResponse[] | Error | null) => {
  if (groups instanceof Error || !groups) {
    return {
      isSuperAdminOwner: false,
    };
  }

  const isGroupOwner = (roles: { role: string }[]) =>
    roles.some((role) => role.role === "OWNER");

  const isSuperAdminOwner = groups.some(
    (group) =>
      group.displayName === GROUP_NAMES.superAdmin && isGroupOwner(group.roles)
  );

  return {
    isSuperAdminOwner,
  };
};
