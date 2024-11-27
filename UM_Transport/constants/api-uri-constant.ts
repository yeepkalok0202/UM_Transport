import Constants from "expo-constants";

const uri = Constants.expoConfig?.hostUri?.split(":").shift()?.concat(":8080");

const APP_URL = `http://${uri}/api/private`;
const BUS_INFO_API_URL = `${APP_URL}/busInfo`;

export { BUS_INFO_API_URL };
