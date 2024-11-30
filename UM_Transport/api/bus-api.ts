import { BUS_INFO_API_URL } from "@/constants/api-uri-constant";
import { BusInfo } from "@/types/bus-types";
import { handleError } from "@/utils/api-utils";
import axios from "axios";

export const getSpecificBusInfoAPI = async (
  routeName: string,
  token: string
): Promise<BusInfo> => {
  const res = await fetch(
    `${BUS_INFO_API_URL}/getSpecific?route_name=${routeName}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (res.ok) {
    return await res.json();
  }

  throw await handleError(res);
};

export const getAllBusInfoAPI = async (token: string): Promise<BusInfo[]> => {
  const res = await fetch(`${BUS_INFO_API_URL}/getAll`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.ok) {
    const data: { busInfoList: BusInfo[] } = await res.json();
    return data.busInfoList;
  }

  throw await handleError(res);
};

export const prasaranaBusInfo = async (category: string): Promise<any> => {
  const res = await axios.get(
    `https://api.data.gov.my/gtfs-realtime/vehicle-position/prasarana?category=${category}`
  );
  return res.data;
};
