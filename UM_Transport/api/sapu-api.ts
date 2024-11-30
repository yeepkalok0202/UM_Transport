import { SAPU_API_URL } from "@/constants/api-uri-constant";
import {
  JourneyPlanInterface,
  PlaceOrderInterface,
  PreOrderResponse,
} from "@/types/interfaces/sapu-types";
import { handleError } from "@/utils/api-utils";

export const createPreOrderAPI = async (
  data: JourneyPlanInterface,
  token: string
): Promise<PreOrderResponse> => {
  const res = await fetch(`${SAPU_API_URL}/order/customer/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    return await res.json();
  }

  throw await handleError(res);
};

export const placeOrderAPI = async (
  data: PlaceOrderInterface,
  token: string
): Promise<void> => {
  const res = await fetch(`${SAPU_API_URL}/order/customer/place`, {
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

export const driverAcceptOrderAPI = async (
  orderId: string,
  token: string
): Promise<void> => {
  const res = await fetch(`${SAPU_API_URL}/order/driver/accept`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ orderId }),
  });

  if (!res.ok) {
    throw await handleError(res);
  }
};

export const driverCancelOrderAPI = async (
  orderId: string,
  token: string
): Promise<void> => {
  const res = await fetch(`${SAPU_API_URL}/order/driver/cancel`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ orderId }),
  });

  if (!res.ok) {
    throw await handleError(res);
  }
};

export const customerCancelOrderAPI = async (
  orderId: string,
  token: string
): Promise<void> => {
  const res = await fetch(`${SAPU_API_URL}/order/customer/cancel`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ orderId }),
  });

  if (!res.ok) {
    throw await handleError(res);
  }
};

export const driverCompleteOrderAPI = async (
  orderId: string,
  token: string
): Promise<void> => {
  const res = await fetch(`${SAPU_API_URL}/order/driver/complete`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ orderId }),
  });

  if (!res.ok) {
    throw await handleError(res);
  }
};
