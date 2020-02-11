import { request } from "./request";
import { useState, useEffect } from "react";

export const useHome = () => {
  let [data, setData] = useState();

  useEffect(() => {
    const loadAccount = async () => {
      let { data } = await request({
        path: "account",
        method: "GET"
      });
      setData(data);
    };
    loadAccount();
  }, [setData]);

  return {
    data,
    setData
  };
};
