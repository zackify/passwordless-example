import { request } from "./request";
import { useState } from "react";

export type LoginProps = {
  user?: string;
  password?: string;
};

export const useLogin = (setLoggedIn: () => any) => {
  let [loading, setLoading] = useState();
  let [data, setData] = useState();

  return {
    data,
    loading,
    login: async ({ user, password }: LoginProps) => {
      setLoading(true);
      let { data } = await request({
        path: "validate-login",
        method: "POST",
        body: { user, password }
      });

      //if the user creds are invalid, tell the user and return
      if (!data?.success) {
        setData(data);
        return setLoading(false);
      }

      // Call out to passwordless if the user info is correct
      //@ts-ignore
      let credential = await Passwordless.verify({
        user,
        clientKey: process.env.REACT_APP_CLIENT_KEY
      });

      let { data: loginData } = await request({
        path: "login",
        method: "POST",
        body: { user, password, credential }
      });

      if (loginData?.success) return setLoggedIn();
      // if the request failed, set the message for the user
      setLoading(false);
      setData(loginData);
    }
  };
};
