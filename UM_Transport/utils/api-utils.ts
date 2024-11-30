import { ErrorInterface } from "@/types/common-types";

export const handleError = async (res: Response): Promise<Error> => {
  switch (res.status) {
    case 400:
      const err: ErrorInterface = await res.json();
      return new Error(err.message);
    case 401:
      return new Error("Unauthorized");
    case 403:
      return new Error("Unauthorized");
    default:
      return new Error("Something went wrong");
  }
};
