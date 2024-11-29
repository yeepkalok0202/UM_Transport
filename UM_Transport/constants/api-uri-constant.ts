import Constants from "expo-constants";

const HOST_URI = Constants.expoConfig?.hostUri
  ?.split(":")
  .shift()
  ?.concat(":8080");

const APP_URL = `http://${HOST_URI}/api/private`;
const BUS_INFO_API_URL = `${APP_URL}/busInfo`;
const AUTH_API_URL = `${APP_URL}/auth`;
const USER_API_URL = `${APP_URL}/user`;
const SAPU_API_URL = `${APP_URL}/sapu`;

export { BUS_INFO_API_URL, AUTH_API_URL, USER_API_URL, SAPU_API_URL };
