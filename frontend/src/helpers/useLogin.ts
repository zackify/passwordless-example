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
        path: "login",
        method: "POST",
        body: { user, password }
      });
      setLoading(false);
      if (data?.success) return setLoggedIn();
      setData(data);
    }
  };
};
