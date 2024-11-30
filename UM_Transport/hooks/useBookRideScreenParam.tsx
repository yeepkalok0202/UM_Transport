import { useGlobalSearchParams, useRouter } from "expo-router";
import { getAsString } from "@/utils/common-utils";
import { PreOrderResponse } from "@/types/sapu-types";

const useBookRideScreenParam = () => {
  const router = useRouter();
  const {
    startPoint: rawStartPoint,
    endPoint: rawEndPoint,
    startAddress: rawStartAddress,
    endAddress: rawEndAddress,
    data,
  } = useGlobalSearchParams();

  const startPoint = getAsString(rawStartPoint); // Ensure it's a string
  const endPoint = getAsString(rawEndPoint); // Ensure it's a string
  const startAddress = getAsString(rawStartAddress); // Ensure it's a string
  const endAddress = getAsString(rawEndAddress); // Ensure it's a string
  let preOrder: PreOrderResponse | undefined;
  try {
    preOrder = JSON.parse(getAsString(data));
  } catch (error) {
    console.log(error);
    router.back();
  }

  return {
    startPoint,
    endPoint,
    startAddress,
    endAddress,
    preOrder,
  };
};

export default useBookRideScreenParam;
