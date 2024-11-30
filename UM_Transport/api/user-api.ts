import { USER_API_URL } from "@/constants/api-uri-constant";
import { ProfileInterface, ProfileUpdatableFields } from "@/types/interfaces/user-types";
import { handleError } from "@/utils/api-utils";

export const getUserProfileAPI = async (
  token: string
): Promise<ProfileInterface> => {
  const res = await fetch(`${USER_API_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.ok) {
    return await res.json();
  }

  throw await handleError(res);
};

export const updateUserProfileAPI = async (
  data: ProfileUpdatableFields,
  token: string
): Promise<void> => {
  const res = await fetch(`${USER_API_URL}/profile/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw await handleError(res);
  }
};
