import React from "react";

import { Login } from "./Login";
import { Home } from "./Home";
import { useHome } from "helpers/useHome";

export const App = () => {
  let { data, setData } = useHome();

  if (!data) return null;

  if (!data.loggedIn)
    return <Login setLoggedIn={() => setData({ loggedIn: true })} />;

  return <Home />;
};
