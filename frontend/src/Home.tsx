import React from "react";
import { useHome } from "helpers/useHome";

export const Home = () => {
  let { data } = useHome();
  return (
    <div>
      <p>Some special data only logged in users can see: {data?.text}</p>
      <p>
        Logout by quitting the server and restarting it. Then refresh the page.
      </p>
      <button
        onClick={() => {
          //@ts-ignore
          Passwordless.account({ accountToken: data.token });
        }}
      >
        Manage 2FA
      </button>
    </div>
  );
};
