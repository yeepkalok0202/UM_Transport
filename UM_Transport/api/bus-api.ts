import { BUS_INFO_API_URL } from "@/constants/api-uri-constant";
import { BusInfo } from "@/types/bus-types";
import { ErrorInterface } from "@/types/common-types";

export const getSpecificBusInfo = async (routeName: String) => {
  console.log(BUS_INFO_API_URL);
  const req = await fetch(
    `${BUS_INFO_API_URL}/getSpecific?route_name=${routeName}`,
    {
      headers: {
        Authorization:
          "Bearer eysJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyMjAwNDg0NUBzaXN3YS51bS5lZHUubXkiLCJpYXQiOjE3MzI3MjIwNTUsImV4cCI6MTczMjcyMzg1NX0.t1Tg7C-0ekVWZSQr7X5bUARjT8O5ilT2E6hpIf6nP6iE2doGWXbmd8ULW9USyOPEKGhHRgYLtOL8ledgguIy3A",
      },
    }
  );

  console.log(req);

  if (req.ok) {
    const res: BusInfo = await req.json();
    return res;
  }

  if (req.status === 400) {
    const res: ErrorInterface = await req.json();
    throw new Error(res.message);
  }

  if (req.status === 401) {
    throw new Error("Unauthorized");
  }

  throw new Error("Something went wrong");
};
